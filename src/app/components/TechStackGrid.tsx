export default function TechStackGrid() {
  const techStack = [
    { name: "Javascript", icon: "" },
    { name: "Typescript", icon: "" },
    { name: "Tailwind CSS", icon: "" },
    { name: "Next.js", icon: "" },
    { name: "React", icon: "" },
    { name: "Vue", icon: "" },
    { name: "Nuxt", icon: "" },
    { name: "Python", icon: "" },
    { name: "Golang", icon: "" },
    { name: "Docker", icon: "" },
    { name: "Redis", icon: "" },
    { name: "MongoDB", icon: "" },
    { name: "MySQL", icon: "" },
    { name: "AWS", icon: "" },
  ];

  return (
    <section className="py-4 mt-auto">
      <h3 className="text-neutral-400 font-extrabold text-lg mb-4 md:text-3xl">Tech Stack 📋</h3>
      <div className="flex flex-wrap gap-x-4 md:gap-y-2">
        {techStack.map((tech) => (
          <div key={tech.name} className="flex text-neutral-400 font-extrabold items-center">
            <p className="text-lg md:text-2xl">{tech.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
