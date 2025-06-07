/* CSS */
import "./FooterStyles.css";

export default function Footer( {...props} ) {
  return (
    <div {...props} id="component_footer_div_container">
      <p>
        © {" " + new Date().getFullYear() + " "} Thomas.{" "}
        <span>Todos os direitos</span> reservados.
      </p>
    </div>
  );
}
