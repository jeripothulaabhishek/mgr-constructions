import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Prime Estates | Schedule Property Site Tours",
  description: "Get in touch with Prime Estates. Locate our corporate headquarters or submit an inquiry to schedule private property site tours.",
};

export default function ContactPage() {
  return (
    <div className="bg-primary pt-10">
      <ContactForm />
    </div>
  );
}
