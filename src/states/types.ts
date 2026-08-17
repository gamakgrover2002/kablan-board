export type IssuePriority = "lowest" | "low" | "medium" | "high" | "highest";
export type IssueType = "task" | "bug" | "story" | "epic";
export type CardTag = "bug" | "feature" | "improvement" | "backend" | "frontend" | "design" | "devops";

export interface Assignee {
  id: string;
  name: string;
  initials: string;
  color: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: Assignee;
  text: string;
  createdAt: string;
}

export interface BoardCard {
  id: string;
  issueKey: string; // e.g., "KAN-101"
  title: string;
  description?: string;
  columnId: string;
  priority: IssuePriority;
  type: IssueType;
  tags: CardTag[];
  assignee?: Assignee;
  reporter?: Assignee;
  storyPoints?: number;
  comments: Comment[];
  attachments: number;
  createdAt: string;
  updatedAt?: string;
}

export interface BoardColumn {
  id: string;
  title: string;
  colorClass: string;
  dotColor: string;
  wipLimit?: number;
}

export interface Board {
  id: string;
  name: string;
  key: string;
  description: string;
  columns: BoardColumn[];
  cards: BoardCard[];
}

export interface FilterState {
  searchQuery: string;
  priorityFilter: IssuePriority | "all";
  tagFilter: CardTag | "all";
  assigneeFilter: string | "all";
}

export interface UIState {
  selectedCardId: string | null;
  isCreateModalOpen: boolean;
  isCreateColumnModalOpen: boolean;
  defaultColumnIdForNewCard: string | null;
}