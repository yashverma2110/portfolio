"use client";

import { useEffect, useRef } from "react";

/** A native <dialog> shown as a bottom sheet on phones and a panel on desktop. */
export default function Sheet({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`mde-sheet ${className ?? ""}`}
      aria-label={title}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mde-sheet-inner">
        <div className="mde-sheet-head">
          <h2>{title}</h2>
          <button type="button" className="mde-btn mde-icon-btn" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {open && children}
      </div>
    </dialog>
  );
}
