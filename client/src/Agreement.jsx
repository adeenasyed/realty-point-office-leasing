import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function Agreement({showAgreement, setShowAgreement, createBooking, unit, rentOption}) {

    const dailyClauses = [
        "The office user agrees that this Agreement does not grant any rights in real estate, under the Residential Tenancy Act or Commercial Tenancy Act. No residential or commercial tenancy is created under this Agreement nor does the Agreement grant any other real property interest to the office user.",
        `The office user receives a revocable right to use ${unit} and other office facilities and services equivalent to a right created in a contract for hotel accommodation.`,
        "The occupancy will start from the first day of this Agreement and conclude on the last day of the same as agreed between the provider and the office user.",
        "The office user agrees that on the last day of this Agreement, the office space will be handed over to the provider in a neat and clean condition.",
        `The office user understands and agrees that ${unit} and other business centre facilities & services will only be accessed during the office hours, i.e., Monday through Friday, from 9 am till 6 pm.`,
        `The office user agrees to provide to the provider ONE cheque of $500.00+HST=$565.00 as security deposit and ANOTHER cheque of $200 as key deposit. These deposits cannot be adjusted against the daily rent of the office space and the deposit amount less any damages will be returned to the office user within 5 business days of vacating the office space.`,
        "The office user agrees that the payment made by the office user at the time of reservation is non-refundable.",
        "The office user agrees that the office space will only be used for commercial office purposes only. In addition to the office space, the provider will provide Wired and Wireless internet, tea, coffee, utensils, kitchen, cleaning, garbage removal, document scanning & shredding and surface parking. Printing & faxing, mailbox & mail processing, business phone, boardroom room, and office computer will be available on a pay-per-use basis. The office user agrees to make the payment for any pay per use services first before using the same.",
        "The user agrees that this agreement is not transferable and non-assignable.",
        "The office user agrees that the provider or any of its staff will not be responsible for any damages which may include theft, fire, personal injury, death or any other damage to the vehicle and personal belongings of the guests and the visitors of the office user. It is the responsibility of the office user to ensure that they have adequate and relevant insurance coverage before occupancy. The office user will also ensure that their vehicles are comprehensively insured.",
        "The office user agrees that the provider will not be responsible for any loss of data due to internet or power failure. The office user also agrees that internet connection and the telephone service is provided by a third party and in case of any disruption due to any reason, the provider will not be held accountable or liable in any way.",
        "The office user agrees to let any officer or staff of the provider for the cleaning, maintenance, and general inspection without any notice.",
        "The office user will not install any devices or equipment consuming extra electrical power without the written permission of the provider.",
        "The office user agrees to obtain permission in writing from the provider to make any changes inside the office premises being used by the officer user.",
        "Pets are not allowed on the premises.",
        "The office user agrees not to use the office space involving frequent visits by visitors.",
        "Outside surface parking is available for the office user and their staff members/visitors free of charge on a first come first served basis.",
        "The office user agrees to abide by the house keeping rules provided by the provider from time to time.",
        "The office user agrees and makes sure that no illegal activity and disturbance take place on the premises provided by the provider.",
        "The office user also agrees that the provider reserves the right to change the premises and the pricing at any time.",
        "The office user agrees that the provider can make any changes in the premises, including common areas, washrooms, board rooms, kitchen, reception area and the premises under the use of the office user without any consent of the office user.",
        "The office user and the provider agree that in case of any damage to the furniture during the term of this office use agreement, the office user will replace the same at office user’s cost. The office user also agrees that any loss caused to the building or the common area on account of negligent use will be fully compensated by the office user to the provider.",
        "In the event, the office user breaches one or more of its obligations under this Agreement, the provider may revoke the office user’s rights under this Agreement upon giving the office user 3 days’ notice. The office user agrees to vacate the office space on or before the date mentioned in the notice and return the office space back to the provider in a neat and clean condition. The office user also agrees to pay the outstanding rent if any up to and including the last day mentioned in the notice.",
        "The office user agrees that the contents of this agreement are confidential, and the terms and conditions are not to be disclosed to anyone without written permission from the provider.",
        "The office user agrees that if the premises are no longer available for usage due to any reason, this agreement will end, and the office user will be responsible for the payment of the rent for the number of days used in a month and the rent for the remaining days of the Agreement will be returned to the office user within 5 business days from the date this Agreement ends. The office user agrees to absolve the provider of any liability due to the non-availability of the premises for any reason."
    ];

    const monthlyClauses = [
        "The office user agrees that this Agreement does not grant any rights in real estate, under the Residential Tenancy Act or Commercial Tenancy Act. No residential or commercial tenancy is created under this Agreement nor does the Agreement grant any other real property interest to the office user.",
        `The office user receives a revocable right to use ${unit} and other office facilities and services equivalent to a right created in a contract for hotel accommodation.`,
        "The occupancy will start from the first day of this Agreement and conclude on the last day of the same as agreed between the provider and the office user.",
        "The office user agrees that on the last day of this Agreement, the office space will be handed over to the provider in a neat and clean condition.",
        `The office user understands and agrees that ${unit} and other business centre facilities & services will only be accessed during the office hours, i.e., Monday through Friday, from 9 am till 6 pm.`,
        `The office user will hand over to the provider the post-dated cheques of $1,500.00+HST=$1,695.00 for all the months between the first and last months. The office user agrees to submit these cheques to the provider on or before the first day of the concerned occupancy.`,
        "In addition to the post-dated cheques mentioned above, the office user will also provide to the provider ONE cheque of $1,500.00+HST=$1,695.00 as security deposit and ANOTHER cheque of $200.00 as key deposit. These deposits cannot be adjusted against the monthly rent of the office space and the deposit amount less any damages will be returned to the office user within 5 business days of vacating the office space.",
        "The office user agrees that the payment of the First and Last Months’ rents are non-refundable and if office space has been in the possession of the office user for more than 2 months, then the rent for the additional period is also payable to the provider by the office user.",
        "The office user agrees that the office space will only be used for commercial office purposes only. In addition to the office space, the provider will provide Wired and Wireless internet, tea, coffee, utensils, kitchen, cleaning, garbage removal, document scanning & shredding and surface parking. Printing & faxing, mailbox & mail processing, business phone, boardroom room, and office computer will be available on a pay-per-use basis. The office user agrees to make the payment for any pay per use services first before using the same.",
        "The user agrees that this agreement is not transferable and non-assignable.",
        "The office user agrees that the provider or any of its staff will not be responsible for any damages which may include theft, fire, personal injury, death or any other damage to the vehicle and personal belongings of the guests and the visitors of the office user. It is the responsibility of the office user to ensure that they have adequate and relevant insurance coverage before occupancy. The office user will also ensure that their vehicles are comprehensively insured.",
        "The office user agrees that the provider will not be responsible for any loss of data due to internet or power failure. The office user also agrees that internet connection and the telephone service is provided by a third party and in case of any disruption due to any reason, the provider will not be held accountable or liable in any way.",
        "The office user agrees to let any officer or staff of the provider for the cleaning, maintenance, and general inspection without any notice.",
        "The office user will not install any devices or equipment consuming extra electrical power without the written permission of the provider.",
        "The office user agrees to obtain permission in writing from the provider to make any changes inside the office premises being used by the officer user.",
        "Pets are not allowed on the premises.",
        "The office user agrees not to use the office space involving frequent visits by visitors.",
        "Outside surface parking is available for the office user and their staff members/visitors free of charge on a first come first served basis.",
        "The office user agrees to abide by the house keeping rules provided by the provider from time to time.",
        "The office user agrees and makes sure that no illegal activity and disturbance take place on the premises provided by the provider.",
        "The office user also agrees that the provider reserves the right to change the premises and the pricing at any time.",
        "The office user agrees that the provider can make any changes in the premises, including common areas, washrooms, board rooms, kitchen, reception area and the premises under the use of the office user without any consent of the office user.",
        "The office user agrees that in case, the rent cheque for the office space is returned NSF, then the regular rent plus $50 as the NSF charges will be provided, in the form of a bank draft/certified cheque/money order, to the provider within 3 calendar days of the notification by the provider or its employee.",
        "The office user understands and agrees that the office user will be considered in default of the rent payment if the rent is not received within 10 calendar days from the due date. Should this happen, this Agreement will become void, and the provider can immediately enter and re-possess the office.",
        "The office user and the provider agree that in case of any damage to the furniture during the term of this office use agreement, the office user will replace the same at office user’s cost. The office user also agrees that any loss caused to the building or the common area on account of negligent use will be fully compensated by the office user to the provider.",
        "In the event, the office user breaches one or more of its obligations under this Agreement, the provider may revoke the office user’s rights under this Agreement upon giving the office user 3 days’ notice. The office user agrees to vacate the office space on or before the date mentioned in the notice and return the office space back to the provider in a neat and clean condition. The office user also agrees to pay the outstanding rent if any up to and including the last day mentioned in the notice.",
        "This agreement can be terminated by either party by giving 30 days’ written notice without providing any reason.",
        "The office user agrees that the contents of this agreement are confidential, and the terms and conditions are not to be disclosed to anyone without written permission from the provider.",
        "The office user agrees that if the premises are no longer available for usage due to any reason, this agreement will end, and the office user will be responsible for the payment of the rent for the number of days used in a month and the rent for the remaining days of the Agreement will be returned to the office user within 5 business days from the date this Agreement ends. The office user agrees to absolve the provider of any liability due to the non-availability of the premises for any reason."
    ];

    const hourlyClauses = [
        "The office user agrees that this Agreement does not grant any rights in real estate, under the Residential Tenancy Act or Commercial Tenancy Act. No residential or commercial tenancy is created under this Agreement nor does the Agreement grant any other real property interest to the office user.",
        `The office user receives a revocable right to use the Boardroom and other office facilities and services equivalent to a right created in a contract for hotel accommodation.`,
        "The office user agrees to use the Boardroom for the reserved hours only and will hand over the Boardroom to the provider in a neat and clean condition.",
        `The office user understands and agrees that the Boardroom and other business centre facilities & services will only be accessed during the office hours, i.e., Monday through Friday, from 9 am till 6 pm.`,
        `The office user agrees to provide to the provider ONE cheque of $500.00+HST=$565.00 as security deposit. These deposits cannot be adjusted against the daily/Monthly rent of the any other office space and the deposit amount less any damages will be returned to the office user within 5 business days of vacating the office space.`,
        "The office user agrees that the payment made by the office user at the time of reservation is non-refundable.",
        "The office user agrees that the office space will only be used for commercial office purposes only. In addition to the office space, the provider will provide Wired and Wireless internet, tea, coffee, utensils, kitchen, cleaning, garbage removal, document scanning & shredding and surface parking. Printing & faxing, mailbox & mail processing, business phone, boardroom room, and office computer will be available on a pay-per-use basis. The office user agrees to make the payment for any pay per use services first before using the same.",
        "The user agrees that this agreement is not transferable and non-assignable.",
        "The office user agrees that the provider or any of its staff will not be responsible for any damages which may include theft, fire, personal injury, death or any other damage to the vehicle and personal belongings of the guests and the visitors of the office user. It is the responsibility of the office user to ensure that they have adequate and relevant insurance coverage before occupancy. The office user will also ensure that their vehicles are comprehensively insured.",
        "The office user agrees that the provider will not be responsible for any loss of data due to internet or power failure. The office user also agrees that internet connection and the telephone service is provided by a third party and in case of any disruption due to any reason, the provider will not be held accountable or liable in any way.",
        "The office user agrees to let any officer or staff of the provider for the cleaning, maintenance, and general inspection without any notice.",
        "The office user will not install any devices or equipment consuming extra electrical power without the written permission of the provider.",
        "The office user agrees to obtain permission in writing from the provider to make any changes inside the office premises being used by the officer user.",
        "Pets are not allowed on the premises.",
        "The office user agrees not to use the office space involving frequent visits by visitors.",
        "Outside surface parking is available for the office user and their staff members/visitors free of charge on a first come first served basis.",
        "The office user agrees to abide by the house keeping rules provided by the provider from time to time.",
        "The office user agrees and makes sure that no illegal activity and disturbance take place on the premises provided by the provider.",
        "The office user also agrees that the provider reserves the right to change the premises and the pricing at any time.",
        "The office user agrees that the provider can make any changes in the premises, including common areas, washrooms, board rooms, kitchen, reception area and the premises under the use of the office user without any consent of the office user.",
        "The office user and the provider agree that in case of any damage to the furniture during the term of this office use agreement, the office user will replace the same at office user’s cost. The office user also agrees that any loss caused to the building or the common area on account of negligent use will be fully compensated by the office user to the provider.",
        "In the event, the office user breaches one or more of its obligations under this Agreement, the provider may revoke the office user’s rights under this Agreement upon giving the office user written notice. The office user agrees to vacate the Boardroom and return the office space back to the provider in a neat and clean condition.",
        "The office user agrees that the contents of this agreement are confidential, and the terms and conditions are not to be disclosed to anyone without written permission from the provider.",
        "The office user agrees that if the premises are no longer available for usage due to any reason, this agreement will end, and the office user will be responsible for the payment of the rent for the number of days used in a month and the rent for the remaining days of the Agreement will be returned to the office user within 5 business days from the date this Agreement ends. The office user agrees to absolve the provider of any liability due to the non-availability of the premises for any reason."
    ];
    
    return (
        <Dialog open={showAgreement} onClose={() => setShowAgreement(false)} maxWidth="md">
            <DialogContent padding={2}> 
                <DialogContentText paddingBottom={2} sx={{color: 'black', fontWeight: 700, fontSize: 20}}>Office Space Use Agreement</DialogContentText>
                <DialogContentText sx={{color: 'black'}}>
                    This office agreement is made between Global Opulence Business Centre hereby called “the provider” and Jane Doe called “the office user” on {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}.
                </DialogContentText>
                <DialogContentText sx={{color: 'black'}}>
                    The office user agrees to use {unit} and other business centre facilities located at 55 Lebovic Ave, Suite C115, Toronto, ON M1L 0H2 on the following terms and conditions:
                </DialogContentText>
                <DialogContentText sx={{ color: 'black'}}>
                    <ol>
                        {rentOption === "daily" 
                            ? dailyClauses.map((clause, index) => (<li key={index}>{clause}</li>))
                            : rentOption === "monthly" 
                                ? monthlyClauses.map((clause, index) => (<li key={index}>{clause}</li>))
                                : hourlyClauses.map((clause, index) => (<li key={index}>{clause}</li>))
                        }
                    </ol>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => setShowAgreement(false)}>
                        Cancel
                    </Button>
                    <Button onClick={createBooking}>
                        Agree & Continue
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default Agreement;