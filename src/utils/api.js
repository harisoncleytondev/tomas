export function getURL() {
  return import.meta.env.VITE_BACKEND_URL;
}

function transformMessages(history) {
  if (history == null) return [];
  return history.map((msg) => ({
    role: msg.is_bot ? 'assistant' : 'user',
    content: msg.message_content,
  }));
}

/* temporario */
export async function askToBot({
  history = [],
  systemPrompt = getPrompt(),
  question,
  model = 'llama3-8b-8192',
  temperature = 0.7,
}) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...transformMessages(history),
          { role: 'user', content: question },
        ],
        temperature,
      }),

    });
    
    if (!response.ok) {
      throw new Error(
        `Erro na API Groq: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return null;
  }
}
