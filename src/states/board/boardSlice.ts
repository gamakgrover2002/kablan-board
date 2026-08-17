import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardColumn, BoardCard, Comment, Assignee } from "../types";

export interface BoardState {
  boards: Board[];
  activeBoardId: string;
}

const defaultAssignees: Assignee[] = [
  { id: "u1", name: "Alex Rivera", initials: "AR", color: "#6366f1" },
  { id: "u2", name: "Sarah Chen", initials: "SC", color: "#ec4899" },
  { id: "u3", name: "Marcus Vance", initials: "MV", color: "#10b981" },
  { id: "u4", name: "Elena Rostova", initials: "ER", color: "#f59e0b" },
];

const sampleColumns: BoardColumn[] = [
  {
    id: "col-backlog",
    title: "Backlog",
    colorClass: "bg-slate-900/60 border border-slate-800",
    dotColor: "bg-purple-400",
    wipLimit: 20,
  },
  {
    id: "col-todo",
    title: "To Do",
    colorClass: "bg-slate-900/40 border border-slate-800",
    dotColor: "bg-slate-400",
    wipLimit: 10,
  },
  {
    id: "col-in-progress",
    title: "In Progress",
    colorClass: "bg-indigo-950/20 border border-indigo-900/30",
    dotColor: "bg-indigo-400",
    wipLimit: 5,
  },
  {
    id: "col-in-review",
    title: "In Review",
    colorClass: "bg-amber-950/20 border border-amber-900/30",
    dotColor: "bg-amber-400",
    wipLimit: 3,
  },
  {
    id: "col-done",
    title: "Done",
    colorClass: "bg-emerald-950/20 border border-emerald-900/30",
    dotColor: "bg-emerald-400",
  },
];

const sampleCards: BoardCard[] = [
  {
    id: "card-0",
    issueKey: "KAN-100",
    title: "Explore WebSocket Real-time Collaboration Engine",
    description: "Research socket.io / WebSockets for live multi-user cursor tracking and instant board updates.",
    columnId: "col-backlog",
    priority: "low",
    type: "story",
    tags: ["backend", "feature"],
    assignee: defaultAssignees[3],
    reporter: defaultAssignees[0],
    storyPoints: 8,
    comments: [],
    attachments: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-1",
    issueKey: "KAN-101",
    title: "Implement Redux Toolkit State Architecture",
    description: "Setup slices for board, filter, and ui state management with TypeScript support.",
    columnId: "col-in-progress",
    priority: "high",
    type: "task",
    tags: ["feature", "frontend"],
    assignee: defaultAssignees[0],
    reporter: defaultAssignees[1],
    storyPoints: 5,
    comments: [
      {
        id: "comm-1",
        author: defaultAssignees[1],
        text: "Make sure custom typed hooks useAppDispatch and useAppSelector are exported.",
        createdAt: new Date().toISOString(),
      },
    ],
    attachments: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-2",
    issueKey: "KAN-102",
    title: "Fix Navbar Dropdown z-index Alignment",
    description: "Navbar menu gets clipped under the main hero banner on mobile viewport sizes.",
    columnId: "col-todo",
    priority: "medium",
    type: "bug",
    tags: ["bug", "frontend"],
    assignee: defaultAssignees[2],
    reporter: defaultAssignees[0],
    storyPoints: 2,
    comments: [],
    attachments: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-3",
    issueKey: "KAN-103",
    title: "Design PostgreSQL Schema for Multi-tenant Workspaces",
    description: "Define relational models for organizations, projects, boards, cards, and audit logs.",
    columnId: "col-in-review",
    priority: "highest",
    type: "story",
    tags: ["backend", "design"],
    assignee: defaultAssignees[1],
    reporter: defaultAssignees[3],
    storyPoints: 8,
    comments: [
      {
        id: "comm-2",
        author: defaultAssignees[3],
        text: "Please review indexing strategy on workspace_id and board_id foreign keys.",
        createdAt: new Date().toISOString(),
      },
    ],
    attachments: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "card-4",
    issueKey: "KAN-104",
    title: "Set up Automated CI/CD Pipeline via GitHub Actions",
    description: "Add linting, vitest runner, and deployment workflows targeting Vercel staging environments.",
    columnId: "col-done",
    priority: "low",
    type: "task",
    tags: ["devops", "improvement"],
    assignee: defaultAssignees[3],
    reporter: defaultAssignees[0],
    storyPoints: 3,
    comments: [],
    attachments: 0,
    createdAt: new Date().toISOString(),
  },
];

const initialBoard: Board = {
  id: "board-default",
  name: "Main Engineering Board",
  key: "KAN",
  description: "Primary board for engineering sprint planning and issue tracking",
  columns: sampleColumns,
  cards: sampleCards,
};

