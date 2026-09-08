import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartToast() {
  const { toast } = useCart();
  return (
    <div className="fixed top-20 inset-x-0 z-[70] flex justify-center px-4 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto bg-night-700 border border-cherry-lo text-ink
                       px-5 py-3 rounded-xl shadow-glow text-sm text-center max-w-sm"
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
