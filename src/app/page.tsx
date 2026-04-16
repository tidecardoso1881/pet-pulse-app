import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyPetPulse from "@/components/landing/WhyPetPulse";
import Plans from "@/components/landing/Plans";
import Testimonials from "@/components/landing/Testimonials";
import ProfileChooser from "@/components/landing/ProfileChooser";
import CtaFinal from "@/components/landing/CtaFinal";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "PetPulse — Toda a saúde do seu pet em um só lugar",
  description:
    "Plataforma completa para centralizar prontuários, vacinas, exames e o dia a dia do seu companheiro.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyPetPulse />
        <Plans />
        <Testimonials />
        <ProfileChooser />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
