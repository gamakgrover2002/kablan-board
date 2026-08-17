import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Trash2,
  GripVertical,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useAppDispatch } from "@/states/store";
import { addBoard } from "@/states/board/boardSlice";

/* ---------- TYPES ---------- */
interface ProcessStage {
  id: string;
  name: string;
  color: string;
}

/* ---------- COLORS ---------- */
const stageColors = [
  "bg-slate-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-rose-500",
];

/* ---------- COMPONENT ---------- */
const CreateBoard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [boardName, setBoardName] = useState("");
  const [boardKey, setBoardKey] = useState("");
  const [description, setDescription] = useState("");

  const [process, setProcess] = useState<ProcessStage[]>([
    {
      id: Date.now().toString(),
      name: "To Do",
      color: stageColors[0],
    },
    {
      id: (Date.now() + 1).toString(),
      name: "In Progress",
      color: stageColors[2],
    },
    {
      id: (Date.now() + 2).toString(),
      name: "Completed",
      color: stageColors[4],
    },
  ]);

  /* ---------- PROCESS ACTIONS ---------- */
  const addStage = () => {
    const nextColor = stageColors[process.length % stageColors.length];

    setProcess((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        color: nextColor,
      },
    ]);
  };

  const updateStage = (
    stageId: string,
    field: keyof ProcessStage,
    value: string
  ) => {
    setProcess((prev) =>
      prev.map((stage) =>
        stage.id === stageId ? { ...stage, [field]: value } : stage
      )
    );
  };

  const removeStage = (stageId: string) => {
    setProcess((prev) => prev.filter((stage) => stage.id !== stageId));
  };

  /* ---------- SUBMIT TO REDUX ---------- */
  const handleCreateBoard = () => {
    if (!boardName.trim()) {
      alert("Please enter a Board Name.");
      return;
    }

    const key = boardKey.trim()
      ? boardKey.trim().toUpperCase()
      : boardName.trim().slice(0, 3).toUpperCase();

    dispatch(
      addBoard({
        name: boardName,
        key,
        description,
        columns: process.map((stage) => ({
          name: stage.name || "Untitled Stage",
          color: stage.color,
        })),
      })
    );

    // Navigate to board view
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans py-4 sm:py-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* Navigation back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Board
        </button>

        {/* HEADER */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-6">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shrink-0">
              <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
            </div>

            <div>
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                Create Custom Workflow Board
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                Define your board structure, key prefix, and custom workflow stages in Redux
              </p>
            </div>
          </div>

          {/* BOARD DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Board Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Mobile App Sprint"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800 border border-slate-700 placeholder:text-slate-500 focus:border-indigo-500 outline-none text-white text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Issue Key Prefix (e.g. MOB)
              </label>
              <input
                type="text"
                maxLength={5}
                placeholder="MOB"
                value={boardKey}
                onChange={(e) => setBoardKey(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800 border border-slate-700 placeholder:text-slate-500 focus:border-indigo-500 outline-none text-white font-mono text-xs sm:text-sm uppercase"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Board Description
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe the purpose of this board..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-slate-800 border border-slate-700 placeholder:text-slate-500 focus:border-indigo-500 outline-none text-white text-xs sm:text-sm resize-none"
              />
            </div>
          </div>

          {/* PROCESS BUILDER */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  Workflow Process Stages
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Example: Backlog → In Progress → Code Review → Done
                </p>
              </div>

              <button
                onClick={addStage}
                className="self-start sm:self-auto px-3.5 py-2 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Stage
              </button>
            </div>

            {/* STAGES */}
            <div className="space-y-3">
              {process.map((stage, index) => (
                <div
                  key={stage.id}
                  className="bg-slate-800/70 border border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3"
                >
                  {/* Order */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-[80px]">
                    <GripVertical className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-400 font-medium">
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Color & Stage Name */}
                  <div className="flex items-center gap-2 flex-1">
                    <select
                      value={stage.color}
                      onChange={(e) =>
                        updateStage(stage.id, "color", e.target.value)
                      }
                      className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 outline-none text-xs text-white"
                    >
                      {stageColors.map((color, idx) => (
                        <option key={idx} value={color}>
                          Color {idx + 1}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Stage Name (e.g. QA Review)"
                      value={stage.name}
                      onChange={(e) =>
                        updateStage(stage.id, "name", e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 placeholder:text-slate-500 focus:border-indigo-500 outline-none text-xs sm:text-sm text-white"
                    />
                  </div>

                  {/* Delete */}
                  {process.length > 1 && (
                    <button
                      onClick={() => removeStage(stage.id)}
                      className="self-end sm:self-auto p-2 rounded-xl bg-slate-900 hover:bg-rose-500/10 border border-slate-700 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div className="mt-6 sm:mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-sm sm:text-base font-semibold mb-3.5 text-white">
            Workflow Stages Preview
          </h2>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {process.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${stage.color}`}
                  />
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
                    {stage.name || `Stage ${index + 1}`}
                  </span>
                </div>

                {index < process.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CREATE BUTTON */}
        <button
          onClick={handleCreateBoard}
          className="mt-6 w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base transition shadow-xl shadow-indigo-600/30"
        >
          Dispatch & Create Board in Redux Store
        </button>
      </div>
    </div>
  );
};

export default CreateBoard;