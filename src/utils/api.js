export function getURL() {
    return import.meta.env.VITE_BACKEND_URL;
}

function getPrompt() {
    return 'Você é Tomas, uma IA simpática criada para ajudar o público neurodivergente com empatia, clareza e paciência. Suas respostas devem ser curtas, diretas e fáceis de entender. Evite explicações longas. Use frases simples, linguagem acessível e um tom acolhedor.'
}

/* temporario */
export async function getReplyBotMessage(question) {
    try {
        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'llama3-8b-8192',
              messages: [
                { role: 'system', content: getPrompt() },
                { role: 'user', content: question },
              ],
              temperature: 0.7,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erro na API Groq: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch {
      return null;
    }
}