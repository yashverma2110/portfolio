export default function TechStackGrid() {
  const categories = [
    {
      name: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Golang", "C++"],
    },
    {
      name: "Frameworks",
      items: ["React", "Vue", "Next.js", "Nuxt", "Tailwind CSS"],
    },
    {
      name: "Databases",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"],
    },
    {
      name: "Infrastructure",
      items: ["Docker", "Kubernetes", "Terraform", "Kafka"],
    },
  ];

  const awsServices = ["EKS", "ECS", "Lambda", "ALB", "Route 53", "CodeDeploy", "S3", "Athena", "RDS", "ElastiCache", "CloudFront", "SQS", "MSK"];

  return (
    <div className="flex flex-col gap-8 md:gap-12 w-full overflow-hidden">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Tech Stack</h2>
        <div className="h-1 w-12 bg-white/30 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <div 
                  key={tech} 
                  className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/70 text-sm font-medium hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AWS Section - Full Width */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">AWS</h3>
        <div className="flex flex-wrap gap-2">
          {awsServices.map((service) => (
            <div 
              key={service} 
              className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/70 text-sm font-medium hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
