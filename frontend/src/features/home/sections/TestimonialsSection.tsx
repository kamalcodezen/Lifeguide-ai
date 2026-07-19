"use client";

import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "LifeGuide AI mapped out my exact gaps. I built a custom analytics dashboard project and landed my junior engineer job in 3 months.",
      author: "Sarah L.",
      title: "Recent Graduate",
      track: "Frontend Track",
    },
    {
      quote:
        "Coming from sales operations, I had 8 hours a week. The adaptive roadmap scheduled everything perfectly. The mock interview scorer built my confidence.",
      author: "David K.",
      title: "Transitioned to Product Manager",
      track: "PM Track",
    },
    {
      quote:
        "My resume was getting rejected immediately. The ATS matcher helped me optimize my formatting and keywords. I got three recruiter calls in 2 weeks.",
      author: "Elena R.",
      title: "Software Engineer",
      track: "Backend Track",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-surface/30"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            Success Stories from the Sanctuary
          </h2>
          <p className="font-sans text-base text-lifeguide-text-secondary">
            See how candidates have navigated the transition from learning tracks directly into
            professional roles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-lifeguide-surface border border-lifeguide-border rounded-xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex flex-col">
                {/* Stars indicator */}
                <div className="flex items-center gap-1 mb-6 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-0" />
                  ))}
                </div>

                <p className="font-sans text-sm text-lifeguide-text-secondary italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-lifeguide-border/60 pt-4 mt-2 select-none">
                <div>
                  <h4 className="font-heading text-sm font-bold text-lifeguide-text-primary">
                    {item.author}
                  </h4>
                  <p className="text-[10px] text-lifeguide-text-muted mt-0.5">{item.title}</p>
                </div>
                <span className="text-[9px] font-semibold text-lifeguide-primary bg-lifeguide-primary/10 px-2 py-0.5 rounded-full uppercase">
                  {item.track}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
