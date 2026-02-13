"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useBookmarks } from "../hooks/useBookmarks";
import BookmarkItem from "../components/BookmarkItem";

export default function Home() {
  const { session, loading, signIn, signOut } = useAuth();
  const { bookmarks, handleAdd, handleDelete, handleUpdate } =
    useBookmarks(session);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Smart Bookmark
          </h1>
          <button
            onClick={signIn}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const submit = async () => {
    if (!title || !url) return;
    await handleAdd(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Smart Bookmark
        </h1>
        <button
          onClick={signOut}
          className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-6">
        {/* Add Bookmark Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Add New Bookmark
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              onClick={submit}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Bookmark List */}
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No bookmarks yet. Add your first one 🚀
            </div>
          ) : (
            bookmarks.map((bookmark) => (
              <BookmarkItem
                key={bookmark.id}
                bookmark={bookmark}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}