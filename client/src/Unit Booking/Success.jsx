import Header from "../Header/Header";
import Footer from "../Footer/Footer"

function Success() {
  return (
    <>
      <Header/>
      <div className="success-container">
          <div>
              Thank you for booking with us. A confirmation email will be sent to you shortly. 
          </div>
          <div style={{marginTop: "18px"}}>
              If you have any questions or concerns, feel free to contact us at 416-968-0288 or global.opulence@yahoo.com.
          </div>
      </div>
      <Footer/>
    </>
  );
}

export default Success;