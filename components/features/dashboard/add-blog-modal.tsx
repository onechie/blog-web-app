"use client"
import { createBlog, updateBlog } from "@/app/lib/actions/blog-actions";
import Button from "@/components/ui/button";
type BlogModal = {
  action: "add" | "edit";
  show: boolean;
  id?: string | null;
  title: string;
  set_title: (title: string) => void;
  content: string;
  set_content: (title: string) => void;
  set_modal: (show: boolean) => void;
  blogs: any[];
  set_blogs: (blogs: any[]) => void;
};

export default function AddBlogModal(props: BlogModal) {
  const {
    action,
    show,
    id,
    title,
    set_title,
    content,
    set_content,
    set_modal,
    blogs,
    set_blogs,
  } = props;
  async function handleCreate() {
    const newBlog = await createBlog(title, content);

    if (newBlog) {
      set_blogs([...blogs, newBlog]);
      set_title("");
      set_content("");
      set_modal(false);
    }
  }

  async function handleUpdate() {
    if (id) {
      const updatedBlog = await updateBlog(id, title, content);
      if (updatedBlog)
        set_blogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
      set_title("");
      set_content("");
      set_modal(false);
    }
  }
  function handleClose() {
    set_title("");
    set_content("");
    set_modal(false);
  }

  return (
    <div
      className={`${
        show ? "" : "hidden"
      } fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-gray-900 bg-opacity-50 p-5`}
    >
      <div
        className={`flex flex-col px-5 gap-3  bg-gray-50 p-5 flex-1 max-w-7xl`}
      >
        <input
          className="p-2 border rounded"
          value={title}
          onChange={(e) => set_title(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="p-2 border rounded min-h-96"
          value={content}
          onChange={(e) => set_content(e.target.value)}
          placeholder="Content"
        ></textarea>
        <div className="flex justify-end gap-3">
          {action === "edit" ? (
            <Button text="Update" action={handleUpdate}></Button>
          ) : (
            <Button text="Publish" action={handleCreate}></Button>
          )}
          <Button variant="light" text="Close" action={handleClose}></Button>
        </div>
      </div>
    </div>
  );
}
