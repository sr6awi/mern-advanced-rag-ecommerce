export function ScrollArea({ className = "", children }) {
  return (
    <div className={`overflow-y-auto max-h-full pr-2 ${className}`}>
      {children}
    </div>
  );
}
