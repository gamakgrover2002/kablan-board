import React, { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/states/store";
import { openCreateModal } from "@/states/ui/uiSlice";
import { removeColumn, moveCard } from "@/states/board/boardSlice";
import { BoardColumn } from "@/states/types";

interface KanbanColumnProps {
  column: BoardColumn;
  count: number;
  children: ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, count, children }) => {
  const dispatch = useAppDispatch();

  const handleAddCardClick = () => {
    dispatch(openCreateModal(column.id));
  };

  const handleRemoveColumn = () => {
    if (window.confirm(`Are you sure you want to delete column "${column.title}"?`)) {
      dispatch(removeColumn(column.id));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    if (cardId) {
      dispatch(moveCard({ cardId, targetColumnId: column.id }));
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex w-full md:w-[310px] lg:w-[340px] md:min-w-[280px] shrink-0 flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-3.5 sm:p-4 transition-colors"
    >
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className={`h-2.5 w-2.5 rounded-full ${column.dotColor}`} />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide text-slate-100 truncate max-w-[150px] sm:max-w-[180px]">
            {column.title}
          </h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-800 px-2 text-[11px] font-bold text-slate-300">
            {count}
            {column.wipLimit ? ` / ${column.wipLimit}` : ""}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleAddCardClick}
            title="Add task to column"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={handleRemoveColumn}
            title="Delete column"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pr-0.5 max-h-[calc(100vh-250px)] md:max-h-none">
        {children}
        {count === 0 && (
          <div
            onClick={handleAddCardClick}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 p-5 sm:p-6 text-center text-slate-500 hover:border-indigo-500/50 hover:bg-slate-900/30 hover:text-indigo-400 transition"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mb-1 opacity-70" />
            <span className="text-xs font-medium">Add task to stage</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
