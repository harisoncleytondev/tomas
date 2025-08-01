/* CSS */
import './css/PromptModalStyles.css';

export default function PromptModal({
  title,
  description,
  confirmYes,
  confirmNo,
}) {
  return (
    <div id="component_modal_prompt">
      <div id="component_modal_prompt_overlay" onClick={confirmNo}>
        <div id="component_modal_prompt_container">
          <h4>{title}</h4>
          <p>{description}</p>

          <div>
            <button
              id="component_modal_prompt_button_cancel"
              onClick={confirmNo}
            >
              Cancelar
            </button>
            <button
              id="component_modal_prompt_button_confirm"
              onClick={confirmYes}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
