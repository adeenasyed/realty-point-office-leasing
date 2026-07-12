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
              If you have any questions or concerns, feel free to contact us at 123-456-7890 or abc@example.com.
          </div>
      </div>
      <Footer/>
    </>
  );
}

export default Success;