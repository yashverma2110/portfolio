export default function Button({ children, className = "", type = "button", size = "md", variant = "primary" }: { children: React.ReactNode, className?: string, type?: "button" | "submit" | "reset", size?: "sm" | "md" | "lg", variant?: "primary" | "secondary" | "ghost" }) {
  function getSize() {
    if (size === "sm") return "px-4 py-1.5 text-sm";
    if (size === "md") return "px-6 py-2.5 text-base";
    if (size === "lg") return "px-8 py-3.5 text-lg";
  }

  const variants = {
    primary: "bg-white text-black hover:bg-white/90 active:scale-95",
    secondary: "bg-white/10 text-white hover:bg-white/20 active:scale-95 border border-white/10",
    ghost: "text-white/60 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      type={type}
      className={`font-medium transition-all duration-300 rounded-full flex items-center justify-center gap-2 ${getSize()} ${variants[variant]} ${className}`}
    >{children}
    </button>
  );
}

