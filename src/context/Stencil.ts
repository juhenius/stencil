export type StencilId = string;

export type StencilType = "svg" | "prompt";

export type Stencil = SvgStencil | PromptStencil;

export interface BaseStencil {
  id: StencilId;
  title: string;
  svg: string;
  collapsed: boolean;
}

export interface SvgStencil extends BaseStencil {
  type: "svg";
}

export interface PromptStencil extends BaseStencil {
  type: "prompt";
  prompt: string;
}

export function createStencil(type: StencilType): Stencil {
  switch (type) {
    case "svg":
      return {
        id: crypto.randomUUID(),
        type: "svg",
        title: "New Stencil",
        collapsed: false,
        svg: "",
      };
    case "prompt":
      return {
        id: crypto.randomUUID(),
        type: "prompt",
        title: "New Stencil",
        collapsed: false,
        svg: "",
        prompt: "",
      };
  }
}

export function isSvgStencil(stencil: Stencil): stencil is SvgStencil {
  return stencil.type === "svg";
}

export function isPromptStencil(stencil: Stencil): stencil is PromptStencil {
  return stencil.type === "prompt";
}
