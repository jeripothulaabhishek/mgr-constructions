import { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mgrconstructions.in";

  // Core Static Pages
  const staticPages = ["", "/about", "/projects", "/services", "/jv", "/blog", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Project Details
  const projectPages = PROJECTS.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Localized SEO Pages
  const seoLocationPages = [
    "flats-in-manikonda",
    "flats-in-tarnaka",
    "hmda-approved-apartments",
    "luxury-3bhk-hyderabad",
    "joint-venture-builders-hyderabad",
  ].map((loc) => ({
    url: `${baseUrl}/${loc}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...seoLocationPages];
}
