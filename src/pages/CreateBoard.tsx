import React, { useState } from "react";
import {
    LayoutDashboard,
    Plus,
    Trash2,
    GripVertical,
    ArrowRight,
} from "lucide-react";

/* ---------- TYPES ---------- */
interface ProcessStage {
    id: string;
    name: string;
    color: string;
}

interface Board {
    boardName: string;
    description: string;
    process: ProcessStage[];
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
    const [boardName, setBoardName] = useState("");
    const [description, setDescription] = useState("");

    const [process, setProcess] = useState<ProcessStage[]>([
        {
            id: Date.now().toString(),
            name: "Pending",
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
        const nextColor =
            stageColors[process.length % stageColors.length];

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
                stage.id === stageId
                    ? { ...stage, [field]: value }
                    : stage
            )
        );
    };

    const removeStage = (stageId: string) => {
        setProcess((prev) =>
            prev.filter((stage) => stage.id !== stageId)
        );
    };

    /* ---------- SUBMIT ---------- */
    const handleCreateBoard = () => {
        const payload: Board = {
            boardName,
            description,
            process,
        };

        console.log("Board Created:", payload);
        window.location.href = "/"; // Redirect to home page after creation
    };

    return (
        <div className="min-h-screen bg-[#0b1120] text-slate-100">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* HEADER */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Create Workflow Board
                            </h1>
                            <p className="text-slate-400 text-sm">
                                Define your board structure by creating custom workflow stages
                            </p>
                        </div>
                    </div>

                    {/* BOARD DETAILS */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Board Name"
                            value={boardName}
                            onChange={(e) =>
                                setBoardName(e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 placeholder:text-slate-500 focus:border-indigo-500 outline-none"
                        />

                        <textarea
                            placeholder="Board Description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 placeholder:text-slate-500 focus:border-indigo-500 outline-none resize-none"
                        />
                    </div>

                    {/* PROCESS BUILDER */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Workflow Process
                                </h2>
                                <p className="text-sm text-slate-400">
                                    Example: Pending → In Progress → Review → Completed
                                </p>
                            </div>

                            <button
                                onClick={addStage}
                                className="px-4 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white flex items-center gap-2 transition"
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
                                    className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-3"
                                >
                                    {/* Order */}
                                    <div className="flex items-center gap-3 min-w-[90px]">
                                        <GripVertical className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm text-slate-400 font-medium">
                                            Step {index + 1}
                                        </span>
                                    </div>

                                    {/* Color */}
                                    <select
                                        value={stage.color}
                                        onChange={(e) =>
                                            updateStage(
                                                stage.id,
                                                "color",
                                                e.target.value
                                            )
                                        }
                                        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 outline-none"
                                    >
                                        {stageColors.map((color, idx) => (
                                            <option
                                                key={idx}
                                                value={color}
                                            >
                                                Stage Color {idx + 1}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Stage Name */}
                                    <input
                                        type="text"
                                        placeholder="Stage Name (e.g. Review)"
                                        value={stage.name}
                                        onChange={(e) =>
                                            updateStage(
                                                stage.id,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 placeholder:text-slate-500 focus:border-indigo-500 outline-none"
                                    />

                                    {/* Delete */}
                                    {process.length > 1 && (
                                        <button
                                            onClick={() =>
                                                removeStage(stage.id)
                                            }
                                            className="p-3 rounded-2xl bg-slate-900 hover:bg-rose-500/10 border border-slate-700 hover:border-rose-500/20 text-slate-400 hover:text-rose-400"
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
                <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Workflow Preview
                    </h2>

                    <div className="flex flex-wrap items-center gap-3">
                        {process.map((stage, index) => (
                            <React.Fragment key={stage.id}>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-3 h-3 rounded-full ${stage.color}`}
                                    />
                                    <span className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700 text-sm font-medium">
                                        {stage.name || `Stage ${index + 1}`}
                                    </span>
                                </div>

                                {index < process.length - 1 && (
                                    <ArrowRight className="w-4 h-4 text-slate-500" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* CREATE BUTTON */}
                <button
                    onClick={handleCreateBoard}
                    className="mt-6 w-full py-4 rounded-3xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold transition"
                >
                    Create Board
                </button>
            </div>
        </div>
    );
};

export default CreateBoard;