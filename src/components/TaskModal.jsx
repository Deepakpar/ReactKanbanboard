import React, { useEffect, useState } from "react";

export default function TaskModal({ task, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "todo");
  const [priority, setPriority] = useState(task.priority || "Medium");
  const [tags, setTags] = useState((task.tags || []).join(", "));

  useEffect(() => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || "todo");
    setPriority(task.priority || "Medium");
    setTags((task.tags || []).join(", "));
  }, [task]);

  const save = () => {
    const tagArr = tags.split(",").map(t => t.trim()).filter(Boolean);
    onSave(task.id, { title: title.trim(), description: description.trim(), status, priority, tags: tagArr });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Task</h3>
          <button onClick={onClose} className="text-sm text-gray-600">Close</button>
        </div>

        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full border rounded px-3 py-2" />
          <div className="grid grid-cols-2 gap-2">
            <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-3 py-2">
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="border rounded px-3 py-2">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <input value={tags} onChange={e => setTags(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="tags, comma separated" />

          <div className="flex gap-2 justify-end">
            <button onClick={() => { onDelete(task.id); onClose(); }} className="px-3 py-2 rounded bg-red-100 text-red-700">Delete</button>
            <button onClick={save} className="px-3 py-2 rounded bg-blue-600 text-white">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
