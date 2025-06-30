// @ts-expect-error - No types for imagetracerjs
import ImageTracer from "imagetracerjs";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

export function vectorize(image: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const svg = ImageTracer.imagedataToSVG(imageData, "posterized1");
      resolve(svg);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = image;
  });
}

export function generateMeshFromSvg(
  svg: string,
  color: THREE.Color,
  thickness: number
): THREE.Group {
  const loader = new SVGLoader();
  const parseResult = loader.parse(svg);
  const group = new THREE.Group();

  group.rotation.x = Math.PI;

  const visiblePaths = parseResult.paths.filter((path) => isSolid(path.color));

  // Collect all shapes to calculate bounding box
  const visibleShapes: THREE.Shape[] = [];
  visiblePaths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);
    visibleShapes.push(...shapes);
  });

  // Calculate bounding box of all shapes
  if (visibleShapes.length > 0) {
    const boundingBox = new THREE.Box3();
    visibleShapes.forEach((shape) => {
      const points = shape.getPoints();
      points.forEach((point) => {
        boundingBox.expandByPoint(new THREE.Vector3(point.x, point.y, 0));
      });
    });

    // Calculate center offset
    const center = boundingBox.getCenter(new THREE.Vector3());
    const offset = new THREE.Vector3(-center.x, -center.y, 0);

    // Create meshes with offset
    visiblePaths.forEach((path) => {
      const material = new THREE.MeshStandardMaterial({
        color,
        side: THREE.DoubleSide,
        depthWrite: true,
      });

      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: thickness,
          bevelEnabled: false,
        });

        // Apply offset to center the geometry
        geometry.translate(offset.x, offset.y, offset.z);

        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      });
    });
  }

  return group;
}

function isSolid(color: THREE.Color): boolean {
  return color.r > 0.5 && color.g > 0.5 && color.b > 0.5;
}
