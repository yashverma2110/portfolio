export interface IProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface IProjectMedia {
  images?: IProjectImage[];
  youtubeId?: string;
}

export interface IProject {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  link: string;
  github?: string;
  tweetLink?: string;
  privacyPolicy?: string;
  media?: IProjectMedia;
}
