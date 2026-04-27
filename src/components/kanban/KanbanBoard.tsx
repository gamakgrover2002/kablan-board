import { Filter, Search, SlidersHorizontal } from "lucide-react";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSelector } from "react-redux";
import { selectBoard } from "@/states/board/boardSlice";




const KanbanBoard = () => {
  const isMobile = useIsMobile();
  const boardColumns = useSelector(selectBoard);
  console.log(boardColumns);
  
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

      {!boardColumns && (
        <div>
          <p className="text-center text-muted-foreground mt-10">
            No columns found. Please Craete your columns by going to following page.
          </p>
          <div className="flex justify-center mt-4">
            <a
              href="/columns"
              className="rounded-lg bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90"
            >
              Create Columns
            </a>
            </div>
            </div>
      )}

    
      <div className={`flex ${isMobile? "flex-col":"flex-1"} gap-4 overflow-x-auto p-6`}>
        {boardColumns && boardColumns.map((col) => (
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
