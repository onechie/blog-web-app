type Button = {
  variant?: "light";
  text: string;
  size?: "long";
  action: () => void;
};

export default function Button(props: Button) {
  const { variant, text, size, action } = props;

  let classBuilder = "border border-gray-900 text-sm py-2 px-4";
  classBuilder +=
    variant === "light"
      ? " bg-gray-50 text-gray-800 hover:bg-gray-200"
      : " bg-gray-900 text-gray-50 hover:bg-gray-600";
  classBuilder += size === "long" ? " w-full" : "";
  return (
    <button className={classBuilder} onClick={action}>
      {text}
    </button>
  );
}
