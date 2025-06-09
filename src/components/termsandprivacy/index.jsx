/* CSS */
import "./TermsAndPrivacyStyles.css";

/* COMPONENTS */
import ButtonBlue from "../buttonPrimary";

export default function TermsAndPrivacy({ type, isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div id="component_termsandprivacy_div_overlay"></div>
      <div id="component_termsandprivacy_div">
        <h3>
          {type == "terms" ? "Termos de uso" : "Políticas de Privacidade"}
        </h3>
        <h4>Aqui você pode se informar melhor!</h4>

        <div id="component_termsandprivacy_div_container">
          <p>{type == "terms" ? "termos" : "politicas"}</p>
        </div>

        <div id="component_termsandprivacy_div_button">
          <ButtonBlue
            onClick={onClose}
            id="component_termsandprivacy_button_one"
          >
            FECHAR
          </ButtonBlue>
        </div>
      </div>
    </div>
  );
}
