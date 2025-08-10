import React, {   useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";


import TaskModal from "../components/TaskModal";
import TaskDragOverlay from "../components/TaskDragOverlay";

import { DndContext, DragOverlay } from "@dnd-kit/core";
import useDnDSensors from "../components/DnDSensors";
import TaskForm from "../Components/TaskForm";
import Column from "../Components/Column";


export default function Board() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useContext(TaskContext);
  const [modalTask, setModalTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useDnDSensors();

  const handleDragStart = (event) => {
    const { active } = event;
    const t = tasks.find(x => x.id === active.id);
    setActiveTask(t || null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;
    if (active.id === over.id) return;
    const newStatus = over.id; // our droppables use 'todo','inprogress','done'
    moveTask(active.id, newStatus);
  };

  const handleDragCancel = () => setActiveTask(null);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
        </header>

        <TaskForm onSubmit={addTask} />

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Column columnId="todo" title="To Do" tasks={tasks.filter(t => t.status === "todo")} onTaskClick={(t) => setModalTask(t)} />
            <Column columnId="inprogress" title="In Progress" tasks={tasks.filter(t => t.status === "inprogress")} onTaskClick={(t) => setModalTask(t)} />
            <Column columnId="done" title="Done" tasks={tasks.filter(t => t.status === "done")} onTaskClick={(t) => setModalTask(t)} />
          </div>

          <DragOverlay dropAnimation={{ duration: 160 }}>
            <TaskDragOverlay activeTask={activeTask} />
          </DragOverlay>
        </DndContext>

        {modalTask && (
          <TaskModal
            task={modalTask}
            onClose={() => setModalTask(null)}
            onSave={(id, patch) => updateTask(id, patch)}
            onDelete={(id) => deleteTask(id)}
          />
        )}
      </div>
    </div>
  );
}
