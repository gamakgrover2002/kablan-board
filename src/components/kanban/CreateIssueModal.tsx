import React, { useState } from "react";
import { X, Tag as TagIcon, User, Flag, AlignLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/states/store";
import { closeCreateModal } from "@/states/ui/uiSlice";
import { addCard, selectBoardColumns } from "@/states/board/boardSlice";
import { CardTag, IssuePriority, IssueType } from "@/states/types";

const sampleAssignees = [
  { id: "u1", name: "Alex Rivera", initials: "AR", color: "#6366f1" },
  { id: "u2", name: "Sarah Chen", initials: "SC", color: "#ec4899" },
  { id: "u3", name: "Marcus Vance", initials: "MV", color: "#10b981" },
  { id: "u4", name: "Elena Rostova", initials: "ER", color: "#f59e0b" },
];

const availableTags: CardTag[] = [
  "feature",
  "bug",
  "improvement",
  "frontend",
  "backend",
  "design",
  "devops",
];

export const CreateIssueModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCreateModalOpen);
  const defaultColumnId = useAppSelector(
    (state) => state.ui.defaultColumnIdForNewCard
  );
  const columns = useAppSelector(selectBoardColumns);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState(defaultColumnId || columns[0]?.id || "");
  const [priority, setPriority] = useState<IssuePriority>("medium");
  const [type, setType] = useState<IssueType>("task");
  const [selectedTags, setSelectedTags] = useState<CardTag[]>(["feature"]);
  const [assigneeId, setAssigneeId] = useState(sampleAssignees[0].id);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignee = sampleAssignees.find((a) => a.id === assigneeId);

    dispatch(
      addCard({
        title,
        description,
        columnId: columnId || columns[0]?.id || "col-todo",
        priority,
        type,
        tags: selectedTags,
        assignee,
      })
    );

    // Reset & close
    setTitle("");
    setDescription("");
    dispatch(closeCreateModal());
  };

  const toggleTag = (tag: CardTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col my-auto overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-4 shrink-0">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Create New Issue</span>
          </h2>
          <button
            onClick={() => dispatch(closeCreateModal())}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Issue Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Implement user login flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <AlignLeft className="h-3.5 w-3.5" /> Description
            </label>
            <textarea
              rows={3}
              placeholder="Add details about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Column Stage
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs sm:text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Flag className="h-3.5 w-3.5" /> Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as IssuePriority)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs sm:text-sm text-white focus:border-indigo-500 focus:outline-none capitalize"
              >
                <option value="lowest">Lowest</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="highest">Highest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Issue Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as IssueType)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs sm:text-sm text-white focus:border-indigo-500 focus:outline-none capitalize"
              >
                <option value="task">Task</option>
                <option value="bug">Bug</option>
                <option value="story">Story</option>
                <option value="epic">Epic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> Assignee
              </label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs sm:text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {sampleAssignees.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.initials})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <TagIcon className="h-3.5 w-3.5" /> Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize transition border ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-500 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => dispatch(closeCreateModal())}
              className="w-full sm:w-auto rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-medium text-white shadow-lg transition"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
