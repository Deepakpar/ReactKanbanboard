import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, onClick, compact = false }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: task.id,
    data: { status: task.status }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "manipulation"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation(); // avoid bubbling issues
        onClick && onClick(task);
      }}
      className={`bg-white rounded shadow-sm border p-3 mb-3 cursor-grab hover:shadow-md select-none ${
        compact ? "text-sm p-2" : ""
      }`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h4 className="font-medium">{task.title}</h4>
          {task.description ? <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p> : null}
          <div className="mt-2 flex gap-2 flex-wrap">
            {(task.tags || []).map((t, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t}</span>
            ))}
          </div>
        </div>
        <div className="text-right text-xs">
          <div className="font-semibold">{task.priority}</div>
        </div>
      </div>
    </div>
  );
}
