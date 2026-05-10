'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { clearToast } from '@store/uiSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.ui.toast);

  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => dispatch(clearToast()), 3500);
    return () => window.clearTimeout(timeout);
  }, [dispatch, toast]);

  return (
    <>
      {children}
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 right-6 z-50 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-medium shadow-2xl"
            role="status"
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
