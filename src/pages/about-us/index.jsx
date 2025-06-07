/* CSS */
import "./AboutStyles.css";

/* COMPONENTS */
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import ButtonBlue from "../../components/buttonPrimary";
import BackgroundDecor from "../../components/backgroundDecor";

export default function About() {
  return (
    <div>
      <NavBar active="about" />
      <BackgroundDecor />

      <section id="about_section_container">
        <div id="about_div_texts">
          <h1>Olá, Quem somos?</h1>
          <p>
            Somos estudantes do <span>Senac Paulista</span> que acreditam que
            todo mundo merece aprender com apoio e respeito às diferenças.
            Criamos esta IA pensando em quem aprende de jeitos únicos, com foco
            na <span>ODS 4 – Educação de Qualidade</span>. Queremos tornar o
            estudo mais acessível, leve e inclusivo para todos.
          </p>
        </div>

        <div id="about_div_contact">
          <div id="about_div_form">
            <form>
              <div id="about_div_form_header">
                <h3>Precisa de ajuda? Fale com a gente!</h3>
              </div>

              <div id="about_div_form_body">
                <div>
                  <label htmlFor="about_input_email" className="about_label">
                    Email:
                  </label>
                  <div className="about_form_input_container">
                    <input
                      type="email"
                      className="about_input"
                      id="about_input_email"
                      placeholder="seuemail@gmail.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="about_input_text" className="about_label">
                    Assunto:
                  </label>
                  <div className="about_form_input_container">
                    <textarea
                      className="about_input"
                      id="about_input_text"
                      placeholder="Sobre o que deseja falar?"
                      required
                    />
                  </div>
                </div>

                <div id="about_div_form_body_button">
                  <ButtonBlue id="about_button_one">
                    Entrar em contato
                  </ButtonBlue>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
