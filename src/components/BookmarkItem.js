"use client";

import { useState } from "react";

export default function BookmarkItem({
  bookmark,
  handleDelete,
  handleUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(bookmark.title);
  const [editUrl, setEditUrl] = useState(bookmark.url);

  const saveEdit = async () => {
    if (!editTitle || !editUrl) return;
    await handleUpdate(bookmark.id, editTitle, editUrl);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
      {isEditing ? (
        <div className="space-y-3">
          <input
            className="border p-2 rounded w-full text-black"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            className="border p-2 rounded w-full text-black"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={saveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              {bookmark.title}
            </p>
            <a
              href={bookmark.url}
              target="_blank"
              className="text-sm text-blue-600 hover:underline break-all"
            >
              {bookmark.url}
            </a>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 cursor-pointer hover:text-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(bookmark.id)}
              className="text-red-500 cursor-pointer hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}