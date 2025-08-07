import { getToken } from "./auth";

export function getURL() {
  return import.meta.env.VITE_BACKEND_URL;
}

export async function askToBot({
  history = [],
  systemPrompt = getPrompt(),
  question,
  temperature = 0.7,
}) {
  const token = await getToken();

  try {
    if (token == null) {
      throw new Error('Erro ao buscar token de autenticação do usuário.');
    }

    const response = await fetch(`${getURL()}ia/ask`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        systemPrompt,
        question,
        temperature,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar IA: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.reply; 
  } catch (err) {
    console.error('Erro ao fazer requisição para /ia/ask:', err);
    return null;
  }
}
