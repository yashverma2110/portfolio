export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-slate-700 border border-slate-800 p-4 rounded-lg min-w-64">{children}</div>;
}


