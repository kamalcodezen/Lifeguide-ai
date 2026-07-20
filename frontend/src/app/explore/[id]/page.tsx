"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";
import { ArrowLeft, CheckCircle2, Loader2, Star } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  difficultyRating: string;
  requirements: string[];
  techStack: string[];
  createdAt: string;
}

export default function ExploreDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_BASE}/api/v1/explore/${id}`);
        const data = await res.json();
        if (data.success) {
          setProject(data.data);
          setRelated(data.related || []);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch project details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col pt-24 min-h-screen bg-slate-50 items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
          <p className="text-slate-500 font-medium">Loading project details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex flex-col pt-24 min-h-screen bg-slate-50 items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
            <p className="text-slate-500">The project you are looking for does not exist.</p>
            <Link href="/explore" className="text-indigo-600 font-medium hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Explore
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-24 pb-20 min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    project.difficultyRating === "senior" ? "bg-red-50 text-red-600" :
                    project.difficultyRating === "mid" ? "bg-amber-50 text-amber-600" :
                    "bg-green-50 text-green-600"
                  }`}>
                    {project.difficultyRating}
                  </span>
                  <span className="text-sm text-slate-400">
                    Added {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                  {project.title}
                </h1>
                
                <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  This project challenges you to build a comprehensive {project.title.toLowerCase()}. 
                  It is designed for {project.difficultyRating} developers looking to enhance their portfolio 
                  and prove their competency with modern development frameworks. By completing this project, 
                  you will demonstrate your ability to solve real-world problems and deliver production-ready code.
                </p>

                <h3 className="text-xl font-bold text-slate-800 mb-4">Overview & Objectives</h3>
                <ul className="space-y-4 mb-8">
                  {project.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-slate-800 mb-4">Specifications</h3>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-slate-400 block mb-1">Target Audience</span>
                      <span className="font-medium text-slate-700 capitalize">{project.difficultyRating} Developers</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-400 block mb-1">Estimated Time</span>
                      <span className="font-medium text-slate-700">
                        {project.difficultyRating === 'entry' ? '1-2 Weeks' : project.difficultyRating === 'mid' ? '2-4 Weeks' : '1+ Months'}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-400 block mb-1">Primary Stack</span>
                      <span className="font-medium text-slate-700">{project.techStack[0] || 'Agnostic'}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-400 block mb-1">Project Type</span>
                      <span className="font-medium text-slate-700">Full-Stack Application</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock Reviews / Testimonials */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Community Reviews</h3>
                <div className="space-y-6">
                  {[
                    { name: "Alex Johnson", role: "Junior Dev", text: "Great project to practice real-world concepts!", rating: 5 },
                    { name: "Sam Lee", role: "Full Stack Engineer", text: "Solid requirements, really helped me learn the stack.", rating: 4 }
                  ].map((review, idx) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-600 italic mb-2">&quot;{review.text}&quot;</p>
                      <p className="text-sm font-medium text-slate-900">{review.name} <span className="text-slate-400 font-normal ml-1">— {review.role}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {related.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Related Projects</h3>
                  <div className="space-y-6">
                    {related.map(rel => (
                      <Link key={rel._id} href={`/explore/${rel._id}`} className="block group">
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                          {rel.title}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {rel.techStack.slice(0, 2).map((tech, i) => (
                            <span key={i} className="text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
