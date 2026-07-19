"use client";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Select Track",
      desc: "Pick Frontend, Backend, or Product Management.",
    },
    {
      step: "02",
      title: "Baseline Profile",
      desc: "Complete diagnostic assessment questions.",
    },
    {
      step: "03",
      title: "Learn & Refine",
      desc: "Study weekly milestones tailored to your study hours.",
    },
    {
      step: "04",
      title: "Build Spec",
      desc: "Generate and build a custom gap-filling portfolio project.",
    },
    {
      step: "05",
      title: "Simulate & Apply",
      desc: "Optimize your resume ATS score and run mock interview simulators.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-surface/30 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-lifeguide-text-primary tracking-tight mb-4">
            The Step-by-Step Pathway to Employment
          </h2>
          <p className="font-sans text-base text-lifeguide-text-secondary">
            How LifeGuide AI structures your learning loop from profile setup to target role
            readiness.
          </p>
        </div>

        {/* Horizontal flow pipeline */}
        <div className="relative mt-8">
          {/* Connector line (desktop) */}
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-lifeguide-support/30 -translate-y-1/2 z-0 hidden md:block" />

          {/* Connector line (mobile/vertical) */}
          <div className="absolute top-0 bottom-0 left-[26px] w-0.5 border-l-2 border-dashed border-lifeguide-support/30 z-0 md:hidden" />

          {/* Pipeline Step Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 relative z-10">
            {steps.map((item, index) => (
              <div
                key={index}
                className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-5 md:gap-4 group"
              >
                {/* Circle Node indicator */}
                <div className="w-13 h-13 rounded-full bg-lifeguide-surface border-2 border-lifeguide-border-strong flex items-center justify-center shrink-0 shadow-sm group-hover:border-lifeguide-primary group-hover:scale-105 transition-all duration-200">
                  <span className="font-heading text-sm font-bold text-lifeguide-primary">
                    {item.step}
                  </span>
                </div>

                {/* Step details content */}
                <div className="flex flex-col">
                  <h3 className="font-heading text-base font-bold text-lifeguide-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-lifeguide-text-secondary leading-relaxed max-w-[200px] md:mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
