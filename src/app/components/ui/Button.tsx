export default function Button({ children, className, size = "md" }: { children: React.ReactNode, className?: string, size?: "sm" | "md" | "lg" }) {
  function getSize() {
    if (size === "sm") return "text-sm md:text-base";
    if (size === "md") return "text-base md:text-lg";
    if (size === "lg") return "text-lg md:text-xl";
  }

  return <button className={`bg-blue-500 w-fit font-semibold text-white px-4 py-2 rounded-full ${getSize()} ${className}`}>{children}</button>;
}

