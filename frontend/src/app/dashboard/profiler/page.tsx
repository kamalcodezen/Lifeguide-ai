"use client";

import { useEffect, useState } from "react";

interface ProfileData {
  targetCareerTrack: string;
  skillLevel: "novice" | "intermediate" | "advanced";
  weeklyAvailabilityHours: number;
  preferences: Record<string, string>;
}

export default function ProfilerPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form editing state
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Form values state
  const [targetCareerTrack, setTargetCareerTrack] = useState("");
  const [skillLevel, setSkillLevel] = useState<"novice" | "intermediate" | "advanced">("novice");
  const [weeklyAvailabilityHours, setWeeklyAvailabilityHours] = useState<number>(10);
  const [prefKey, setPrefKey] = useState("");
  const [prefVal, setPrefVal] = useState("");
  const [tempPreferences, setTempPreferences] = useState<Record<string, string>>({});
  const [formValidationErrors, setFormValidationErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/profile`, {
        credentials: "include",
      });

      if (res.status === 200) {
        const body = await res.json();
        const data = body.data;
        setProfile(data);
        // Sync form values
        setTargetCareerTrack(data.targetCareerTrack || "");
        setSkillLevel(data.skillLevel || "novice");
        setWeeklyAvailabilityHours(data.weeklyAvailabilityHours || 10);
        setTempPreferences(data.preferences || {});
      } else if (res.status === 404) {
        setProfile(null);
      } else {
        const errBody = await res.json();
        setError(errBody?.error?.message || "Failed to load skill profile.");
      }
    } catch {
      setError("Unable to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProfile();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = () => {
    const errors: string[] = [];
    if (!targetCareerTrack.trim()) {
      errors.push("Target career track is required.");
    }
    if (weeklyAvailabilityHours < 1 || weeklyAvailabilityHours > 168) {
      errors.push("Weekly availability hours must be between 1 and 168.");
    }
    setFormValidationErrors(errors);
    return errors.length === 0;
  };

  const handleAddPreference = () => {
    if (!prefKey.trim() || !prefVal.trim()) return;
    setTempPreferences((prev) => ({
      ...prev,
      [prefKey.trim()]: prefVal.trim(),
    }));
    setPrefKey("");
    setPrefVal("");
  };

  const handleRemovePreference = (key: string) => {
    setTempPreferences((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSuccessMsg(null);
    setError(null);

    const payload = {
      targetCareerTrack,
      skillLevel,
      weeklyAvailabilityHours: Number(weeklyAvailabilityHours),
      preferences: tempPreferences,
    };

    try {
      const url = `${API_BASE}/api/v1/profile`;
      const method = isCreating ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setProfile(body.data);
        setSuccessMsg(
          isCreating
            ? "Your skill profile was successfully created!"
            : "Your skill profile was successfully updated!"
        );
        setIsEditing(false);
        setIsCreating(false);
      } else {
        setError(body?.error?.message || "Failed to save profile parameters.");
      }
    } catch {
      setError("Unable to save profile due to server connection error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action is permanent.")) {
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/profile`, {
        method: "DELETE",
        credentials: "include",
      });

      const body = await res.json();

      if (res.ok && body.success) {
        setProfile(null);
        setSuccessMsg("Your skill profile was deleted successfully.");
        // Reset form variables
        setTargetCareerTrack("");
        setSkillLevel("novice");
        setWeeklyAvailabilityHours(10);
        setTempPreferences({});
      } else {
        setError(body?.error?.message || "Failed to delete profile.");
      }
    } catch {
      setError("Unable to complete deletion request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Retrieving profile parameters...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Career Profiler
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Profile Setup & Gaps
        </h1>
        <p className="text-sm text-slate-500">
          Identify your destination career path, availability, and preferences to drive the copilot algorithms.
        </p>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 flex items-start space-x-3">
          <svg className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 flex items-start space-x-3">
          <svg className="h-5 w-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* --- FORM WRAPPER (CREATE OR EDIT MODE) --- */}
      {(isCreating || isEditing) ? (
        <form onSubmit={handleSaveProfile} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-800">
            {isCreating ? "Create New Profile" : "Modify Profile Parameters"}
          </h2>

          {formValidationErrors.length > 0 && (
            <div className="rounded-lg bg-red-50 border border-red-100 p-4 text-xs text-red-700 space-y-1">
              <p className="font-semibold">Please correct the following errors:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {formValidationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Target Career Track */}
            <div className="space-y-2">
              <label htmlFor="track" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Target Career Destination
              </label>
              <input
                id="track"
                type="text"
                value={targetCareerTrack}
                onChange={(e) => setTargetCareerTrack(e.target.value)}
                placeholder="e.g. Fullstack Developer, Data Scientist"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:bg-white"
              />
            </div>

            {/* Weekly availability hours */}
            <div className="space-y-2">
              <label htmlFor="hours" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Weekly Study Commitment (Hours)
              </label>
              <input
                id="hours"
                type="number"
                min="1"
                max="168"
                value={weeklyAvailabilityHours}
                onChange={(e) => setWeeklyAvailabilityHours(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Skill Level Selection Cards */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Competency Level
            </span>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "novice", label: "Novice", desc: "Just starting, no prior active work" },
                { value: "intermediate", label: "Intermediate", desc: "1-3 years basic foundations" },
                { value: "advanced", label: "Advanced", desc: "Fluent, deep production engineering" },
              ].map((lvl) => {
                const isSelected = skillLevel === lvl.value;
                return (
                  <button
                    key={lvl.value}
                    type="button"
                    onClick={() => setSkillLevel(lvl.value as "novice" | "intermediate" | "advanced")}
                    className={`flex flex-col items-start rounded-xl border p-4 text-left transition duration-200 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className={`text-sm font-bold ${isSelected ? "text-indigo-700" : "text-slate-700"}`}>
                      {lvl.label}
                    </span>
                    <span className="mt-1 text-[11px] text-slate-400 leading-normal">{lvl.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Preferences Settings */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800">Job Search Preferences</h3>
              <p className="text-xs text-slate-400">Add custom attributes like targetCompany, targetLocation, or stackPreferences.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Key (e.g. targetCompany)"
                value={prefKey}
                onChange={(e) => setPrefKey(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none transition focus:border-indigo-600 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Value (e.g. Google)"
                value={prefVal}
                onChange={(e) => setPrefVal(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none transition focus:border-indigo-600 focus:bg-white"
              />
              <button
                type="button"
                onClick={handleAddPreference}
                className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-900"
              >
                Add Preference
              </button>
            </div>

            {Object.keys(tempPreferences).length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(tempPreferences).map(([k, v]) => (
                  <div key={k} className="flex items-center space-x-2 rounded-lg bg-slate-100 border border-slate-200 px-3 py-1.5 text-xs">
                    <span className="font-semibold text-slate-600">{k}:</span>
                    <span className="text-slate-800">{v}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePreference(k)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end space-x-4 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setIsCreating(false);
                setFormValidationErrors([]);
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
              {submitting ? "Saving..." : "Save Parameters"}
            </button>
          </div>
        </form>
      ) : profile ? (
        /* --- PROFILE OVERVIEW STATE --- */
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Competency Diagnostics Card</h2>
              <p className="text-xs text-slate-400">Current active path matching AI learning recommendation engines.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleDeleteProfile}
                disabled={submitting}
                className="inline-flex items-center space-x-1.5 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Track</span>
              <p className="text-base font-bold text-slate-800">{profile.targetCareerTrack}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skill Tier</span>
              <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-200 px-3 py-0.5 text-xs font-bold text-indigo-700 capitalize">
                {profile.skillLevel}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Commitment</span>
              <p className="text-base font-bold text-slate-800">{profile.weeklyAvailabilityHours} Hrs/Week</p>
            </div>
          </div>

          {/* Preferences */}
          {Object.keys(profile.preferences || {}).length > 0 && (
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <h3 className="text-sm font-bold text-slate-800">Job Preferences & Settings</h3>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(
                  typeof profile.preferences === "object" && profile.preferences !== null
                    ? profile.preferences instanceof Map
                      ? Object.fromEntries(profile.preferences)
                      : (profile.preferences as Record<string, string>)
                    : {}
                ).map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs">
                    <span className="font-semibold text-slate-600 mr-1.5">{k}:</span>
                    <span className="text-slate-800">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* --- EMPTY STATE BANNER --- */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800">No Skill Profile Created</h2>
            <p className="mx-auto max-w-md text-sm text-slate-500 leading-relaxed">
              Setup your target career destination track, commitment levels, and matching search targets to let the AI build your syllabus.
            </p>
          </div>
          <button
            onClick={() => {
              setIsCreating(true);
              setTargetCareerTrack("");
              setSkillLevel("novice");
              setWeeklyAvailabilityHours(10);
              setTempPreferences({});
            }}
            className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
          >
            <span>Create Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}
