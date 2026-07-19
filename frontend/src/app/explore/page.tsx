"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { Search, ArrowRight } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  difficultyRating: string;
  requirements: string[];
  techStack: string[];
  createdAt: string;
}

export default function ExplorePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: "6",
        });
        if (search) queryParams.append("search", search);
        if (difficulty) queryParams.append("difficulty", difficulty);

        const res = await fetch(`${API_BASE}/api/v1/explore?${queryParams.toString()}`);
        const data = await res.json();
        
        if (data.success) {
          setProjects(data.data);
          setTotalPages(data.pagination.totalPages || 1);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch explore projects", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchProjects();
    }, 300);

    return () => clearTimeout(timer);
  }, [page, search, difficulty]);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-24 min-h-screen bg-lifeguide-canvas">
        <div className="container mx-auto px-6 lg:px-12 py-10">
          
          <div className="mb-10 text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-lifeguide-text-primary tracking-tight">
              Explore Community <span className="text-transparent bg-clip-text bg-gradient-warm-dawn">Projects</span>
            </h1>
            <p className="text-lg text-lifeguide-text-secondary max-w-2xl mx-auto">
              Discover real-world projects, browse tech stacks, and find inspiration for your next portfolio piece.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-10 w-full max-w-4xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lifeguide-text-muted w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-white border border-lifeguide-border rounded-xl h-12 pl-12 pr-4 focus:ring-2 focus:ring-lifeguide-primary/20 focus:border-lifeguide-primary transition-all shadow-sm"
              />
            </div>
            <select 
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
              className="w-full md:w-48 bg-white border border-lifeguide-border rounded-xl h-12 px-4 focus:ring-2 focus:ring-lifeguide-primary/20 focus:border-lifeguide-primary shadow-sm outline-none"
            >
              <option value="">All Difficulties</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[360px] rounded-2xl bg-slate-100 animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
              {projects.map((project) => (
                <div key={project._id} className="flex flex-col bg-white border border-lifeguide-border rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full overflow-hidden">
                  <div className="h-48 bg-slate-50 flex items-center justify-center p-6 border-b border-lifeguide-border">
                    {/* Placeholder abstract image / gradient representation */}
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 flex items-center justify-center">
                      <span className="text-indigo-400 font-bold text-3xl opacity-50">LG</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        project.difficultyRating === "senior" ? "bg-red-50 text-red-600" :
                        project.difficultyRating === "mid" ? "bg-amber-50 text-amber-600" :
                        "bg-green-50 text-green-600"
                      }`}>
                        {project.difficultyRating}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-3 flex-1">
                      {project.requirements.join(", ")}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1 mb-6">
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>
                      <Link 
                        href={`/explore/${project._id}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 text-lifeguide-primary font-semibold text-sm rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No projects found matching your search.</p>
              <button 
                onClick={() => { setSearch(""); setDifficulty(""); setPage(1); }}
                className="mt-4 text-lifeguide-primary font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-slate-500 font-medium">Page {page} of {totalPages}</span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
