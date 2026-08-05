import { COMPANY } from "./company";

export const CONTACT_CONFIG = {
  whatsapp: {
    number: COMPANY.phoneRaw,
    prefilledMessage: "Hi Prime Estates, I am interested in your luxury projects and would like to schedule a private site tour.",
    url: `https://wa.me/${COMPANY.phoneRaw}?text=${encodeURIComponent("Hi Prime Estates, I'm interested in your luxury projects.")}`,
  },
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/calendly/30min",
    username: process.env.NEXT_PUBLIC_CALENDLY_USERNAME || "calendly",
    eventName: process.env.NEXT_PUBLIC_CALENDLY_EVENT || "30min",
  },
  brochures: {
    costGuide: "/brochures/construction-cost-guide.pdf",
    projects: {
      manikondaResidences: "/brochures/skyline-heights.pdf",
      platinumEnclave: "/brochures/golden-horizon.pdf",
    },
  },
  officeHours: "Monday - Saturday: 9:00 AM - 7:00 PM",
};
