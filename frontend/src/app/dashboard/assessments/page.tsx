"use client";

import { useEffect, useState } from "react";

interface AssessmentData {
  _id: string;
  title: string;
  trackCategory: string;
  difficultyTier: "entry" | "mid" | "senior";
  estimatedMinutes: number;
}

interface AssessmentResultData {
  _id: string;
  overallScore: number;
  skippedCount: number;
  skillsBreakdown: Record<string, number>;
}

interface Question {
  id: string;
  text: string;
  options: { key: string; text: string }[];
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forms management
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form values
  const [title, setTitle] = useState("");
  const [trackCategory, setTrackCategory] = useState("Frontend Engineering");
  const [difficultyTier, setDifficultyTier] = useState<"entry" | "mid" | "senior">("mid");
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Diagnostic wizard state
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<AssessmentData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [resultData, setResultData] = useState<AssessmentResultData | null>(null);

  // Mock track-specific questions
  const getMockQuestions = (category: string): Question[] => {
    if (category.includes("Frontend")) {
      return [
        {
          id: "q-fe-1",
          text: "What is the primary benefit of React's Virtual DOM reconciliation mechanism?",
          options: [
            { key: "A", text: "Minimizes direct manipulations of the actual browser DOM to optimize painting" },
            { key: "B", text: "Allows React to run on server devices without Node.js installed" },
            { key: "C", text: "Compiles TypeScript code into clean CSS declarations" },
            { key: "D", text: "Encrypts API endpoints session tokens" },
          ],
        },
        {
          id: "q-fe-2",
          text: "Which hook should be utilized to prevent unnecessary child component re-renders?",
          options: [
            { key: "A", text: "useContext" },
            { key: "B", text: "useRef" },
            { key: "C", text: "useMemo or useCallback" },
            { key: "D", text: "useTransition" },
          ],
        },
        {
          id: "q-fe-3",
          text: "What is the difference between relative and absolute positioning in CSS?",
          options: [
            { key: "A", text: "Relative positions elements relative to viewport; absolute is relative to document" },
            { key: "B", text: "Relative is offset relative to its normal position; absolute is relative to closest positioned ancestor" },
            { key: "C", text: "Relative overrides flexbox; absolute is ignored by flex layout" },
            { key: "D", text: "There is no functional difference" },
          ],
        },
        {
          id: "q-fe-4",
          text: "Which of the following is correct regarding Next.js 15 Server Actions?",
          options: [
            { key: "A", text: "They run exclusively inside the user's browser runtime environment" },
            { key: "B", text: "They are asynchronous server functions called directly from client elements" },
            { key: "C", text: "They compile styling attributes into static stylesheets" },
            { key: "D", text: "They require setting up a separate Express server instance" },
          ],
        },
      ];
    } else if (category.includes("Backend")) {
      return [
        {
          id: "q-be-1",
          text: "What is the primary model configuration of Node.js event-driven runtime?",
          options: [
            { key: "A", text: "Multi-threaded blocking I/O model" },
            { key: "B", text: "Single-threaded non-blocking event-loop model" },
            { key: "C", text: "Parallel CPU compiling processor structure" },
            { key: "D", text: "Synchronous memory allocation model" },
          ],
        },
        {
          id: "q-be-2",
          text: "Which MongoDB index configuration helps avoid indexing full text strings?",
          options: [
            { key: "A", text: "Hashed index" },
            { key: "B", text: "TTL index" },
            { key: "C", text: "Geospatial index" },
            { key: "D", text: "Partial index" },
          ],
        },
        {
          id: "q-be-3",
          text: "What is the difference between SQL JOIN and MongoDB reference populate?",
          options: [
            { key: "A", text: "SQL JOIN is resolved database-side; populate executes multiple queries application-side" },
            { key: "B", text: "SQL JOIN is slower than application-side populates" },
            { key: "C", text: "Populate is only supported by memory caching layers" },
            { key: "D", text: "Both execute identically at database engine level" },
          ],
        },
        {
          id: "q-be-4",
          text: "What does the 'Idempotency-Key' request header achieve on API transactions?",
          options: [
            { key: "A", text: "Encrypts body parameters using SHA-256 keys" },
            { key: "B", text: "Guarantees duplicate requests yield identical results without repeating execution" },
            { key: "C", text: "Authenticates session cookies" },
            { key: "D", text: "Compresses network responses" },
          ],
        },
      ];
    }

    // Fallback General Track
    return [
      {
        id: "q-gen-1",
        text: "What does the MVC architecture stand for in modern frameworks?",
        options: [
          { key: "A", text: "Model View Controller" },
          { key: "B", text: "Memory Variable compiler" },
          { key: "C", text: "Module Validation checker" },
          { key: "D", text: "Microservice Vector client" },
        ],
      },
      {
        id: "q-gen-2",
        text: "What is the purpose of Git staging area?",
        options: [
          { key: "A", text: "Deletes modified files from disk" },
          { key: "B", text: "Prepares a snapshot of files before committing them to history" },
          { key: "C", text: "Pushes commits directly to remote main branch" },
          { key: "D", text: "Creates a backup on cloud servers" },
        ],
      },
    ];
  };

