"use client";

export function StatsSection() {
  const stats = [
    {
      value: "91.4%",
      label: "Career Placement Rate within 180 Days",
      gradient: "bg-gradient-warm-dawn",
    },
    {
      value: "14,200+",
      label: "Custom Roadmaps Generated & Executed",
      gradient: "bg-gradient-sunset-peach",
    },
    {
      value: "72%",
      label: "Average ATS Match Score Improvement",
      gradient: "bg-gradient-warm-dawn",
    },
  ];

  return (
    <section
      id="stats"
      className="relative w-full py-12 px-4 md:px-6 lg:px-12 border-t border-lifeguide-border bg-lifeguide-canvas z-10"
    >
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-lifeguide-surface border border-lifeguide-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200 select-none"
            >
              <span
                className={`font-heading text-4xl sm:text-5xl font-extrabold ${stat.gradient} bg-clip-text text-transparent mb-2`}
              >
                {stat.value}
              </span>
              <p className="font-sans text-xs sm:text-sm text-lifeguide-text-secondary leading-normal max-w-[240px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
