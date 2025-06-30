import { type StencilId } from "../context/Stencil.ts";
import { useSvgStencil } from "../context/useSvgStencil.ts";
import { Button } from "./Button.tsx";
import { Input } from "./Input.tsx";

type SvgStencilSettingsProps = {
  id: StencilId;
};

export function SvgStencilSettings({ id }: SvgStencilSettingsProps) {
  const { stencil, updateStencil, removeStencil } = useSvgStencil(id);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative w-36 h-36">
          <img
            src={`data:image/svg+xml;UTF8,${stencil.svg}`}
            alt={stencil.title}
            className="w-full h-full bg-gray-100 rounded-md"
          />
        </div>
        <div className="flex-1 space-y-2">
          <Input
            id={`title-${id}`}
            label="Title"
            type="text"
            value={stencil.title}
            onChange={(title) => updateStencil({ title })}
          />
          <Input
            id={`svg-${id}`}
            label="Svg"
            type="textarea"
            value={stencil.svg}
            onChange={(svg) => updateStencil({ svg })}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button onClick={() => removeStencil()} variant="secondary">
          Remove
        </Button>
      </div>
    </div>
  );
}
