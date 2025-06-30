import { CircleQuestionMark, Image, MessageCircleMore } from "lucide-react";
import type { StencilType } from "../context/Stencil.ts";

export function StencilTypeIcon({ type }: { type: StencilType }) {
  switch (type) {
    case "svg":
      return <Image />;
    case "prompt":
      return <MessageCircleMore />;
    default:
      return <CircleQuestionMark />;
  }
}
