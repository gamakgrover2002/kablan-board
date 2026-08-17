import { describe, it, expect } from "vitest";
import boardReducer, {
  addCard,
  moveCard,
  addColumn,
  addBoard,
  deleteCard,
} from "./boardSlice";
import { BoardState } from "./boardSlice";

describe("boardSlice Redux State Management", () => {
  const initialState: BoardState = {
    boards: [
      {
        id: "board-1",
        name: "Test Board",
        key: "TEST",
        description: "Test Description",
        columns: [
          { id: "col-1", title: "To Do", colorClass: "", dotColor: "" },
          { id: "col-2", title: "In Progress", colorClass: "", dotColor: "" },
        ],
        cards: [
          {
            id: "card-1",
            issueKey: "TEST-101",
            title: "First Task",
            columnId: "col-1",
            priority: "medium",
            type: "task",
            tags: ["feature"],
            comments: [],
            attachments: 0,
            createdAt: new Date().toISOString(),
          },
        ],
      },
    ],
    activeBoardId: "board-1",
  };

  it("should handle addCard", () => {
    const newState = boardReducer(
      initialState,
      addCard({
        title: "Second Task",
        description: "Task description",
        columnId: "col-1",
        priority: "high",
        type: "bug",
        tags: ["bug"],
      })
    );

    const activeBoard = newState.boards.find((b) => b.id === "board-1");
    expect(activeBoard?.cards.length).toBe(2);
    expect(activeBoard?.cards[1].title).toBe("Second Task");
    expect(activeBoard?.cards[1].issueKey).toBe("TEST-102");
  });

  it("should handle moveCard between columns", () => {
    const newState = boardReducer(
      initialState,
      moveCard({ cardId: "card-1", targetColumnId: "col-2" })
    );

    const activeBoard = newState.boards.find((b) => b.id === "board-1");
    const movedCard = activeBoard?.cards.find((c) => c.id === "card-1");
    expect(movedCard?.columnId).toBe("col-2");
  });

  it("should handle addColumn", () => {
    const newState = boardReducer(
      initialState,
      addColumn({ title: "Review Stage", dotColor: "bg-purple-500" })
    );

    const activeBoard = newState.boards.find((b) => b.id === "board-1");
    expect(activeBoard?.columns.length).toBe(3);
    expect(activeBoard?.columns[2].title).toBe("Review Stage");
  });

  it("should handle deleteCard", () => {
    const newState = boardReducer(initialState, deleteCard("card-1"));
    const activeBoard = newState.boards.find((b) => b.id === "board-1");
    expect(activeBoard?.cards.length).toBe(0);
  });

  it("should handle addBoard", () => {
    const newState = boardReducer(
      initialState,
      addBoard({
        name: "New Sprint Board",
        key: "SPRINT",
        description: "Sprint 23",
        columns: [{ name: "Backlog", color: "bg-blue-500" }],
      })
    );

    expect(newState.boards.length).toBe(2);
    expect(newState.activeBoardId).not.toBe("board-1");
  });
});
