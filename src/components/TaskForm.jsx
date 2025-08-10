import React, { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const tagArr = tags.split(",").map(t => t.trim()).filter(Boolean);
    onSubmit({ title: title.trim(), description: description.trim(), status: "todo", priority, tags: tagArr });
    setTitle(""); setDescription(""); setTags(""); setPriority("Medium");
  };

  return (
    <form onSubmit={submit} className="mb-4 grid gap-2 md:grid-cols-4">
      <input className="border rounded px-3 py-2 md:col-span-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="border rounded px-3 py-2 md:col-span-1" placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="border rounded px-3 py-2 md:col-span-1" placeholder="tags (comma)" value={tags} onChange={(e) => setTags(e.target.value)} />
      <div className="flex gap-2 items-center md:col-span-1">
        <select value={priority} onChange={e => setPriority(e.target.value)} className="border rounded px-2 py-2">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>
    </form>
  );
}
