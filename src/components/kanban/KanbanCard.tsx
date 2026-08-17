import React from "react";
import { MessageSquare, Paperclip, Flag, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BoardCard, IssuePriority, CardTag } from "@/states/types";
import { useAppDispatch } from "@/states/store";
import { setSelectedCardId } from "@/states/ui/uiSlice";

const priorityStyles: Record<IssuePriority, { color: string; label: string }> = {
  lowest: { color: "bg-slate-500", label: "Lowest" },
  low: { color: "bg-blue-500", label: "Low" },
  medium: { color: "bg-amber-500", label: "Medium" },
  high: { color: "bg-orange-500", label: "High" },
  highest: { color: "bg-rose-500", label: "Highest" },
};

const tagStyles: Record<string, string> = {
  bug: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  feature: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  improvement: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  backend: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  frontend: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  devops: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

interface KanbanCardProps {
  card: BoardCard;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card }) => {
  const dispatch = useAppDispatch();

  const priorityInfo = priorityStyles[card.priority] || priorityStyles.medium;

  const handleCardClick = () => {
    dispatch(setSelectedCardId(card.id));
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-sm transition-all hover:border-indigo-500/50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
    >
      {/* Top Bar: Priority + Key + Type */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${priorityInfo.color}`}
            title={`Priority: ${priorityInfo.label}`}
          />
          <span className="font-mono text-xs font-semibold text-indigo-400">
            {card.issueKey}
          </span>
        </div>

        <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-800/80 px-2 py-0.5 rounded-md">
          {card.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2">
        {card.title}
      </h3>

      {/* Description preview */}
      {card.description && (
        <p className="mb-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {card.description}
        </p>
      )}

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${
                tagStyles[tag] || "bg-slate-800 text-slate-300 border-slate-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer: Metadata + Assignee */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5 mt-2">
        <div className="flex items-center gap-3 text-slate-400">
          {card.comments && card.comments.length > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
              {card.comments.length}
            </span>
          )}

          {card.attachments > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <Paperclip className="h-3.5 w-3.5 text-slate-400" />
              {card.attachments}
            </span>
          )}

          {card.storyPoints !== undefined && (
            <span className="rounded-full bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-300">
              {card.storyPoints} pts
            </span>
          )}
        </div>

        {card.assignee && (
          <Avatar className="h-6 w-6 text-[10px] ring-1 ring-slate-800">
            <AvatarFallback
              className="text-white font-semibold"
              style={{ backgroundColor: card.assignee.color }}
            >
              {card.assignee.initials}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default KanbanCard;
