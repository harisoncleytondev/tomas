/* CSS */
import './HomeStyles.css';

/* COMPONENTS */
import ButtonBlue from '../../components/buttonPrimary';
import CardHome from './components/cardHome';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';

/* ASSETS */
import bot from '../../../public/assets/icons/home/icon_bot.png';
import book from '../../../public/assets/icons/home/icon_book.png';
import chat from '../../../public/assets/icons/home/icon_chat.png';

export default function Home() {
  
  return (
    <div className='home'>

      <NavBar active="home"/>
      
      <div id='texts'>
        <h1>Bem-vindo ao seu <br></br>Assistente IA</h1>
        <p>Uma inteligência feita para entender você. Converse com nosso chatbot <br></br> 
        pensado tire dúvidas, organize ideias e receba ajuda do seu jeito.</p>
      </div>
      
       <div id='buttons'>
          <ButtonBlue>Começar Agora \u2192</ButtonBlue>
       </div>

      <div id='cards'>
        <CardHome 
          image={chat}
          title='Respostas Rápidas'
          description='Obtenha respostas instantâneas para suas 
          dúvidas  e perguntas sobre diversos 
          assuntos.'
          />
        <CardHome 
          image={bot}
          title='Suporte 24/7'
          description='Assistência disponível a qualquer hora, respondendo quando você precisar.'
          />
        <CardHome 
          image={book}
          title='Inteligência Inclusiva'
          description='Receba apoio com empatia, clareza e 
          no seu ritmo. Conversas adaptadas 
          para atender diferentes formas de 
          pensar e aprender.'
          />
      </div>

      <Footer />
      
    </div>
  )
}