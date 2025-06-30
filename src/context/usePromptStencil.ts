import { useState } from "react";
import { createStencilPrompt } from "../prompts/createStencilPrompt.ts";
import { generateImageWithOpenAI } from "../utils/openai.ts";
import { vectorize } from "../utils/svg.ts";
import { useAppContext } from "./AppContext.tsx";
import {
  isPromptStencil,
  type PromptStencil,
  type StencilId,
} from "./Stencil.ts";
import {
  useStencil,
  type StencilUpdate,
  type UseStencilResult,
} from "./useStencil.ts";

type UsePromptStencilResult = UseStencilResult<PromptStencil> & {
  generateImage: () => Promise<void>;
  isGeneratingImage: boolean;
};

export function usePromptStencil(id: StencilId): UsePromptStencilResult {
  const { apiKey, instructions } = useAppContext();
  const result = useStencil<PromptStencil>(id);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { stencil, updateStencil } = result;

  if (!isPromptStencil(stencil)) {
    throw new Error(`Stencil with id ${id} is not a prompt stencil`);
  }

  const generateImage = async () => {
    if (!apiKey) {
      alert("Please enter your OpenAI API key.");
      return;
    }

    try {
      setIsGeneratingImage(true);
      const prompt = createStencilPrompt(instructions, stencil.prompt);
      const image = await generateImageWithOpenAI(apiKey, prompt);
      const svg = await vectorize(image);
      updateStencil({ svg });
    } catch (error) {
      console.error(error);
      alert("Failed to generate image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return {
    ...result,
    updateStencil(values: StencilUpdate<PromptStencil>) {
      if ("prompt" in values) {
        values.title = values.prompt;
      }

      updateStencil(values);
    },
    isGeneratingImage,
    generateImage,
  };
}
