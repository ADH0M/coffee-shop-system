export function Badge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    preparing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  const defaultStyle = "bg-gray-500/10 text-gray-400 border-gray-500/20";
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status.toLowerCase()] || defaultStyle}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}