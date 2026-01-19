require('./dbconnect');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const { format } = require('date-fns');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodeMailer = require('nodemailer');
const UnitModel = require('./models/UnitModel');
const DailyBookingModel = require('./models/DailyBookingModel');
const MonthlyBookingModel = require('./models/MonthlyBookingModel');
const BoardroomBookingModel = require('./models/BoardroomBookingModel');
const UnavailabilityModel = require('./models/UnavailabilityModel');

const fs = require('fs');
const path = require('path');
const clientEmailTemplateA = fs.readFileSync(path.join(__dirname, 'email templates/clientEmailA.html'), 'utf8');
const clientEmailTemplateB = fs.readFileSync(path.join(__dirname, 'email templates/clientEmailB.html'), 'utf8');
const emailTemplate = fs.readFileSync(path.join(__dirname, 'email templates/email.html'), 'utf8');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  credentials: true,
  origin: `https://www.globalopulence.ca`
  //origin: `http://localhost:5173`
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      frameSrc: ["'self'", 'https://www.google.com'],
    }
  }
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 75,
  message: "Rate limit exceeded"
});

app.use(['/api/', '/protected/'], apiLimiter);

app.use(mongoSanitize());

app.use(cookieParser());

app.post('/api/stripeWebhook', express.raw({type: 'application/json'}), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
      event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_SIGNING_SECRET);
  } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    let booking;
    try {
      booking = await createBooking(session);
    } catch (error) {
      console.error('Error booking unit/boardroom:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    let formattedDate;
    if (booking.dates) { 
      formattedDate = booking.dates;
    } else if (booking.months) { 
      formattedDate = booking.months;
    } else if (booking.date) { 
      formattedDate = format(new Date(booking.date), 'MM-dd-yyyy');
    }
    try { 
      await sendClientEmail(booking.email, booking.name, booking._id, booking.unit.name, formattedDate, booking.startTime, booking.endTime);
    } catch (error) { 
      console.error('Error sending email to client:', error);
    }
    try { 
      await sendEmail(booking.name, booking.email, booking._id, booking.unit.name, formattedDate, booking.startTime, booking.endTime);
    } catch (error) { 
      console.error('Error sending email to Global Opulence:', error);
    }
  }
  return res.json({ success: true });
});

app.use(express.json());

app.post('/api/adminAuthentication', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ authenticated: true }, process.env.AUTH_SECRET_KEY, { expiresIn: 3600 });
    res.cookie('adminToken', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600 * 1000, path: '/protected' });
    console.log(`Login successful`);
    res.json({ success: true });
  } else {
    console.log(`Incorrect password attempt`);
    res.status(401).json({ error: 'Incorrect password' });
  }
});

app.use('/protected', (req, res, next) => {
  const token = req.cookies['adminToken'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.AUTH_SECRET_KEY, (error, decoded) => {
    if (error) return res.sendStatus(403);
    req['admin'] = decoded;
    next();
  });
});

app.get('/protected/api/checkAdminAuth', (req, res) => {
  res.json({ valid: true, authenticated: req.admin.authenticated });
});

