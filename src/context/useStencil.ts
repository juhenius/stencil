import { useAppContext } from "./AppContext.tsx";
import { type Stencil, type StencilId } from "./Stencil.ts";

export type StencilUpdate<T extends Stencil> = Partial<Omit<T, "id" | "type">>;

export type UseStencilResult<T extends Stencil> = {
  stencil: T;
  updateStencil: (values: StencilUpdate<T>) => void;
  removeStencil: () => void;
};

export function useStencil<T extends Stencil>(
  id: StencilId
): UseStencilResult<T> {
  const { stencils, setStencils } = useAppContext();
  const stencil = stencils.find((stencil) => stencil.id === id);

  if (!stencil) {
    throw new Error(`Stencil with id ${id} not found`);
  }

  return {
    stencil: stencil as T,
    updateStencil(values: StencilUpdate<T>) {
      setStencils(
        (current) =>
          current.map((stencil) =>
            stencil.id === id ? { ...stencil, ...values } : stencil
          ) as T[]
      );
    },
    removeStencil() {
      setStencils((current) => current.filter((stencil) => stencil.id !== id));
    },
  };
}
