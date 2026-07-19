"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      question: "Which career tracks are supported?",
      answer: "We currently support Frontend Engineering, Backend Engineering, and Product Management tracks.",
    },
    {
      question: "How does the AI analyze my skill gaps?",
      answer:
        "Through a 5-10 diagnostic profiling assessment mapped during onboarding that evaluates core competencies dynamically.",
    },
    {
      question: "Can I import job descriptions?",
      answer:
        "Yes, you can paste links or copy-paste texts from specific target job postings to compare them directly against your baseline profile.",
    },
    {
      question: "How do custom portfolio briefs prevent generic templates?",
      answer:
        "The platform analyzes your unique skill gaps and details a custom business architecture requirement targeting those weaknesses instead of standard cookie-cutter templates.",
    },
    {
      question: "Is there a student discount?",
      answer: "Yes, verified student accounts receive special discounted pricing plans.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-surface/30"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header Content */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            Frequently Answered Questions
          </h2>
          <p className="font-sans text-base text-lifeguide-text-secondary">
            Find clear answers to key operations and platform behaviors.
          </p>
        </div>

        {/* FAQ List Accordion */}
        <div className="border-t border-lifeguide-border">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border-b border-lifeguide-border py-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left font-heading text-sm sm:text-base font-bold text-lifeguide-text-primary py-2 select-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-lifeguide-text-muted transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-lifeguide-primary" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-sans text-xs sm:text-sm text-lifeguide-text-secondary leading-relaxed pb-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
