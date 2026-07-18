import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center pt-18 min-h-screen bg-lifeguide-canvas bg-radial-ambient-glow transition-all duration-300">
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-12 py-16 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            Bridge the Gap Between{" "}
            <span className="bg-gradient-warm-dawn bg-clip-text text-transparent">
              Learning & Careers
            </span>
          </h1>
          <p className="font-sans text-lg text-lifeguide-text-secondary max-w-xl mx-auto mb-8">
            This is a preview page rendering the Sticky Glass Navbar and the Public Footer
            components. The remaining landing page sections will be implemented next.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
