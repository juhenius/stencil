import { useAppContext } from "./AppContext.tsx";
import { isSvgStencil, type StencilId, type SvgStencil } from "./Stencil.ts";
import {
  useStencil,
  type StencilUpdate,
  type UseStencilResult,
} from "./useStencil.ts";

type UseSvgStencilResult = UseStencilResult<SvgStencil>;

export function useSvgStencil(id: StencilId): UseSvgStencilResult {
  const { rebuildMesh } = useAppContext();
  const result = useStencil<SvgStencil>(id);
  const { stencil, updateStencil } = result;

  if (!isSvgStencil(stencil)) {
    throw new Error(`Stencil with id ${id} is not a svg stencil`);
  }

  return {
    ...result,
    updateStencil(values: StencilUpdate<SvgStencil>) {
      updateStencil(values);
      if ("svg" in values) {
        rebuildMesh();
      }
    },
  };
}
