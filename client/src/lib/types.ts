import { Project } from "@shared/schema";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type SocialLink = {
  label: string;
  href: string;
  shortLabel?: string;
};

export type SkillTag = {
  name: string;
};