app.get('/api/fetchBookings', async (req, res) => {
  try {
    let [dailyBookings, monthlyBookings] = await Promise.all([DailyBookingModel.find(), MonthlyBookingModel.find()]);
    let bookings = dailyBookings.concat(monthlyBookings);
    let boardroomBookings = await BoardroomBookingModel.find();
    res.json({bookings, boardroomBookings});
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/setUnavailability', async (req, res) => {
  const {selectedUnits, selectedDates} = req.body;
  try {
    let updatedUnavailabilities = [];
    selectedUnits.forEach(unit => {
      const updatedUnavailability = UnavailabilityModel.updateOne(
        { 'unit.name': unit },
        { $addToSet: { dates: { $each: selectedDates } } },
      );
      updatedUnavailabilities.push(updatedUnavailability);
    });
    await Promise.all(updatedUnavailabilities);
    res.json({success: true});
  } catch (error) {
    console.error('Error setting unavailability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/fetchUnits', async (req, res) => {
  try {
    const units = await UnitModel.find().select('-description');
    res.json(units);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/fetchUnitInfo/:unitID', async (req, res) => {
  const unitID = req.params.unitID;
  try {
    const unit = await UnitModel.findById(unitID);
    const bookings1 = await DailyBookingModel.find({'unit.objectId': unitID}).select('dates -_id -type');
    const bookings2 = await MonthlyBookingModel.find({'unit.objectId': unitID}).select('months -_id -type');
    const unavailabilities = await UnavailabilityModel.find({'unit.objectId': unitID}).select('dates -_id');
    let bookedDates = [];
    let unavailableDates = [];
    const dates1 = bookings1.reduce((acc, booking) => {
      return acc.concat(booking.dates);
    }, []);
    bookedDates.push(...dates1);
    const dates2 = bookings2.reduce((acc, booking) => {
      booking.months.forEach(month_year => {
        const [month, year] = month_year.split('-');
        const numDays = new Date(Number(year), Number(month), 0).getDate();
        for (let day = 1; day <= numDays; day++) {
          const dateStr = `${month}-${String(day).padStart(2, '0')}-${year}`;
          acc.push(dateStr);
        }
      });
      return acc;
    }, []);
    bookedDates.push(...dates2);
    const dates3 = unavailabilities.reduce((acc, unavailability) => {
      unavailability.dates.forEach(date => {
        const month = date.substring(0, 2);
        if (bookedDates.some(str => str.startsWith(month)) || unavailability.dates.filter(str => str.startsWith(month)).length > 3) { 
          acc.push(date);
        } else { 
          unavailableDates.push(date);
        }
      })
      return acc;
    }, []);
    bookedDates.push(...dates3);
    res.json({unit, bookedDates, unavailableDates});
  } catch (error) {
    console.error('Error fetching unit info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/bookUnit', async (req, res) => {
  const {unit, selectedDates, selectedMonths} = req.body;
  let total;
  if (selectedDates.length > 0) { 
    selectedDates.sort();
    total = unit.daily_rent * selectedDates.length * 1.03 * 1.13;
  } else { 
    selectedMonths.sort((a, b) => {
      const [monthA, yearA] = a.split('-').map(Number);
      const [monthB, yearB] = b.split('-').map(Number);
      const dateA = new Date(yearA, monthA-1, 1);
      const dateB = new Date(yearB, monthB-1, 1);
      return dateA - dateB;
    });
    total = Math.min(unit.monthly_rent * selectedMonths.length, unit.monthly_rent * 2) * 1.03 * 1.13;
  }
  const formattedSelectedMonths = selectedMonths.map(month_year => {
    const [month, year] = month_year.split('-');
    const formattedMonth = month.padStart(2, '0');
    return `${formattedMonth}-${year}`;
  });
  try { 
    const checkoutSession = await createCheckoutSession(total, {metadata: {unitID: unit._id, unitName: unit.name, dates: JSON.stringify(selectedDates), months: JSON.stringify(formattedSelectedMonths)}});
    return res.json({ checkoutSession });
  } catch (error) { 
    console.error('Error creating checkout session for unit booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/fetchBoardroomInfo/:boardroomID', async (req, res) => {
  const boardroomID = req.params.boardroomID;
  try {
    const boardroom = await UnitModel.findById(boardroomID);
    const unavailabilities = await UnavailabilityModel.find({'unit.objectId': boardroomID}).select('dates -_id');
    let unavailableDates = unavailabilities.reduce((acc, unavailability) => { return acc.concat(unavailability.dates) }, []);
    res.json({boardroom, unavailableDates});
  } catch (error) {
    console.error('Error fetching boardroom info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const times = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"];

app.get('/api/fetchBoardroomStartTimes', async (req, res) => {
  const {date} = req.query;
  try {
    const bookings = await BoardroomBookingModel.find({date}).select('startTime endTime -_id -type');
    let availableStartTimes = times.slice(0, 17);
    let bookedTimes = [];
    bookings.forEach(booking => {
      const startIndex = times.indexOf(booking.startTime)-1;
      const endIndex = times.indexOf(booking.endTime);
      for (let i = startIndex; i < endIndex; i++) {
        bookedTimes.push(times[i]);
      }
    });
    availableStartTimes = availableStartTimes.filter(time => !bookedTimes.includes(time));
    res.json({ availableStartTimes });
  } catch (error) {
    console.error('Error fetching boardroom start times:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/fetchBoardroomEndTimes', async (req, res) => {
  const {date, startTime} = req.query;
  try {
    const bookings = await BoardroomBookingModel.find({date}).select('startTime endTime -_id -type');
    const formatTime = (timeToFormat) => {
      const [time, meridiem] = timeToFormat.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours);
      if (hours !== 12 && meridiem === 'PM') hours += 12;
      if (hours === 12 && meridiem === 'AM') hours = 0;
      hours = hours.toString().padStart(2, '0');
      return new Date(`2024-01-01T${hours}:${minutes}:00Z`);
    };
    const formattedStartTime = formatTime(startTime);    
    const nextBookedStartTime = bookings.map(booking => formatTime(booking.startTime))
    .filter((formattedTime) => formattedTime > formattedStartTime)
    .sort((a, b) => a - b)[0];
    let availableEndTimes = times.slice(times.indexOf(startTime) + 2, nextBookedStartTime ? times.indexOf(nextBookedStartTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' })) + 1 : undefined);
    availableEndTimes = availableEndTimes.filter(time => time.includes(startTime.includes("00") ? "00" : "30"));
    res.json({ availableEndTimes });
  } catch (error) {
    console.error('Error fetching boardroom end times:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/bookBoardroom', async (req, res) => {
  const {selectedDate, startTime, endTime} = req.body;
  const formatTime = (timeToFormat) => {
      const [time, meridiem] = timeToFormat.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
      if (hours !== 12 && meridiem === 'PM') hours += 12;
      if (hours === 12 && meridiem === 'AM') hours = 0;
      return hours + minutes / 60
  };
  const numHours = (formatTime(endTime) - formatTime(startTime));
  let total = Math.min(numHours*100, 500) * 1.03 * 1.13;
  try { 
    const checkoutSession = await createCheckoutSession(total, {metadata: {unitID: '65dae3133f30095a7c53ccaf', unitName: 'Boardroom', date: selectedDate, startTime, endTime}});
    return res.json({ checkoutSession });
  } catch (error) { 
    console.error('Error creating checkout session for boardroom booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function createCheckoutSession(amount, { metadata }) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          product_data: {
            name: 'Global Opulence Rent Payment'
          },
          currency: 'cad',
          unit_amount: Math.round(amount * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'https://www.globalopulence.ca/paymentSuccess',
      cancel_url: metadata.unitName !== 'Boardroom' ? `https://www.globalopulence.ca/units/${metadata.unitID}` : `https://www.globalopulence.ca/units/boardroom/65d5ad149c8641fa809d1c83`,
      // success_url: 'http://localhost:5173/paymentSuccess',
      // cancel_url: metadata.unitName !== 'Boardroom' ? `http://localhost:5173/units/${metadata.unitID}` : `http://localhost:5173/units/boardroom/65d5ad149c8641fa809d1c83`,
      metadata
    });
    return session.url;
  } catch (error) {
    throw error;
  }
};

async function createBooking(session) { 
  const name = session.customer_details.name;
  const email = session.customer_details.email;
  const unitID = session.metadata.unitID;
  const unitName = session.metadata.unitName;
  let booking;
  if (unitName != 'Boardroom') { 
    const dates = JSON.parse(session.metadata.dates);
    const months = JSON.parse(session.metadata.months);
    if (dates.length > 0) { 
      try {
        booking = await DailyBookingModel.create({
          name,
          email,
          unit: {
            name: unitName,
            objectId: unitID
          },
          dates 
        });
      } catch (error) { 
        throw error;
      }
    } else { 
      try {
        booking = await MonthlyBookingModel.create({
          name,
          email,
          unit: {
            name: unitName,
            objectId: unitID
          },
          months
        });
      } catch (error) { 
        throw error;
      }
    }
  } else { 
    const date = session.metadata.date;
    const startTime = session.metadata.startTime;
    const endTime = session.metadata.endTime;
    try {
      booking = await BoardroomBookingModel.create({
        name,
        email,
        unit: {
          name: 'Boardroom',
          objectId: '65d5ad149c8641fa809d1c83'
        },
        date, 
        startTime,
        endTime
      });
    } catch (error) { 
      throw error;
    }
  }
  return booking;
};

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'adeenasyed03@gmail.com',
      pass: EMAIL_PASSWORD
  },
  secure: true
});

async function sendClientEmail(email, name, code, unit, date, startTime, endTime) {
  let htmlContent;
  if (unit != 'Boardroom') { 
    htmlContent = clientEmailTemplateA
    .replace('${name}', name)
    .replace('${code}', code)
    .replace('${unit}', unit)
    .replace('${date}', date);
  } else { 
    htmlContent = clientEmailTemplateB
    .replace('${name}', name)
    .replace('${code}', code)
    .replace('${unit}', unit)
    .replace('${date}', date)
    .replace('${startTime}', startTime)
    .replace('${endTime}', endTime);
  }
  const mailOptions = {
    from: 'adeenasyed03@gmail.com',
    to: email,
    subject: 'Booking Confirmation',
    html: htmlContent
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent to client: %s ', info.messageId);
  } catch (error) {
    throw error;
  }
}

async function sendEmail(name, email, code, unit, date, startTime, endTime) {
  if (!startTime) { startTime = 'NA' }
  if (!endTime) { endTime = 'NA' }
  let htmlContent = emailTemplate
  .replace('${name}', name)
  .replace('${email}', email)
  .replace('${code}', code)
  .replace('${unit}', unit)
  .replace('${date}', date)
  .replace('${startTime}', startTime)
  .replace('${endTime}', endTime);
  const mailOptions = {
    from: 'adeenasyed03@gmail.com',
    to: 'adeenasyed03@gmail.com',
    subject: 'New Booking',
    html: htmlContent
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent to Global Opulence: %s ', info.messageId);
  } catch (error) {
    throw error;
  }
}

app.use(express.static(path.join(__dirname, '.', 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});