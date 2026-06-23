import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact MGR Constructions | Book Site Visits in Manikonda",
  description: "Get in touch with MGR Constructions. Locate our Manikonda headquarters on Google maps or submit a query to schedule properties site tours.",
};

export default function ContactPage() {
  return (
    <div className="bg-primary pt-10">
      <ContactForm />
    </div>
  );
}
