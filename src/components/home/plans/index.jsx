/* CSS */
import ButtonBlue from '../../buttonPrimary';
import './PlansStyles.css';

/* REACT ICONS */
import { FaCheck } from 'react-icons/fa6';

export default function PlansCard({ name, desc, price, benefits }) {
  return (
    <div id="home_component_plans">
      <div>
        <h5>{name}</h5>
        <h6>{desc}</h6>
      </div>
      <p>{`R$ ${price}`}<span>/mês</span></p>
      <ul>
        {Array.isArray(benefits) &&
          benefits.map((benefit, index) => (
            <li key={index}>
              <span>
                <FaCheck />
              </span>{' '}
              {benefit}
            </li>
          ))}
      </ul>
      <ButtonBlue id="home_component_plans_button">Assinar agora</ButtonBlue>
    </div>
  );
}
