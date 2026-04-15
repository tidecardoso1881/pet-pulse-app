import type { Metadata } from "next";
import HeaderClinic from "@/components/landing/clinic/HeaderClinic";
import HeroClinic from "@/components/landing/clinic/HeroClinic";
import FeaturesClinic from "@/components/landing/clinic/FeaturesClinic";
import Included from "@/components/landing/clinic/Included";
import Faq from "@/components/landing/clinic/Faq";
import CtaClinic from "@/components/landing/clinic/CtaClinic";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "PetPulse para Clínicas e Parceiros",
  description:
    "Prontuários digitais, gestão de atendimentos e relatórios avançados para clínicas veterinárias.",
};

export default function ClinicaParceiroPage() {
  return (
    <>
      <HeaderClinic />
      <main>
        <HeroClinic />
        <FeaturesClinic />
        <Included />
        <Faq />
        <CtaClinic />
      </main>
      <Footer />
    </>
  );
}
