export default function TechStackGrid() {
  const techStack = [
    "JavaScript", "TypeScript", "Tailwind CSS", "Next.js", "React", "Vue", "Nuxt", 
    "Python", "Golang", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch",
    "Docker", "Kubernetes", "AWS"
  ];

  return (
    <div className="flex flex-col gap-12 w-full overflow-hidden">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Tech Stack</h2>
        <div className="h-1 w-12 bg-white/30 rounded-full" />
      </div>
      <div className="flex flex-wrap gap-3">
        {techStack.map((tech) => (
          <div 
            key={tech} 
            className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm font-medium hover:text-white hover:bg-white/15 hover:border-white/25 transition-all duration-300"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
