interface BaseInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface TextInputProps extends BaseInputProps {
  type: "text" | "password" | "color";
}

interface TextAreaProps extends BaseInputProps {
  type: "textarea";
  rows?: number;
}

export type InputProps = TextInputProps | TextAreaProps;

export function Input({
  label,
  value,
  onChange,
  type = "text",
  id,
  ...rest
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={(rest as TextAreaProps).rows ?? 4}
        />
      ) : type === "color" ? (
        <input
          type="color"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full h-9 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      )}
    </div>
  );
}
