import './ButtonStyles.css';

export default function ButtonBlue({ children, ...props }) {
  return (
    <div className='buttonsHome'>
      <button {...props}>{children}</button>
    </div>
  )
}