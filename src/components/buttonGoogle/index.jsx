/* CSS */
import './ButtonStyles.css';

/* ASSETS */
import google_icon from "./assets/google-icon.svg";

export default function ButtonGoogle({ children, ...props }) {
  return (
    <div id="component_button_google_div">
      <button {...props}>
        <img src={google_icon} />
        {children}
        <div></div>
      </button>
    </div>
  );
}
