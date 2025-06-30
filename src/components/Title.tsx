type TitleProps = {
  children: string;
};

export function Title({ children }: TitleProps) {
  return <h2 className="text-2xl font-bold mb-2">{children}</h2>;
}
