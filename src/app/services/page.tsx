import Services from "@/components/services/Services";

export const metadata = {
  title: "Services | Turnkey Development & Architectural Design",
  description: "Browse premium real estate and civil development services offered by Prime Estates.",
};

export default function ServicesPage() {
  return (
    <div className="bg-primary pt-10">
      <Services />
    </div>
  );
}
