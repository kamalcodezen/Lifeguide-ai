"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, CheckCircle2, AlertCircle, Award } from "lucide-react";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface Evaluation {
  score: number;
  communicationFeedback: string;
  technicalAccuracyFeedback: string;
  problemSolvingFeedback: string;
  overallFeedback: string;
  strengths: string[];
  areasForImprovement: string[];
}

export default function MockInterviewPage() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  
  const maxTurns = 5;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const handleStart = async () => {
    setLoading(true);
    setChatHistory([]);
    setCurrentTurn(1);
    setIsCompleted(false);
    setEvaluation(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE}/api/v1/ai/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatHistory: [], currentTurn: 1, maxTurns }),
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        setChatHistory([{ role: "model", content: data.data.aiReply }]);
      }
    } catch (error) {
      console.error("Failed to start interview:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || loading || isCompleted) return;

    const userMessage: ChatMessage = { role: "user", content: inputValue.trim() };
    const newHistory = [...chatHistory, userMessage];
    
    setChatHistory(newHistory);
    setInputValue("");
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const nextTurn = currentTurn + 1;
      
      const res = await fetch(`${API_BASE}/api/v1/ai/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatHistory: newHistory, currentTurn: nextTurn, maxTurns }),
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        setCurrentTurn(nextTurn);
        setChatHistory([...newHistory, { role: "model", content: data.data.aiReply }]);
        
        if (data.data.isCompleted) {
          setIsCompleted(true);
          setEvaluation(data.data.evaluation);
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Mock Interview Simulator</h1>
        <p className="text-slate-500">Practice your technical and behavioral skills with our AI interviewer.</p>
      </div>

      {chatHistory.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-sm">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to start your interview?</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            The interview consists of {maxTurns} conversational turns. The AI will ask a mix of technical and behavioral questions tailored to your profile track. Answer naturally and as completely as you would in a real interview.
          </p>
          <button 
            onClick={handleStart}
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Preparing Interview..." : "Start Interview"}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px] overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-800">Senior AI Interviewer</span>
              </div>
              <div className="text-sm font-medium text-slate-500">
                Turn {Math.min(currentTurn, maxTurns)} of {maxTurns}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                    msg.role === "user" ? "bg-slate-800 text-white" : "bg-indigo-100 text-indigo-600"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-5 py-3.5 rounded-2xl max-w-[80%] ${
                    msg.role === "user" 
                      ? "bg-slate-800 text-white rounded-tr-sm" 
                      : "bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-sm"
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-5 py-4 bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {!isCompleted && (
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative flex items-end gap-2">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your response... (Press Enter to send, Shift+Enter for new line)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 min-h-[52px] max-h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-sm"
                    rows={1}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || loading}
                    className="h-[52px] px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Evaluation Scorecard */}
          {isCompleted && evaluation && (
            <div className="bg-white rounded-2xl p-8 border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">Interview Scorecard</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="col-span-1 flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-sm font-medium text-slate-500 mb-2">Overall Score</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-black ${
                      evaluation.score >= 80 ? "text-green-500" : evaluation.score >= 60 ? "text-amber-500" : "text-red-500"
                    }`}>{evaluation.score}</span>
                    <span className="text-xl text-slate-400 font-bold">/100</span>
                  </div>
                </div>
                <div className="col-span-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> Key Strengths
                    </h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 ml-2">
                      {evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" /> Areas to Improve
                    </h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 ml-2">
                      {evaluation.areasForImprovement.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Technical Accuracy</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{evaluation.technicalAccuracyFeedback}</p>
                </div>
                <div className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Problem Solving</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{evaluation.problemSolvingFeedback}</p>
                </div>
                <div className="p-5 bg-indigo-50/50 rounded-xl border border-indigo-50">
                  <h4 className="font-semibold text-slate-800 mb-2">Communication</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{evaluation.communicationFeedback}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-2">Overall Feedback & Next Steps</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{evaluation.overallFeedback}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <button 
                  onClick={handleStart}
                  className="px-6 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
                >
                  Start New Interview
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
