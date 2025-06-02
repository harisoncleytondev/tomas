import './CardsStyles.css';

export default function CardHome( {image, title, description}) {
  return (
    <div id='containerCard'>
       <div id='title'>
         <img src={image}/>
         <h5>{title}</h5>
       </div>
      <div id='space'></div>
      <p>{description}</p>
    </div>
  )
}