export default function DashboardLoading() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center space-y-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">
        Loading dashboard content...
      </p>
    </div>
  );
}
