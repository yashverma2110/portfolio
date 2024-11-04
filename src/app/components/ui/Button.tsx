export default function Button({ children, className }: { children: React.ReactNode, className?: string }) {
  return <button className={`bg-blue-500 font-semibold text-white px-4 py-2 rounded-full md:text-lg ${className}`}>{children}</button>;
}

