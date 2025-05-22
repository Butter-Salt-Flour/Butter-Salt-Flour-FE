import api from "./instance";

type GeminiRequest = {
  text: string;
};

type GeminiResponse = {
  result: string;
};

export const requestGemini = async (
  data: GeminiRequest
): Promise<GeminiResponse> => {
  const response = await api.post<GeminiResponse>("/gemini", data);
  return response.data;
};
