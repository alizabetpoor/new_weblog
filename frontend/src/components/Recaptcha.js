import ReCAPTCHA from "react-google-recaptcha";
import { createRef } from "react";
const Recaptcha = ({ setEnabledForm }) => {
  const recaptchaRef = createRef();

  const capchaChange = (e) => {
    console.log(e);
    if (e) {
      setEnabledForm(true);
    } else {
      setEnabledForm(false);
    }
  };
  return (
    <div>
      <ReCAPTCHA
        style={{ display: "inline-block" }}
        sitekey="6LcCneUdAAAAALBwYr8u16sMx15NRNhiTrEfSroY"
        ref={recaptchaRef}
        onChange={capchaChange}
        size="compact"
      />
    </div>
  );
};

export default Recaptcha;
