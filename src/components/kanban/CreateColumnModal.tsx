import React, { useState } from "react";
import { X, Layout } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/states/store";
import { closeCreateColumnModal } from "@/states/ui/uiSlice";
import { addColumn } from "@/states/board/boardSlice";

const colorPresets = [
  { label: "Blue", dot: "bg-blue-500", cardBg: "bg-blue-950/20 border border-blue-900/30" },
  { label: "Indigo", dot: "bg-indigo-500", cardBg: "bg-indigo-950/20 border border-indigo-900/30" },
  { label: "Amber", dot: "bg-amber-500", cardBg: "bg-amber-950/20 border border-amber-900/30" },
  { label: "Emerald", dot: "bg-emerald-500", cardBg: "bg-emerald-950/20 border border-emerald-900/30" },
  { label: "Rose", dot: "bg-rose-500", cardBg: "bg-rose-950/20 border border-rose-900/30" },
  { label: "Purple", dot: "bg-purple-500", cardBg: "bg-purple-950/20 border border-purple-900/30" },
];

export const CreateColumnModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCreateColumnModalOpen);

  const [title, setTitle] = useState("");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const preset = colorPresets[selectedColorIdx];
    dispatch(
      addColumn({
        title,
        dotColor: preset.dot,
        colorClass: preset.cardBg,
      })
    );

    setTitle("");
    dispatch(closeCreateColumnModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <Layout className="h-5 w-5 text-indigo-400" />
            Add Board Stage Column
          </h2>
          <button
            onClick={() => dispatch(closeCreateColumnModal())}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Column Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. QA Testing, Backlog, Blocked"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
              Color Theme Preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorPresets.map((preset, idx) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`flex items-center gap-2 rounded-xl p-2 text-xs font-medium border transition ${
                    selectedColorIdx === idx
                      ? "border-indigo-500 bg-slate-800 text-white"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className={`h-3 w-3 rounded-full ${preset.dot}`} />
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => dispatch(closeCreateColumnModal())}
              className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-medium text-white transition shadow-lg"
            >
              Add Column
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
