export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-lg border bg-white dark:bg-zinc-900 p-4 shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
