import { Stack } from "./Stack.tsx";
import { Title } from "./Title.tsx";

type PanelProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  size?: "default" | "fill";
};

export function Panel({ title, children, size = "default" }: PanelProps) {
  const sizeClasses =
    size === "fill" ? "flex-1 flex flex-col h-full min-h-0" : "";

  return (
    <div className={sizeClasses}>
      {typeof title === "string" ? <Title>{title}</Title> : title}
      <Stack size={size}>{children}</Stack>
    </div>
  );
}
