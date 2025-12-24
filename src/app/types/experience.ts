interface IExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Current";
  responsibilities: IResponsibility[];
  achievements?: string[];
  current?: boolean;
}

interface IResponsibility {
  title: string;
  description: string;
  metrics: string[];
  technologies?: string[];
}

export type { IExperience, IResponsibility };
