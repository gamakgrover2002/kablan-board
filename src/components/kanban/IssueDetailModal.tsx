import React, { useState } from "react";
import { X, MessageSquare, Trash2, Tag as TagIcon, Send, User, Flag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/states/store";
import { setSelectedCardId } from "@/states/ui/uiSlice";
import {
  selectBoardCards,
  selectBoardColumns,
  deleteCard,
  moveCard,
  addComment,
  updateCard,
} from "@/states/board/boardSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IssuePriority } from "@/states/types";

export const IssueDetailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCardId = useAppSelector((state) => state.ui.selectedCardId);
  const cards = useAppSelector(selectBoardCards);
  const columns = useAppSelector(selectBoardColumns);

  const [commentText, setCommentText] = useState("");

  const card = cards.find((c) => c.id === selectedCardId);

  if (!selectedCardId || !card) return null;

  const handleClose = () => {
    dispatch(setSelectedCardId(null));
  };

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
    handleClose();
  };

  const handleColumnChange = (newColumnId: string) => {
    dispatch(moveCard({ cardId: card.id, targetColumnId: newColumnId }));
  };

  const handlePriorityChange = (newPriority: IssuePriority) => {
    dispatch(updateCard({ id: card.id, updates: { priority: newPriority } }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    dispatch(addComment({ cardId: card.id, text: commentText }));
    setCommentText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 sm:px-6 py-3.5 bg-slate-900/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 font-mono text-xs font-semibold text-indigo-400">
              {card.issueKey}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              {card.type}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleDelete}
              title="Delete Issue"
              className="rounded-lg p-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {card.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 sm:p-3.5">
              {card.description || "No description provided."}
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div>
              <span className="block text-xs font-semibold text-slate-400 mb-1">
                Status / Stage
              </span>
              <select
                value={card.columnId}
                onChange={(e) => handleColumnChange(e.target.value)}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 outline-none"
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Flag className="h-3 w-3" /> Priority
              </span>
              <select
                value={card.priority}
                onChange={(e) => handlePriorityChange(e.target.value as IssuePriority)}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 outline-none capitalize"
              >
                <option value="lowest">Lowest</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="highest">Highest</option>
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <User className="h-3 w-3" /> Assignee
              </span>
              <div className="flex items-center gap-2 pt-1">
                {card.assignee ? (
                  <>
                    <Avatar className="h-5 w-5 text-[10px]">
                      <AvatarFallback
                        style={{ backgroundColor: card.assignee.color }}
                        className="text-white font-bold"
                      >
                        {card.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {card.assignee.name}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-500">Unassigned</span>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div>
              <span className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                <TagIcon className="h-3.5 w-3.5" /> Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300 capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t border-slate-800 pt-4">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
              Comments ({card.comments ? card.comments.length : 0})
            </h3>

            {/* List */}
            <div className="space-y-2.5 mb-3.5 max-h-40 overflow-y-auto">
              {card.comments && card.comments.length > 0 ? (
                card.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl bg-slate-800/60 border border-slate-800 p-2.5 sm:p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-4 w-4 sm:h-5 sm:w-5 text-[9px]">
                          <AvatarFallback
                            style={{ backgroundColor: comment.author.color }}
                            className="text-white font-bold"
                          >
                            {comment.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-slate-200">
                          {comment.author.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(comment.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No comments yet.</p>
              )}
            </div>

            {/* New Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white flex items-center gap-1.5 transition shrink-0"
              >
                <Send className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Post</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
