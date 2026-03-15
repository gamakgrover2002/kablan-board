import { Plus } from "lucide-react";
import { ReactNode } from "react";

interface KanbanColumnProps {
  title: string;
  count: number;
  colorClass: string;
  dotColor: string;
  children: ReactNode;
}

const KanbanColumn = ({ title, count, colorClass, dotColor, children }: KanbanColumnProps) => {
  return (
    <div className={`flex min-w-[24.3%] flex-col rounded-xl ${colorClass} p-3`}>
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground/10 px-1.5 text-[11px] font-semibold text-muted-foreground">
            {count}
          </span>
        </div>
        <button className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default KanbanColumn;
