import { MessageSquare, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Priority = "low" | "medium" | "high";
type Tag = "bug" | "feature" | "improvement";

interface KanbanCardProps {
  title: string;
  id: string;
  priority: Priority;
  tags: Tag[];
  assignee?: { initials: string; color: string };
  comments?: number;
  attachments?: number;
}

const priorityIndicator: Record<Priority, string> = {
  low: "bg-muted",
  medium: "bg-tag-feature",
  high: "bg-tag-bug",
};

const tagStyles: Record<Tag, string> = {
  bug: "bg-tag-bug/10 text-tag-bug",
  feature: "bg-tag-feature/10 text-tag-feature",
  improvement: "bg-tag-improvement/10 text-tag-improvement",
};

const KanbanCard = ({
  title,
  id,
  priority,
  tags,
  assignee,
  comments = 0,
  attachments = 0,
}: KanbanCardProps) => {
  return (
    <div className="group cursor-grab rounded-lg border border-border bg-card p-3.5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:cursor-grabbing">
      <div className="mb-2 flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${priorityIndicator[priority]}`} />
        <span className="text-xs font-mono text-muted-foreground">{id}</span>
      </div>

      <h3 className="mb-2.5 text-sm font-medium leading-snug text-card-foreground">
        {title}
      </h3>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${tagStyles[tag]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-muted-foreground">
          {comments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3.5 w-3.5" />
              {comments}
            </span>
          )}
          {attachments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3.5 w-3.5" />
              {attachments}
            </span>
          )}
        </div>

        {assignee && (
          <Avatar className="h-6 w-6 text-[10px]">
            <AvatarFallback
              className="text-primary-foreground font-semibold"
              style={{ backgroundColor: assignee.color }}
            >
              {assignee.initials}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default KanbanCard;
