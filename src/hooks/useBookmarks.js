"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  getBookmarks,
  addBookmark,
  deleteBookmark,
  updateBookmark,
} from "../services/bookmarkService";

export function useBookmarks(session) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!session) return;

    fetchData();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  async function fetchData() {
    const data = await getBookmarks(session.user.id); // 🔥 pass user id
    setBookmarks(data);
  }

  async function handleAdd(title, url) {
    await addBookmark(title, url, session.user.id);
    fetchData();
  }

  async function handleDelete(id) {
    await deleteBookmark(id);
    fetchData();
  }

  async function handleUpdate(id, title, url) {
    await updateBookmark(id, title, url);
    fetchData();
}

  return { bookmarks, handleAdd, handleDelete, handleUpdate };
}