import './ButtonStyles.css';

export default function ButtonBlue( { divName, name } ) {
  return (
    <div className='buttonsHome'>
      <button className={divName}>{name}</button>
    </div>
  )
}