const initialState: BoardState = {
  boards: [initialBoard],
  activeBoardId: "board-default",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoardId = action.payload;
    },

    addBoard: (
      state,
      action: PayloadAction<{
        name: string;
        key: string;
        description: string;
        columns: { name: string; color: string }[];
      }>
    ) => {
      const newBoardId = `board-${Date.now()}`;
      const newColumns: BoardColumn[] = action.payload.columns.map((col, idx) => ({
        id: `col-${Date.now()}-${idx}`,
        title: col.name,
        colorClass: "bg-slate-900/40 border border-slate-800",
        dotColor: col.color || "bg-indigo-500",
      }));

      const newBoard: Board = {
        id: newBoardId,
        name: action.payload.name,
        key: action.payload.key || "BOARD",
        description: action.payload.description,
        columns: newColumns,
        cards: [],
      };

      state.boards.push(newBoard);
      state.activeBoardId = newBoardId;
    },

    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((b) => b.id !== action.payload);
      if (state.activeBoardId === action.payload && state.boards.length > 0) {
        state.activeBoardId = state.boards[0].id;
      }
    },

    // Column Management
    addColumn: (
      state,
      action: PayloadAction<{ title: string; colorClass?: string; dotColor?: string }>
    ) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      const newCol: BoardColumn = {
        id: `col-${Date.now()}`,
        title: action.payload.title,
        colorClass: action.payload.colorClass || "bg-slate-900/40 border border-slate-800",
        dotColor: action.payload.dotColor || "bg-blue-500",
      };

      activeBoard.columns.push(newCol);
    },

    removeColumn: (state, action: PayloadAction<string>) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      activeBoard.columns = activeBoard.columns.filter((c) => c.id !== action.payload);
      // Remove cards associated with this column
      activeBoard.cards = activeBoard.cards.filter((c) => c.columnId !== action.payload);
    },

    updateColumn: (state, action: PayloadAction<BoardColumn>) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      const index = activeBoard.columns.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        activeBoard.columns[index] = action.payload;
      }
    },

    // Card/Issue Management
    addCard: (
      state,
      action: PayloadAction<Omit<BoardCard, "id" | "issueKey" | "comments" | "attachments" | "createdAt">>
    ) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      const issueNumber = activeBoard.cards.length + 101;
      const newCard: BoardCard = {
        ...action.payload,
        id: `card-${Date.now()}`,
        issueKey: `${activeBoard.key}-${issueNumber}`,
        comments: [],
        attachments: 0,
        createdAt: new Date().toISOString(),
      };

      activeBoard.cards.push(newCard);
    },

    updateCard: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<BoardCard> }>
    ) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      const card = activeBoard.cards.find((c) => c.id === action.payload.id);
      if (card) {
        Object.assign(card, action.payload.updates, { updatedAt: new Date().toISOString() });
      }
    },

    deleteCard: (state, action: PayloadAction<string>) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      activeBoard.cards = activeBoard.cards.filter((c) => c.id !== action.payload);
    },

    moveCard: (
      state,
      action: PayloadAction<{ cardId: string; targetColumnId: string }>
    ) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      const card = activeBoard.cards.find((c) => c.id === action.payload.cardId);
      if (card) {
        card.columnId = action.payload.targetColumnId;
        card.updatedAt = new Date().toISOString();
      }
    },

    addComment: (
      state,
      action: PayloadAction<{ cardId: string; text: string; author?: Assignee }>
    ) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return;

      const card = activeBoard.cards.find((c) => c.id === action.payload.cardId);
      if (card) {
        const newComment: Comment = {
          id: `comm-${Date.now()}`,
          author: action.payload.author || defaultAssignees[0],
          text: action.payload.text,
          createdAt: new Date().toISOString(),
        };
        card.comments.push(newComment);
      }
    },
  },
});

export const {
  setActiveBoard,
  addBoard,
  deleteBoard,
  addColumn,
  removeColumn,
  updateColumn,
  addCard,
  updateCard,
  deleteCard,
  moveCard,
  addComment,
} = boardSlice.actions;

// Selectors
export const selectActiveBoard = (state: { board: BoardState }) =>
  state.board.boards.find((b) => b.id === state.board.activeBoardId) || state.board.boards[0];

export const selectAllBoards = (state: { board: BoardState }) => state.board.boards;

export const selectBoardColumns = (state: { board: BoardState }) => {
  const active = selectActiveBoard(state);
  return active ? active.columns : [];
};

export const selectBoardCards = (state: { board: BoardState }) => {
  const active = selectActiveBoard(state);
  return active ? active.cards : [];
};

export default boardSlice.reducer;
