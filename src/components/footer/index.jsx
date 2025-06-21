/* CSS */
import "./css/FooterStyles.css";

export default function Footer({ ...props }) {
  return (
    <footer {...props} id="component_footer_container">
      <p>🤖 Tomas IA, feito com muito amor para ajudar você <br/> &copy; {new Date().getFullYear()} Tomas. Todos os direitos reservados.</p>
    </footer>
  );
}
