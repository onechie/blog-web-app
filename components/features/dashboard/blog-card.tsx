"use client";
import { deleteBlog } from "@/app/lib/actions/blog-actions";
import Button from "@/components/ui/button";
type BlogCard = {
  id: string;
  title: string;
  content: string;
  set_modal: (isVisible: boolean) => void;
  set_modal_action: (action: "add" | "edit") => void;
  set_title: (title: string) => void;
  set_content: (content: string) => void;
  set_id: (id: string) => void;
  blogs: any[];
  set_blogs: (blogs: any[]) => void;
};
export default function BlogCard(props: BlogCard) {
  const {
    id,
    title,
    content,
    set_modal,
    set_modal_action,
    set_title,
    set_content,
    set_id,
    blogs,
    set_blogs,
  } = props;

  const handleEdit = () => {
    set_title(title);
    set_content(content);
    set_id(id);
    set_modal_action("edit");
    set_modal(true);
  };

  async function handleDelete() {
    const success = await deleteBlog(id);
    if (success) {
      set_blogs(blogs.filter((blog) => blog.id !== id));
    }
  }

  return (
    <div className="border rounded h-80 flex-1 flex flex-col justify-between bg-white transition duration-200 hover:shadow-lg ">
      <div className="truncate mx-5 py-2 border-b text-gray-800">{title}</div>
      <p className="truncate text-wrap mx-5 flex-1 my-2 text-gray-600 text-sm">
        {content}
      </p>
      <div className="mx-5 py-3 border-t text-xs text-gray-800 flex gap-3">
        <Button text="Edit" action={handleEdit}></Button>
        <Button variant="light" text="Delete" action={handleDelete}></Button>
      </div>
    </div>
  );
}
