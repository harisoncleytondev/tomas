/* CSS */
import "./CardsStyles.css";

export default function CardHome({ image, title, description }) {
  return (
    <div id="home_component_cardhome_div_container">
      <div id="home_component_cardhome_div_title">
        <img src={image} />
        <h5>{title}</h5>
      </div>
      <div id="home_component_cardhome_div_space"></div>
      <p>{description}</p>
    </div>
  );
}
