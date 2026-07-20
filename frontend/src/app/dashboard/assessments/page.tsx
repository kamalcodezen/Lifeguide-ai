"use client";

import { useState, useEffect } from "react";
import { Loader2, Activity, PlayCircle, CheckCircle2, Award, ChevronRight } from "lucide-react";

interface Assessment {
  _id: string;
  title: string;
  trackCategory: string;
  difficultyTier: string;
  estimatedMinutes: number;
}

interface Question {
  id: string;
  questionText: string;
  options: string[];
}

interface AssessmentData {
  title: string;
  questions: Question[];
}

interface EvaluationResult {
  overallScore: number;
  skillsBreakdown: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  summaryEvaluation: string;
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active Assessment State
  const [activeResultId, setActiveResultId] = useState<string | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [generatingTest, setGeneratingTest] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { questionText: string; selectedOption: string }>>({});
  
  // Submission & Result State
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/v1/assessment`, { credentials: "include" });
        const data = await res.json();
        
        // Auto-create a default one if none exist
        if (data.success && data.data.length === 0) {
          const createRes = await fetch(`${API_BASE}/api/v1/assessment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              title: "Comprehensive Software Engineering Diagnostic",
              trackCategory: "Software Engineering",
              difficultyTier: "mid",
              estimatedMinutes: 15
            })
          });
          const createData = await createRes.json();
          if (createData.success) {
            setAssessments([createData.data]);
          }
        } else if (data.success) {
          setAssessments(data.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load assessments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartAssessment = async (assessmentId: string) => {
    setGeneratingTest(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/assessment/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ assessmentId })
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to start assessment.");
      }
      
      setActiveResultId(data.data.resultId);
      setAssessmentData(data.data.assessmentData);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setEvaluation(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setGeneratingTest(false);
    }
  };

  const handleSelectOption = (questionId: string, questionText: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { questionText, selectedOption: option }
    }));
  };

  const handleSubmitAssessment = async () => {
    if (!activeResultId) return;
    setSubmitting(true);
    setError(null);
    try {
      const answersArray = Object.values(answers);
      const res = await fetch(`${API_BASE}/api/v1/assessment/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ resultId: activeResultId, answers: answersArray })
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to submit assessment.");
      }
      
      setEvaluation(data.data.evaluation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to evaluate answers.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetState = () => {
    setAssessmentData(null);
    setActiveResultId(null);
    setEvaluation(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading diagnostic tests...</p>
      </div>
    );
  }

  // View 1: Show Evaluation Results
  if (evaluation) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-indigo-600 p-8 text-center text-white">
            <Award className="w-16 h-16 mx-auto mb-4 text-amber-300" />
            <h2 className="text-3xl font-bold mb-2">Diagnostic Complete</h2>
            <p className="text-indigo-100 opacity-90 max-w-lg mx-auto leading-relaxed">
              {evaluation.summaryEvaluation}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex flex-col items-center bg-white/10 rounded-2xl p-4 min-w-[120px]">
                <span className="text-4xl font-black">{evaluation.overallScore}%</span>
                <span className="text-xs uppercase tracking-wider font-bold text-indigo-200 mt-1">Overall Score</span>
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" /> Skills Breakdown
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(evaluation.skillsBreakdown).map(([skill, score], i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                    <span className="block text-2xl font-bold text-slate-800">{score}%</span>
                    <span className="block text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Key Strengths
                </h3>
                <ul className="space-y-3">
                  {evaluation.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-700 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" /> Areas to Improve
                </h3>
                <ul className="space-y-3">
                  {evaluation.weaknesses.map((weak, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" /> Recommended Actions
              </h3>
              <ul className="space-y-3">
                {evaluation.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
            <button
              onClick={resetState}
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View 2: Active Assessment Flow
  if (assessmentData && activeResultId) {
    const currentQuestion = assessmentData.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === assessmentData.questions.length - 1;
    const hasAnsweredCurrent = !!answers[currentQuestion.id];

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-in slide-in-from-right-8 duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{assessmentData.title}</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Question {currentQuestionIndex + 1} of {assessmentData.questions.length}
            </p>
          </div>
          <button onClick={resetState} className="text-sm text-slate-400 hover:text-slate-600 font-medium">
            Exit Test
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / assessmentData.questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mt-8">
          <h3 className="text-xl font-semibold text-slate-800 leading-relaxed mb-8">
            {currentQuestion.questionText}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = answers[currentQuestion.id]?.selectedOption === opt;
              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(currentQuestion.id, currentQuestion.questionText, opt)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected 
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium shadow-sm"
                      : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            {!isLastQuestion ? (
              <button
                disabled={!hasAnsweredCurrent}
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next Question <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={!hasAnsweredCurrent || submitting}
                onClick={handleSubmitAssessment}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-indigo-600/20"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                {submitting ? "Analyzing..." : "Submit Assessment"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // View 3: List of Available Assessments
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Diagnostics & Assessments</h1>
        <p className="text-slate-500 max-w-2xl">
          Take AI-driven diagnostic tests to evaluate your current skill level, identify knowledge gaps, and receive tailored learning recommendations.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      {generatingTest ? (
         <div className="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-16 text-center">
         <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
         <p className="text-slate-700 font-medium">Designing your diagnostic test...</p>
         <p className="text-xs text-slate-400 mt-2">Generating questions tailored to your profile.</p>
       </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((test) => (
            <div key={test._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-indigo-300 transition-colors">
              <div className="flex-1">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{test.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{test.trackCategory}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md uppercase tracking-wider">
                    {test.difficultyTier}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md flex items-center gap-1">
                    ~{test.estimatedMinutes} mins
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleStartAssessment(test._id)}
                className="w-full py-2.5 bg-slate-50 text-indigo-600 font-bold text-sm rounded-xl border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4" /> Start Test
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
