export default function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-[2.5rem] p-8 bg-[rgba(10,10,10,0.4)] backdrop-blur-[24px] saturate-[180%] border border-white/[0.08] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(255,255,255,0.05)] transition-all duration-700 hover:scale-[1.005] hover:bg-black/40 hover:border-white/20 ${className}`}>
      {children}
    </div>
  );
}


