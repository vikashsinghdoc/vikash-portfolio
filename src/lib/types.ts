import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
export interface Profile {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  social: {
    linkedin: string;
    github: string;
  };
}

export interface Experience {
  title: string;
  company: string;
  domain?: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;

  endDate?: string;
  description?: string;
}

export interface Skill {
  name: string;
  level?: number;
  icon?: LucideIcon | IconType;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}
