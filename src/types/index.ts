export type ProjectStatus = "Upcoming" | "Launching" | "Ongoing" | "Ready To Move" | "Sold Out";

export interface ProjectLandmark {
  name: string;
  distance: string;
}

export interface ProjectSpecs {
  sizeRange: string; // e.g., "1600 - 2400 Sq.Ft."
  units: number;      // e.g., 40
  floors: string;     // e.g., "G + 5 Floors"
  type: string;       // e.g., "Premium 3BHK Apartments"
  approval: string;   // e.g., "HMDA & RERA Approved"
}

export interface ProjectGallery {
  exterior: string;
  interior: string;
  floorPlan: string;
  amenities: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  location: string;
  status: ProjectStatus;
  progressPercent: number; // e.g., 75
  specs: ProjectSpecs;
  amenities: string[];
  landmarks: ProjectLandmark[];
  images: ProjectGallery;
  brochureUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  iconName: string; // Lucide icon identifier
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number; // 1-5
  feedback: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Construction" | "Joint Venture" | "Legal";
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
}
