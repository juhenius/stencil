import { Loader } from "lucide-react";
import { type StencilId } from "../context/Stencil.ts";
import { usePromptStencil } from "../context/usePromptStencil.ts";
import { Button } from "./Button.tsx";
import { Input } from "./Input.tsx";

type PromptStencilSettingsProps = {
  id: StencilId;
};

export function PromptStencilSettings({ id }: PromptStencilSettingsProps) {
  const {
    stencil,
    updateStencil,
    removeStencil,
    isGeneratingImage,
    generateImage,
  } = usePromptStencil(id);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative w-36 h-36">
          {stencil.svg && (
            <img
              src={`data:image/svg+xml;UTF8,${stencil.svg}`}
              alt={stencil.prompt}
              className="w-full h-full bg-gray-100 rounded-md"
            />
          )}
          {isGeneratingImage && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
              <Loader className="animate-spin text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            id={`prompt-${id}`}
            label="Prompt"
            type="textarea"
            value={stencil.prompt}
            onChange={(prompt) => updateStencil({ prompt })}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button onClick={generateImage} disabled={isGeneratingImage}>
          Generate
        </Button>
        <Button onClick={() => removeStencil()} variant="secondary">
          Remove
        </Button>
      </div>
    </div>
  );
}
