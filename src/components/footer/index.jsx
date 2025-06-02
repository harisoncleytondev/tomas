import './FooterStyles.css';

export default function Footer() {
  return (
    <div className='footer'>
        
        <p>© {" " + new Date().getFullYear() + " "} Thomas. <span>Todos os direitos</span> reservados.</p>

    </div>
  )
}