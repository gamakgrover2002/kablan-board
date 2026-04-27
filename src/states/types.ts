export interface BoardColumn {
    id: string;
    name: string;
    cards: BoardCard[];
}
export interface BoardCard {
    id: string;
    priority:"low" | "medium" | "high";
    comments:string[]
    title: string;
    description?: string;
    assignee?: AssigneeType;
    dueDate?: string;
    tags:string[]
}
export interface AssigneeType{
    initials: string;
    color: string;
}
export interface Card {
    id: string;
    title: string;
    description: string;
  }
  
 export interface Column {
    title: string;
    cards: Card[];
    colorClass: string;
    dotColor: string;
  }
  
 export interface InitialState {
    board: Column[];
  }