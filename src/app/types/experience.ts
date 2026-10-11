interface IExperience {
  company: string;
  role: string;
  /** One or two sentences under the role line (team size, what the team owns). */
  summary?: string;
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
