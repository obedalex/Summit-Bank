import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CreateCardsModal from "../../components/cards/CreateCardModal";

export default function CardsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-3 flex-warp w-full p-2">
       <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setOpen(true)}
          className="block sm:inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800/80 transition"
        >
          <span className="text-lg leading-none">＋</span>
          New Card
        </button>
      </div>

      {/* AnimatePresence Modal */}
      <AnimatePresence>
        {open && <CreateCardsModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
