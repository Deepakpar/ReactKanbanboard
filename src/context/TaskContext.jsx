import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

const STORAGE_KEY = "kanban_tasks_v1";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to read localStorage", e);
    }

    // sample seed
    const t1 = generateId();
    const t2 = generateId();
    const t3 = generateId();
    return [
      { id: t1, title: "Design hero section", description: "Create layout and CTA", status: "todo", priority: "High", tags: ["design"] },
      { id: t2, title: "Setup API", description: "Mock tasks endpoints", status: "inprogress", priority: "Medium", tags: ["backend"] },
      { id: t3, title: "Write tests", description: "Unit tests for components", status: "done", priority: "Low", tags: ["qa"] }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  }, [tasks]);

  const addTask = ({ title, description = "", status = "todo", priority = "Medium", tags = [] }) => {
    const newTask = { id: generateId(), title, description, status, priority, tags };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id, patch) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
}
