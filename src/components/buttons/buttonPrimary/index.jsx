/* CSS */
import './css/ButtonStyles.css';

export default function ButtonBlue({ children, ...props }) {
  return (
    <div id='component_buttonblue_div_container'>
      <button {...props}>{children}</button>
    </div>
  )
}