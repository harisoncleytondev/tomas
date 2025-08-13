/* CSS */
import './css/NavbarStyles.css';
import './css/HomeStyles.css';
import './css/HomeStyles.responsive.css';

/* ASSETS */
import tomasIcon from './assets/TomasOFC.png';
import bot from './assets/icon_bot.png';
import book from './assets/icon_book.png';
import chat from './assets/icon_chat.png';
import brain from './assets/brain.png';

/* COMPONENTS */
import ButtonBlue from '../../components/buttons/buttonPrimary';
import CardHome from '../../components/home/cardHome';
import PlansCard from '../../components/home/plans';
import Footer from '../../components/footer';

/* REACT ICONS */
import { GrFormNextLink } from 'react-icons/gr';
import { SlArrowDown } from 'react-icons/sl';
import { HiArrowUp } from 'react-icons/hi';

/* REACT ROUTER DOM */
import { useNavigate } from 'react-router-dom';

/* REACT */
import { useEffect, useState } from 'react';

/* FRAMER MOTION */
import { motion } from 'framer-motion';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const fadeProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home_container">
      <div id="home_goTop">
        <button
          onClick={goTop}
          className={visible ? 'visible' : ''}
          aria-label="Voltar ao topo"
        >
          <HiArrowUp />
        </button>
      </div>

      <motion.section
        id="home_navbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src={tomasIcon} alt="Tomas" />
        <div id="home_navbar_links">
          <ul>
            <li>
              <a href="#home_index">Inicio</a>
            </li>
            <li>
              <a href="#home_technology">Tecnologia</a>
            </li>
            <li>
              <a href="#home_plans">Planos</a>
            </li>
          </ul>
        </div>
        <div id="home_navbar_buttons">
          <button
            id="home_navbar_button_join"
            onClick={() => navigate('/entrar')}
          >
            Entrar
          </button>
          <ButtonBlue
            id="home_navbar_button_register"
            onClick={() => navigate('/criar-conta')}
          >
            Começar Grátis
          </ButtonBlue>
        </div>
      </motion.section>

      <section id="home_index">
        <motion.div id="home_index_div_title" {...fadeProps}>
          <h1>
            A inteligência Artificial
            <br />
            <span>pensada para todos os cérebros</span>
          </h1>
          <p>
            Uma inteligência feita para entender você. Converse com nosso
            chatbot, pensado para tirar dúvidas, organizar ideias e receber
            ajuda do seu jeito.
          </p>
          <ButtonBlue onClick={() => navigate('/criar-conta')}>
            Começar agora <GrFormNextLink />
          </ButtonBlue>
        </motion.div>

        <motion.div
          id="home_index_div_cards"
          {...fadeProps}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CardHome
            image={chat}
            title="Respostas Rápidas"
            description="Obtenha respostas instantâneas para suas dúvidas e perguntas sobre diversos assuntos."
          />
          <CardHome
            image={bot}
            title="Suporte 24/7"
            description="Assistência disponível a qualquer hora, respondendo quando você precisar."
          />
          <CardHome
            image={book}
            title="Inteligência Inclusiva"
            description="Receba apoio com empatia, clareza e no seu ritmo. Conversas adaptadas para atender diferentes formas de pensar e aprender."
          />
        </motion.div>

        <div id="home_index_div_deslize">
          <span></span>
        </div>
      </section>

      <section id="home_technology">
        <motion.div id="home_technology_div_title" {...fadeProps}>
          <h2>
            O que é o <span>Tomas?</span>
          </h2>
          <p>
            Nossa IA foi criada para apoiar pessoas neurodivergentes,
            adaptando-se ao seu ritmo e estilo de pensar. Ela organiza ideias,
            reduz distrações e facilita a comunicação sendo uma aliada para quem
            enxerga o mundo de forma única.
          </p>
        </motion.div>

        <section>
          <motion.div
            id="home_technology_div_info"
            {...fadeProps}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4>Como Funciona a IA?</h4>
            <div>
              <div>
                <span>
                  Nossa IA é baseada em um sistema RAG (Retrieval-Augmented
                  Generation), que combina busca inteligente com geração de
                  texto para respostas mais precisas.
                </span>
                <span>
                  Desenvolvida em Python e treinada com dados de pessoas
                  neurodivergentes, ela entende diferentes formas de pensar e se
                  comunica de forma empática e adaptada.
                </span>
                <span>
                  A IA busca informações relevantes, processa com sensibilidade
                  cognitiva e gera respostas claras, respeitando o ritmo de cada
                  pessoa.
                </span>
              </div>
              <img src={brain} alt="Cérebro" />
            </div>
          </motion.div>
        </section>
      </section>

      <section id="home_plans">
        <motion.div id="home_plans_div_title" {...fadeProps}>
          <h1>
            Planos e <span>Preços</span>
          </h1>
          <p>Escolha o Plano ideal para suas necessidades.</p>
        </motion.div>

        <motion.div
          id="home_plans_div_cards"
          {...fadeProps}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PlansCard
            name="Gratuito"
            price="0"
            className="home_plans_components"
            desc="Perfeito para testes."
            benefits={[
              'Teste grátis por 7 dias',
              'Consultas ilimitadas.',
              'Respostas adaptadas e pensadas em você.',
              'Respostas multimodais.',
              '24 horas por dia, 7 dias na semana.',
            ]}
          />

          <PlansCard
            name="Mente Livre"
            price="50"
            className="home_plans_components"
            benefits={[
              'Curta tudo por um mês inteiro.',
              'Consultas ilimitadas.',
              'Respostas adaptadas e pensadas em você.',
              'Respostas multimodais.',
              'Disponível 24 horas por dia, 7 dias na semana.',
            ]}
          />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