  const fetchAssessments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/v1/assessments", {
        credentials: "include",
      });
      const body = await res.json();
      if (res.ok && body.success) {
        setAssessments(body.data || []);
      } else {
        setError(body?.error?.message || "Failed to load assessments.");
      }
    } catch {
      setError("Unable to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAssessments();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const errors: string[] = [];
    if (!title.trim()) {
      errors.push("Assessment title is required.");
    }
    if (estimatedMinutes < 1) {
      errors.push("Estimated duration must be at least 1 minute.");
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSaveAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    const payload = {
      title,
      trackCategory,
      difficultyTier,
      estimatedMinutes: Number(estimatedMinutes),
    };

    try {
      const url = isEditing
        ? `http://localhost:5000/api/v1/assessments/${editingId}`
        : "http://localhost:5000/api/v1/assessments";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setSuccessMsg(
          isEditing
            ? "Assessment parameters updated successfully!"
            : "New diagnostic assessment created successfully!"
        );
        setIsEditing(false);
        setIsCreating(false);
        setEditingId(null);
        fetchAssessments();
      } else {
        setError(body?.error?.message || "Failed to save assessment.");
      }
    } catch {
      setError("Unable to save assessment parameters due to connection error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAssessment = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this assessment?")) return;

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`http://localhost:5000/api/v1/assessments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setSuccessMsg("Assessment deleted successfully.");
        fetchAssessments();
      } else {
        setError(body?.error?.message || "Failed to delete assessment.");
      }
    } catch {
      setError("Unable to complete deletion request.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- WIZARD FLOW ACTIONS ---
  const handleStartDiagnostic = async (assessment: AssessmentData) => {
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/assessments/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentId: assessment._id }),
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setActiveSessionId(body.data.resultId);
        setActiveAssessment(assessment);
        setCurrentStep(0);
        setSelectedAnswers({});
        setResultData(null);
      } else {
        setError(body?.error?.message || "Failed to initialize diagnostic session.");
      }
    } catch {
      setError("Unable to connect to backend server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmitDiagnostic = async () => {
    if (!activeAssessment || !activeSessionId) return;

    setSubmitting(true);
    setError(null);

    const questions = getMockQuestions(activeAssessment.trackCategory);
    const answersList = questions.map((q) => ({
      questionId: q.id,
      selectedOption: selectedAnswers[q.id] || "",
    }));

    try {
      const res = await fetch("http://localhost:5000/api/v1/assessments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resultId: activeSessionId,
          answers: answersList,
        }),
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setResultData(body.data);
      } else {
        setError(body?.error?.message || "Failed to submit answers.");
      }
    } catch {
      setError("Unable to transmit answers to servers.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading diagnostic questionnaires...
        </p>
      </div>
    );
  }

  // --- MULTI-STEP DIAGNOSTIC SESSION STATE ---
  if (activeAssessment && activeSessionId) {
    const questions = getMockQuestions(activeAssessment.trackCategory);
    const hasFinished = resultData !== null;

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Session
            </span>
            <h1 className="text-2xl font-bold text-slate-900">{activeAssessment.title}</h1>
          </div>
          {!hasFinished && (
            <span className="text-xs font-bold text-indigo-600">
              Question {currentStep + 1} of {questions.length}
            </span>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {hasFinished ? (
          /* Diagnostic Finished Score gauge */
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm space-y-6 animate-fade-in">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
              <span className="text-3xl font-extrabold">{resultData.overallScore}%</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-800">Diagnostic Evaluation Complete!</h2>
              <p className="mx-auto max-w-md text-xs text-slate-500 leading-normal">
                Based on your diagnostic profile results, we have populated skill benchmarks matching your targets.
              </p>
            </div>

            {Object.keys(resultData.skillsBreakdown || {}).length > 0 && (
              <div className="mx-auto max-w-sm border-t border-slate-100 pt-6 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Skills Gaps Analysis</h3>
                <div className="space-y-2 text-left">
                  {Object.entries(resultData.skillsBreakdown).map(([skill, score]) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{skill}</span>
                        <span>{score}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100">
                        <div className="h-1.5 rounded-full bg-indigo-600" style={{ width: `${score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-slate-100 pt-6">
              <button
                onClick={() => {
                  setActiveSessionId(null);
                  setActiveAssessment(null);
                  setResultData(null);
                }}
                className="rounded-xl bg-slate-850 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-900"
              >
                Return to Assessments Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Wizard question rendering */
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
              <p className="text-base font-semibold text-slate-800 leading-relaxed">
                {questions[currentStep].text}
              </p>

              <div className="grid gap-3">
                {questions[currentStep].options.map((opt) => {
                  const isSelected = selectedAnswers[questions[currentStep].id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(questions[currentStep].id, opt.key)}
                      className={`flex items-start rounded-xl border p-4 text-left transition duration-200 ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className={`mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border font-bold text-xs ${
                        isSelected ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 text-slate-500"
                      }`}>
                        {opt.key}
                      </span>
                      <span className={`text-xs ${isSelected ? "text-indigo-800 font-semibold" : "text-slate-600"}`}>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step navigation bar */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Previous
              </button>
              {currentStep < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmitDiagnostic}
                  disabled={submitting}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  {submitting ? "Evaluating..." : "Submit Answers"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-0.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Assessments
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Diagnostic Assessments
          </h1>
          <p className="text-sm text-slate-500">
            Verify track competency gaps and allocate XP benchmarks.
          </p>
        </div>
        {!isCreating && !isEditing && (
          <button
            onClick={() => {
              setIsCreating(true);
              setTitle("");
              setTrackCategory("Frontend Engineering");
              setDifficultyTier("mid");
              setEstimatedMinutes(15);
              setValidationErrors([]);
            }}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-indigo-700"
          >
            Create Assessment
          </button>
        )}
      </div>

      {/* Message banners */}
      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* --- FORM PANEL (CREATE OR UPDATE) --- */}
      {(isCreating || isEditing) ? (
        <form onSubmit={handleSaveAssessment} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800">
            {isCreating ? "New Diagnostic Assessment" : "Modify Assessment Details"}
          </h2>

          {validationErrors.length > 0 && (
            <div className="rounded-lg bg-red-50 border border-red-100 p-4 text-xs text-red-700 space-y-1">
              <p className="font-semibold">Please correct the following validation errors:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Assessment Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. React & DOM reconciliation diagnostics"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:bg-white"
              />
            </div>

            {/* Track category selection */}
            <div className="space-y-2">
              <label htmlFor="track" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Track Category
              </label>
              <select
                id="track"
                value={trackCategory}
                onChange={(e) => setTrackCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:bg-white"
              >
                <option value="Frontend Engineering">Frontend Engineering</option>
                <option value="Backend Engineering">Backend Engineering</option>
                <option value="General Track">General Track</option>
              </select>
            </div>

            {/* Estimated Duration */}
            <div className="space-y-2">
              <label htmlFor="duration" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Estimated Minutes
              </label>
              <input
                id="duration"
                type="number"
                min="1"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:bg-white"
              />
            </div>

            {/* Difficulty selection */}
            <div className="space-y-2">
              <label htmlFor="difficulty" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Difficulty Tier
              </label>
              <select
                id="difficulty"
                value={difficultyTier}
                onChange={(e) => setDifficultyTier(e.target.value as "entry" | "mid" | "senior")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:bg-white"
              >
                <option value="entry">Entry</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setIsEditing(false);
                setEditingId(null);
                setValidationErrors([]);
              }}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Assessment"}
            </button>
          </div>
        </form>
      ) : assessments.length === 0 ? (
        /* --- EMPTY STATE VIEW --- */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800">No Assessments Declared</h2>
            <p className="mx-auto max-w-md text-sm text-slate-500 leading-relaxed">
              Create target assessment diagnostics to evaluate baseline capability indicators.
            </p>
          </div>
          <button
            onClick={() => {
              setIsCreating(true);
              setTitle("");
              setTrackCategory("Frontend Engineering");
              setDifficultyTier("mid");
              setEstimatedMinutes(15);
              setValidationErrors([]);
            }}
            className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
          >
            <span>Create First Assessment</span>
          </button>
        </div>
      ) : (
        /* --- LIST CARD STATE --- */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((item) => (
            <div
              key={item._id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    {item.trackCategory}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 capitalize">
                    {item.difficultyTier} • {item.estimatedMinutes} mins
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-base tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                <button
                  onClick={() => handleStartDiagnostic(item)}
                  className="inline-flex items-center text-xs font-bold text-indigo-600 transition hover:text-indigo-700"
                >
                  <span>Start Test</span>
                  <svg className="ml-1 h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="flex items-center space-x-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditingId(item._id);
                      setTitle(item.title);
                      setTrackCategory(item.trackCategory);
                      setDifficultyTier(item.difficultyTier);
                      setEstimatedMinutes(item.estimatedMinutes);
                      setValidationErrors([]);
                    }}
                    className="text-slate-400 hover:text-slate-600 transition"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteAssessment(item._id)}
                    className="text-slate-400 hover:text-red-600 transition"
                  >
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
