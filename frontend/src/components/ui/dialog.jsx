import * as DialogPrimitive from "@radix-ui/react-dialog";

export function Dialog({ open, onOpenChange, children }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <DialogPrimitive.Content
          className="fixed bottom-24 right-4 z-50 w-80 max-w-[90vw] rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg"
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
