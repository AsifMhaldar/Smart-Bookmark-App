import { supabase } from "../lib/supabaseClient";

export async function getBookmarks() {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addBookmark(title, url, userId) {
  const { error } = await supabase.from("bookmarks").insert([
    {
      title,
      url,
      user_id: userId,
    },
  ]);

  if (error) throw error;
}

export async function deleteBookmark(id) {
  const { error } = await supabase.from("bookmarks").delete().eq("id", id);

  if (error) throw error;
}

export async function updateBookmark(id, title, url) {
  const { error } = await supabase
    .from("bookmarks")
    .update({ title, url })
    .eq("id", id);

  if (error) throw error;
}