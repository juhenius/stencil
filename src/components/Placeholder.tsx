type PlaceholderProps = {
  children: string;
};

export function Placeholder({ children }: PlaceholderProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center h-full">
      <p className="text-gray-500">{children}</p>
    </div>
  );
}
