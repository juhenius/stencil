import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { initialInstructions, initialStencils } from "../initialValues.ts";
import { exportStl as exportStlUtils } from "../utils/stl.ts";
import { generateMeshFromSvg } from "../utils/svg.ts";
import { createStencil, type Stencil, type StencilType } from "./Stencil.ts";

type SetStencils = (stencils: Stencil[]) => Stencil[];
export interface AppContext {
  apiKey: string;
  setApiKey: (key: string) => void;
  instructions: string;
  setInstructions: (text: string) => void;
  stencils: Stencil[];
  setStencils: (setter: SetStencils) => void;
  appendStencil: (type: StencilType) => void;
  prependStencil: (type: StencilType) => void;
  mesh: THREE.Group | null;
  rebuildMesh: () => void;
  exportStl: () => void;
}

const appContext = createContext<AppContext | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [apiKey, setApiKey] = useState(
    import.meta.env.VITE_OPENAI_API_KEY || ""
  );
  const [instructions, setInstructions] = useState(initialInstructions);
  const [stencils, setStencils] = useState<Stencil[]>(initialStencils);
  const [mesh, setMesh] = useState<THREE.Group | null>(null);

  useEffect(() => {
    rebuildMesh();
  }, [stencils]);

  const appendStencil = (type: StencilType) => {
    setStencils((currentStencils) => [...currentStencils, createStencil(type)]);
  };

  const prependStencil = (type: StencilType) => {
    setStencils((currentStencils) => [createStencil(type), ...currentStencils]);
  };

  const rebuildMesh = () => {
    if (stencils.length === 0) {
      setMesh(null);
      return;
    }

    const combinedMesh = combineMeshes(stencils);

    setMesh(combinedMesh);
  };

  const exportStl = () => {
    if (!mesh) {
      alert("No mesh to export");
      return;
    }

    exportStlUtils(mesh, "mesh.stl", false);
  };

  const value = {
    apiKey,
    setApiKey,
    instructions,
    setInstructions,
    stencils,
    setStencils,
    appendStencil,
    prependStencil,
    mesh,
    rebuildMesh,
    exportStl,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

export function useAppContext() {
  const context = useContext(appContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}

function combineMeshes(stencils: Stencil[]) {
  const individualMeshes = stencils.map((stencil) =>
    generateMeshFromSvg(stencil.svg, new THREE.Color(0.5, 0.5, 0.5), 1)
  );

  const maxStencilsPerRow = Math.ceil(Math.sqrt(stencils.length));

  const meshBounds: THREE.Box3[] = [];
  individualMeshes.forEach((mesh) => {
    const box = new THREE.Box3().setFromObject(mesh);
    meshBounds.push(box);
  });

  const maxWidth = Math.max(
    ...meshBounds.map((box) => box.getSize(new THREE.Vector3()).x)
  );
  const maxHeight = Math.max(
    ...meshBounds.map((box) => box.getSize(new THREE.Vector3()).y)
  );

  const combinedMesh = new THREE.Group();

  individualMeshes.forEach((mesh, index) => {
    const row = Math.floor(index / maxStencilsPerRow);
    const col = index % maxStencilsPerRow;

    const x = col * maxWidth;
    const y = -row * maxHeight;

    const positionedMesh = mesh.clone();
    positionedMesh.position.set(x, y, 0);

    const box = meshBounds[index];
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    positionedMesh.position.x += (maxWidth - size.x) / 2 - center.x;
    positionedMesh.position.y += (maxHeight - size.y) / 2 - center.y;

    combinedMesh.add(positionedMesh);
  });

  combinedMesh.updateMatrixWorld();

  const combinedBox = new THREE.Box3().setFromObject(combinedMesh);
  const combinedCenter = combinedBox.getCenter(new THREE.Vector3());
  combinedMesh.position.set(
    -combinedCenter.x,
    -combinedCenter.y,
    -combinedCenter.z
  );
  console.log(combinedCenter);

  combinedMesh.updateMatrixWorld();

  return combinedMesh;
}
