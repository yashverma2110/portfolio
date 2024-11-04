export default function Button({ children, className, type = "button", size = "md" }: { children: React.ReactNode, className?: string, type?: "button" | "submit" | "reset", size?: "sm" | "md" | "lg" }) {
  function getSize() {
    if (size === "sm") return "text-sm md:text-base";
    if (size === "md") return "text-base md:text-lg";
    if (size === "lg") return "text-lg md:text-xl";
  }

  return (
    <button
      type={type}
      className={`bg-blue-500 w-fit font-semibold text-white px-4 py-2 rounded-full ${getSize()} ${className}`}
    >{children}
    </button>
  );
}

