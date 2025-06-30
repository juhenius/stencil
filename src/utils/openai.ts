import OpenAI from "openai";

export async function generateImageWithOpenAI(
  apiKey: string,
  prompt: string
): Promise<string> {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt,
    n: 1,
    size: "256x256",
    response_format: "b64_json",
  });

  const image = response.data?.[0]?.b64_json;

  if (!image) {
    throw new Error("No image data returned from API");
  }

  return `data:image/png;base64,${image}`;
}
