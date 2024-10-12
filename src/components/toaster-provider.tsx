"use client";

import { ToastBar, Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return <Toaster>
  {(t) => (
    <ToastBar
      toast={t}
      style={{
        ...t.style,
        animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
      }}
    />
  )}
</Toaster>;
};