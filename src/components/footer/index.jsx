/* CSS */
import "./FooterStyles.css";

export default function Footer() {
  return (
    <div id="component_footer_div_container">
      <p>
        © {" " + new Date().getFullYear() + " "} Thomas.{" "}
        <span>Todos os direitos</span> reservados.
      </p>
    </div>
  );
}
