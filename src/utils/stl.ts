import * as THREE from "three";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export function exportStl(
  mesh: THREE.Group,
  filename: string,
  binary: boolean = false
) {
  downloadStl(generateStl(mesh), filename, binary);
}

export function generateStl(source: THREE.Group): string {
  const geometries = collectGeometries(source);
  const mesh = mergeGeometries(geometries);
  const exporter = new STLExporter();
  const stl = exporter.parse(mesh);
  return stl;
}

function collectGeometries(source: THREE.Group): THREE.BufferGeometry[] {
  const result: THREE.BufferGeometry[] = [];

  source.updateMatrixWorld(true);

  source.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const clonedGeometry = child.geometry.clone();
      const transformedGeometry = clonedGeometry.applyMatrix4(
        child.matrixWorld
      );
      result.push(transformedGeometry);
    }
  });

  return result;
}

function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.Mesh {
  const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries);
  return new THREE.Mesh(mergedGeometry);
}

function downloadStl(stl: string, filename: string, binary: boolean = false) {
  const blob = new Blob([stl], {
    type: binary ? "application/octet-stream" : "text/plain",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
