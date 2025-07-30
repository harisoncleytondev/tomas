/* REACT ICONS */
import { FaRegPaperPlane } from 'react-icons/fa6';

/* CSS */
import './css/PromptStyles.css';
import './css/PromptStyles.responsive.css'

export default function Prompt({ refPrompt, sendPrompt, ...props }) {
  const handleInput = () => {
    const textarea = refPrompt.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
  };

  return (
    <section {...props} id="component_prompt_container">
      <form onSubmit={(e) => e.preventDefault()}>
        <textarea
          ref={refPrompt}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          name="question"
          placeholder="Sobre o que deseja conversar?"
          rows={1}
        ></textarea>
        <button onClick={sendPrompt}>
          <FaRegPaperPlane />
        </button>
      </form>
    </section>
  );
}
