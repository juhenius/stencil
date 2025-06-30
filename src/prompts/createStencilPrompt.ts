export function createStencilPrompt(
  instructions: string,
  stencilPrompt: string
): string {
  return instructions.replace("[STENCIL_PROMPT]", stencilPrompt.trim());
}
