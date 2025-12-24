type CardSize = "sm" | "md" | "lg";

const sizeClasses: Record<CardSize, string> = {
  sm: "rounded-2xl p-5",
  md: "rounded-2xl md:rounded-[2.5rem] p-4 md:p-8",
  lg: "rounded-[2.5rem] p-8",
};

export default function Card({ 
  children, 
  className = "", 
  size = "lg" 
}: { 
  children: React.ReactNode; 
  className?: string;
  size?: CardSize;
}) {
  return (
    <div className={`bg-white/[0.02] backdrop-blur-md border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}


