interface IExperience {
  company: string;
  role: string;
  duration: string;
  responsibilities: IResponsibility[];
}

interface IResponsibility {
  title: string;
  description: string;
  metrics: string[];
}

export type { IExperience, IResponsibility };
