import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type ComponentRef } from "react";
import * as THREE from "three";
import { useAppContext } from "../context/AppContext.tsx";
import { Panel } from "./Panel.tsx";

export function CompositePreview() {
  const { mesh } = useAppContext();

  return (
    <Panel title="Preview" size="fill">
      <div className="flex-1 min-h-0">
        <Canvas
          camera={{
            position: [0, 0, 120],
            near: 0.1,
            far: Number.MAX_SAFE_INTEGER,
          }}
        >
          <CameraDirectionalLight targetPosition={new THREE.Vector3(0, 0, 0)} />
          {mesh && <primitive object={mesh} />}
          <CameraController />
        </Canvas>
      </div>
    </Panel>
  );
}

type Props = {
  targetPosition: THREE.Vector3;
};

function CameraDirectionalLight({ targetPosition }: Props) {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const { camera, scene } = useThree();

  useEffect(() => {
    // Add target to scene only once
    scene.add(targetRef.current);

    // Cleanup function
    return () => {
      if (scene.children.includes(targetRef.current)) {
        scene.remove(targetRef.current);
      }
    };
  }, [scene]);

  useFrame(() => {
    const light = lightRef.current;
    const target = targetRef.current;
    if (light && target) {
      light.position.copy(camera.position);
      target.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
      light.target = target;
      light.target.updateMatrixWorld();
    }
  });

  return <directionalLight ref={lightRef} intensity={2} />;
}

function CameraController() {
  const { mesh } = useAppContext();
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const hasInitialized = useRef(false);
  const lastBoundingBox = useRef<THREE.Box3 | null>(null);
  const lastMeshRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (!controlsRef.current || !mesh) {
      return;
    }

    // Only recalculate if mesh has actually changed
    if (lastMeshRef.current === mesh) {
      return;
    }

    const boundingBox = calculateBoundingBox(mesh);
    if (!boundingBox) {
      return;
    }

    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const shouldUpdate =
      !hasInitialized.current ||
      !lastBoundingBox.current ||
      lastBoundingBox.current.getSize(new THREE.Vector3()).distanceTo(size) >
        0.1;

    if (!shouldUpdate) {
      return;
    }

    const distance = maxDim * 2.5;
    const camera = controlsRef.current.object;

    // Only reset camera position on first initialization or when mesh changes
    if (!hasInitialized.current || lastMeshRef.current !== mesh) {
      camera.position.set(center.x, center.y, center.z + distance);
      camera.lookAt(center);
      camera.updateMatrixWorld();
      controlsRef.current.target.copy(center);
    } else {
      // Just update the target to keep model centered, but preserve camera orientation
      controlsRef.current.target.copy(center);
    }

    controlsRef.current.update();
    lastBoundingBox.current = boundingBox.clone();
    lastMeshRef.current = mesh;
    hasInitialized.current = true;
  });

  return <OrbitControls ref={controlsRef} />;
}

function calculateBoundingBox(mesh: THREE.Group): THREE.Box3 | null {
  const meshes: THREE.Mesh[] = [];

  mesh.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      meshes.push(child);
    }
  });

  if (meshes.length === 0) {
    return null;
  }

  const result = new THREE.Box3();
  meshes.forEach((mesh) => {
    result.expandByObject(mesh);
  });

  return result;
}
