import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type ToastType = 'info' | 'success' | 'error';

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  pushToast: (toast: Omit<ToastItem, 'id' | 'duration'> & { duration?: number }) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const defaultDuration = useCallback((type: ToastType) => {
    if (type === 'success') return 2500;
    if (type === 'error') return 5000;
    return 3500;
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastItem, 'id' | 'duration'> & { duration?: number }) => {
      const id = crypto.randomUUID();
      const duration = toast.duration ?? defaultDuration(toast.type);
      setToasts((prev) => [...prev, { ...toast, id, duration }]);
      window.setTimeout(() => removeToast(id), duration);
    },
    [defaultDuration, removeToast],
  );

  const value = useMemo<ToastContextValue>(() => ({ pushToast, dismissToast: removeToast }), [pushToast, removeToast]);

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
                ? 'pointer-events-auto animate-[pageEnter_0.18s_ease-out] rounded-card border border-transparent bg-[var(--status-danger-soft)] px-4 py-3 text-sm text-[var(--status-danger)] shadow-card'
                : toast.type === 'success'
                  ? 'pointer-events-auto animate-[pageEnter_0.18s_ease-out] rounded-card border border-transparent bg-[var(--status-success-soft)] px-4 py-3 text-sm text-[var(--status-success)] shadow-card'
                  : 'pointer-events-auto animate-[pageEnter_0.18s_ease-out] rounded-card border border-transparent bg-[var(--status-info-soft)] px-4 py-3 text-sm text-[var(--status-info)] shadow-card'
            }
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{toast.title}</p>
                {toast.description ? <p className="mt-1 text-xs opacity-90">{toast.description}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="pointer-events-auto rounded-full px-2 py-1 text-xs opacity-80 transition-opacity hover:opacity-100"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
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

  // Use toasts for lightweight confirmations. Primary page-state feedback belongs inline.
  return ctx;
}
