import React from "react";
import {
  Filter,
  Search,
  Plus,
  LayoutDashboard,
  Layers,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import { CreateIssueModal } from "./CreateIssueModal";
import { IssueDetailModal } from "./IssueDetailModal";
import { CreateColumnModal } from "./CreateColumnModal";
import { useIsMobile } from "@/hooks/use-mobile";

// Redux hooks & actions
import { useAppDispatch, useAppSelector } from "@/states/store";
import {
  selectActiveBoard,
  selectAllBoards,
  setActiveBoard,
} from "@/states/board/boardSlice";
import {
  setSearchQuery,
  setPriorityFilter,
  setTagFilter,
  resetFilters,
} from "@/states/filter/filterSlice";
import { openCreateModal, openCreateColumnModal } from "@/states/ui/uiSlice";
import { CardTag, IssuePriority } from "@/states/types";

const KanbanBoard: React.FC = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  // Redux Selectors
  const activeBoard = useAppSelector(selectActiveBoard);
  const allBoards = useAppSelector(selectAllBoards);
  const filters = useAppSelector((state) => state.filter);

  if (!activeBoard) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0b1120] text-slate-100 p-4 sm:p-6 text-center">
        <LayoutDashboard className="h-12 w-12 text-indigo-400 mb-4 animate-bounce" />
        <h2 className="text-xl sm:text-2xl font-bold">No Boards Found</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 mb-6">
          Create your first workflow board to start managing issues and tasks.
        </p>
        <a
          href="/create-board"
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-indigo-500 transition shadow-lg"
        >
          Create New Board
        </a>
      </div>
    );
  }

  // Filter Cards based on Redux filter state
  const filteredCards = activeBoard.cards.filter((card) => {
    // Search query match
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const titleMatch = card.title.toLowerCase().includes(q);
      const descMatch = card.description?.toLowerCase().includes(q);
      const keyMatch = card.issueKey.toLowerCase().includes(q);
      if (!titleMatch && !descMatch && !keyMatch) return false;
    }

    // Priority match
    if (filters.priorityFilter !== "all") {
      if (card.priority !== filters.priorityFilter) return false;
    }

    // Tag match
    if (filters.tagFilter !== "all") {
      if (!card.tags || !card.tags.includes(filters.tagFilter as CardTag)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="flex h-screen flex-col bg-[#0b1120] text-slate-100 overflow-hidden font-sans">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 sm:px-6 py-3.5 sm:py-4 backdrop-blur-xl gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <LayoutDashboard className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Board Selector */}
              {allBoards.length > 1 ? (
                <div className="relative">
                  <select
                    value={activeBoard.id}
                    onChange={(e) => dispatch(setActiveBoard(e.target.value))}
                    className="appearance-none rounded-xl bg-slate-800 border border-slate-700 px-3 py-1 text-base sm:text-lg font-bold text-white pr-8 focus:border-indigo-500 outline-none cursor-pointer max-w-[200px] sm:max-w-none truncate"
                  >
                    {allBoards.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.key})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              ) : (
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate">
                  {activeBoard.name}
                </h1>
              )}

              <span className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-bold text-indigo-400">
                {activeBoard.key}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate hidden sm:block">
              {activeBoard.description || "Jira-style board for sprint tracking and task workflow."}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => dispatch(openCreateColumnModal())}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400" />
            <span className="truncate">Add Stage</span>
          </button>

          <a
            href="/create-board"
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
            <span className="truncate">New Workflow</span>
          </a>

          <button
            onClick={() => dispatch(openCreateModal())}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4" />
            <span>Create Issue</span>
          </button>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-4 sm:px-6 py-2.5 sm:py-3 gap-2.5 sm:gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
          {/* Search Box */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 w-full sm:w-64 focus-within:border-indigo-500 transition">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search tasks, keys..."
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="bg-transparent text-xs text-white placeholder:text-slate-500 outline-none w-full"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1 text-xs flex-1 sm:flex-initial">
            <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <select
              value={filters.priorityFilter}
              onChange={(e) =>
                dispatch(setPriorityFilter(e.target.value as IssuePriority | "all"))
              }
              className="w-full sm:w-auto rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 focus:border-indigo-500 outline-none capitalize"
            >
              <option value="all">All Priorities</option>
              <option value="lowest">Lowest</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="highest">Highest</option>
            </select>
          </div>

          {/* Tag Filter */}
          <div className="flex items-center gap-1 text-xs flex-1 sm:flex-initial">
            <select
              value={filters.tagFilter}
              onChange={(e) =>
                dispatch(setTagFilter(e.target.value as CardTag | "all"))
              }
              className="w-full sm:w-auto rounded-lg bg-slate-800 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 focus:border-indigo-500 outline-none capitalize"
            >
              <option value="all">All Tags</option>
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
              <option value="improvement">Improvement</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
              <option value="devops">DevOps</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(filters.searchQuery ||
            filters.priorityFilter !== "all" ||
            filters.tagFilter !== "all") && (
            <button
              onClick={() => dispatch(resetFilters())}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          )}
        </div>

        <div className="text-[11px] sm:text-xs text-slate-400 font-medium text-right sm:text-left">
          Showing <span className="text-indigo-400 font-bold">{filteredCards.length}</span> of{" "}
          <span className="text-slate-200 font-bold">{activeBoard.cards.length}</span> issues
        </div>
      </div>

      {/* Board Columns Grid */}
      <div
        className={`flex ${
          isMobile ? "flex-col overflow-y-auto" : "flex-row overflow-x-auto"
        } flex-1 gap-4 p-4 sm:p-6`}
      >
        {activeBoard.columns.map((column) => {
          const colCards = filteredCards.filter((card) => card.columnId === column.id);
          return (
            <KanbanColumn key={column.id} column={column} count={colCards.length}>
              {colCards.map((card) => (
                <KanbanCard key={card.id} card={card} />
              ))}
            </KanbanColumn>
          );
        })}
      </div>

      {/* Redux Connected Modals */}
      <CreateIssueModal />
      <IssueDetailModal />
      <CreateColumnModal />
    </div>
  );
};

export default KanbanBoard;
