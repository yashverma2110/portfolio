export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={`apple-card ${className}`}>{children}</div>;
}


