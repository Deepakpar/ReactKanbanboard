import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function Column({ columnId, title, tasks = [], onTaskClick }) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div className="bg-gray-100 rounded p-4 min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs text-gray-500">{tasks.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-[180px] rounded p-1 transition ${isOver ? "bg-blue-50" : ""}`}
        aria-label={title}
      >
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
      </div>
    </div>
  );
}
