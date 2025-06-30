type StackProps = {
  children: React.ReactNode;
  size?: "default" | "fill";
};

export function Stack({ children, size = "default" }: StackProps) {
  const sizeClasses = size === "fill" ? "flex-1 min-h-0 overflow-y-auto" : "";
  return <div className={`flex flex-col gap-4 ${sizeClasses}`}>{children}</div>;
}
