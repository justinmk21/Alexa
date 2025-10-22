import api from "../api";

// A chat with gemini-2.5-flash

export const chatWithGemini = async (prompt) => {
  try {
    const response = await api.post("chatbot/gemini/", { prompt });
    console.log(response)
    return response.data.response;
  } catch (err) {
    console.log(err);
    return `Error: ${err.response?.data?.error || err.message}`;
  }
};

// A chat with Groq chat

export const chatWithGroq = async (prompt) => {
  try {
    const response = await api.post("chatbot/groq/", { prompt });
    return response.data.response;
  } catch (err) {
    console.log(err);
    return `Error: ${err.response?.data?.error || err.message}`;
  }
};

// Generate Images with hugging face stable difussion

export const generateImage = async (prompt) => {
  try {
    const response = await api.post("chatbot/image/", { prompt });
    console.log(response.data);
    return response.data.image_url;
  } catch (err) {
    console.log(err);
    return null;
  }
};
