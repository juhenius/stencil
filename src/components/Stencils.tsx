import { useAppContext } from "../context/AppContext.tsx";
import type { StencilType } from "../context/Stencil.ts";
import { Button } from "./Button.tsx";
import { Panel } from "./Panel.tsx";
import { StencilItem } from "./StencilItem.tsx";
import { StencilTypeIcon } from "./StencilTypeIcon.tsx";
import { Title } from "./Title.tsx";

export function Stencils() {
  const { stencils, prependStencil } = useAppContext();
  return (
    <Panel
      size="fill"
      title={
        <div className="mb-2 flex justify-between items-center">
          <Title>Stencils</Title>
          <AddStencilButtonBar onAddStencil={prependStencil} />
        </div>
      }
    >
      {stencils.map(({ id }) => (
        <StencilItem key={id} id={id} />
      ))}
    </Panel>
  );
}

type AddStencilButtonBarProps = {
  onAddStencil: (type: StencilType) => void;
};

function AddStencilButtonBar({ onAddStencil }: AddStencilButtonBarProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      <Button onClick={() => onAddStencil("svg")}>
        Add <StencilTypeIcon type="svg" />
      </Button>
      <Button onClick={() => onAddStencil("prompt")}>
        Add <StencilTypeIcon type="prompt" />
      </Button>
    </div>
  );
}
