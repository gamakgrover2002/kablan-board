import { Filter, Search, SlidersHorizontal } from "lucide-react";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";

const columns = [
  {
    title: "Backlog",
    colorClass: "bg-column-backlog",
    dotColor: "bg-muted-foreground/50",
    cards: [
      { id: "KAN-01", title: "Research competitor onboarding flows", priority: "low" as const, tags: ["feature" as const], assignee: { initials: "AK", color: "hsl(220, 70%, 50%)" }, comments: 2 },
      { id: "KAN-06", title: "Audit current accessibility compliance", priority: "medium" as const, tags: ["improvement" as const], comments: 1, attachments: 3 },
    ],
  },
  {
    title: "To Do",
    colorClass: "bg-column-todo",
    dotColor: "bg-tag-feature",
    cards: [
      { id: "KAN-02", title: "Design new settings page layout", priority: "medium" as const, tags: ["feature" as const], assignee: { initials: "MR", color: "hsl(270, 60%, 55%)" }, attachments: 2 },
      { id: "KAN-07", title: "Fix date picker timezone bug", priority: "high" as const, tags: ["bug" as const], assignee: { initials: "JL", color: "hsl(0, 72%, 51%)" }, comments: 5 },
      { id: "KAN-09", title: "Write API documentation for v2 endpoints", priority: "low" as const, tags: ["improvement" as const], comments: 1 },
    ],
  },
  {
    title: "In Progress",
    colorClass: "bg-column-progress",
    dotColor: "bg-yellow-500",
    cards: [
      { id: "KAN-03", title: "Implement drag-and-drop card reordering", priority: "high" as const, tags: ["feature" as const], assignee: { initials: "TS", color: "hsl(145, 50%, 40%)" }, comments: 8, attachments: 1 },
      { id: "KAN-08", title: "Optimize image loading performance", priority: "medium" as const, tags: ["improvement" as const], assignee: { initials: "AK", color: "hsl(220, 70%, 50%)" } },
    ],
  },
  {
    title: "Done",
    colorClass: "bg-column-done",
    dotColor: "bg-green-500",
    cards: [
      { id: "KAN-04", title: "Set up CI/CD pipeline for staging", priority: "medium" as const, tags: ["improvement" as const], assignee: { initials: "MR", color: "hsl(270, 60%, 55%)" }, comments: 3, attachments: 2 },
      { id: "KAN-05", title: "Fix login redirect loop on Safari", priority: "high" as const, tags: ["bug" as const], assignee: { initials: "JL", color: "hsl(0, 72%, 51%)" }, comments: 4 },
    ],
  },
];

const KanbanBoard = () => {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Project Board
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your tasks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-48"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            View
          </button>
        </div>
      </header>

      {/* Board */}
      <div className="flex flex-1 gap-4 overflow-x-auto p-6">
        {columns.map((col) => (
          <KanbanColumn
            key={col.title}
            title={col.title}
            count={col.cards.length}
            colorClass={col.colorClass}
            dotColor={col.dotColor}
          >
            {col.cards.map((card) => (
              <KanbanCard key={card.id} {...card} />
            ))}
          </KanbanColumn>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
