import { createClient } from "@/utils/supabase/client";

export type Blog = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  authors: any;
};

export type BlogResponse = {
  success: boolean;
  message: string;
  data?: Blog;
};

export async function fetchPublicBlogs(): Promise<Blog[]> {
  const supabase = createClient();
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, content, created_at, updated_at, authors(display_name)")
    .order("created_at", { ascending: false });
  if (error) console.error("Error fetching blogs:", error.message);
  return blogs || [];
}

export async function fetchBlog(id: string): Promise<BlogResponse> {
  const supabase = createClient();
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, content, created_at, updated_at, authors(display_name)")
    .eq("id", id);

  if (error) return { success: false, message: "Blog not found" };
  return {
    success: true,
    message: "Blog fetched successfully",
    data: blogs[0],
  };
}

export async function fetchBlogs(): Promise<Blog[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return [];

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching user blogs:", error.message);
  return blogs || [];
}

export async function createBlog(
  title: string,
  content: string
): Promise<Blog | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return null;

  console.log(user.id);
  const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, content, user_id: user.id }])
    .select();

  console.log();
  if (error) console.error("Error creating blog:", error.message);
  return data?.[0] || null;
}

export async function updateBlog(
  blogId: string,
  title: string,
  content: string
): Promise<Blog | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return null;

  const { data, error } = await supabase
    .from("blogs")
    .update({ title, content })
    .eq("id", blogId)
    .eq("user_id", user.id)
    .select();
  if (error) console.error("Error updating blog:", error.message);
  return data?.[0] || null;
}

export async function deleteBlog(blogId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return null;

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", blogId)
    .eq("user_id", user.id);
  if (error) console.error("Error creating blog:", error.message);
  else return true;
}
