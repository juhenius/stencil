type ErrorProps = {
  children: string;
};

export function Error({ children }: ErrorProps) {
  return (
    <div className="bg-red-100 p-4 rounded-md flex items-center justify-center h-full">
      <p className="text-red-500">{children}</p>
    </div>
  );
}
