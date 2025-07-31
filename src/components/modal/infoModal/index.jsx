/* CSS */
import './css/InfoModalStyles.css';

export default function InfoModal({
  title,
  description,
  onClose,
}) {
  return (
    <div id="component_modal_info">
      <div id="component_modal_info_overlay" onClick={onClose}>
        <div id="component_modal_info_container" onClick={(e) => e.stopPropagation()}>
          <h4>{title}</h4>
          <p>{description}</p>

          <div>
            <button
              id="component_modal_info_button_close"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}