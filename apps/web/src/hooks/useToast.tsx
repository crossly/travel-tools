import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type ToastType = 'info' | 'success' | 'error';

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextValue {
  pushToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { ...toast, id }]);
      window.setTimeout(() => removeToast(id), 2600);
    },
    [removeToast],
  );

  const value = useMemo<ToastContextValue>(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 z-overlay mx-auto flex w-full max-w-phone flex-col gap-2 px-4"
        style={{ bottom: 'max(16px, env(safe-area-inset-bottom, 0px))' }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={
              toast.type === 'error'
                ? 'pointer-events-auto rounded-card border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-card dark:border-red-900 dark:bg-red-950 dark:text-red-200'
                : toast.type === 'success'
                  ? 'pointer-events-auto rounded-card border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-card dark:border-green-900 dark:bg-green-950 dark:text-green-200'
                  : 'pointer-events-auto rounded-card border border-borderc bg-card px-4 py-3 text-sm text-textp shadow-card'
            }
            role="status"
            aria-live="polite"
          >
            <p className="font-medium">{toast.title}</p>
            {toast.description ? <p className="mt-1 text-xs opacity-90">{toast.description}</p> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
