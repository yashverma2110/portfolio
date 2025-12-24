export default function TechStackGrid() {
  const techStack = [
    "JavaScript", "TypeScript", "Tailwind CSS", "Next.js", "React", "Vue", "Nuxt", 
    "Python", "Golang", "PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch",
    "Docker", "Kubernetes", "AWS"
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">Tech Stack</h3>
      <div className="flex flex-wrap gap-3">
        {techStack.map((tech) => (
          <div 
            key={tech} 
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
