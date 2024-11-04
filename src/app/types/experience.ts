interface IExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Current";
  responsibilities: IResponsibility[];
  current?: boolean;
}

interface IResponsibility {
  title: string;
  description: string;
  metrics: string[];
}

export type { IExperience, IResponsibility };
