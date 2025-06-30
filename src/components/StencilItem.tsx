import { ChevronDown, ChevronRight } from "lucide-react";
import { type StencilId } from "../context/Stencil.ts";
import { useStencil } from "../context/useStencil.ts";
import { PromptStencilSettings } from "./PrompStencilSettings.tsx";
import { SvgStencilSettings } from "./SvgStencilSettings.tsx";

type StencilItemProps = {
  id: StencilId;
};

export function StencilItem({ id }: StencilItemProps) {
  const { stencil, updateStencil } = useStencil(id);

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white space-y-4">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => updateStencil({ collapsed: !stencil.collapsed })}
      >
        {stencil.collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
        <p className="truncate font-medium text-gray-900 flex-1">
          {stencil.title}
        </p>
      </div>

      {!stencil.collapsed && (
        <div className="pt-4 border-t border-gray-200">
          <StencilSettings id={id} />
        </div>
      )}
    </div>
  );
}

type StencilSettingsProps = {
  id: StencilId;
};

function StencilSettings({ id }: StencilSettingsProps) {
  const { stencil: stencil } = useStencil(id);
  switch (stencil.type) {
    case "svg":
      return <SvgStencilSettings id={id} />;
    case "prompt":
      return <PromptStencilSettings id={id} />;
  }
}
