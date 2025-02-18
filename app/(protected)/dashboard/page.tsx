"use client";
import { useEffect, useState } from "react";
import { fetchBlogs, deleteBlog, Blog } from "@/app/lib/actions/blog-actions";
import Navbar from "@/components/ui/navbar";
import BlogCard from "@/components/features/dashboard/blog-card";
import Pagination from "@/components/ui/pagination";
import AddBlogModal from "@/components/features/dashboard/add-blog-modal";
import Button from "@/components/ui/button";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<"add" | "edit">("add");

  useEffect(() => {
    async function getUserBlogs() {
      const data = await fetchBlogs();
      setBlogs(data);
    }
    getUserBlogs();
  }, []);

  const lastIndex = currentPage * blogsPerPage;
  const firstIndex = lastIndex - blogsPerPage;
  const currentBlogs = blogs.slice(firstIndex, lastIndex);

  return (
    <div className="bg-gray-50">
      <Navbar title={"Dashboard"} />
      <div className="flex flex-col text-black mx-auto max-w-7xl py-3 gap-5 ">
        <AddBlogModal
          action={modalAction}
          show={showModal}
          id={editingId}
          title={title}
          set_title={setTitle}
          content={content}
          set_content={setContent}
          set_modal={setShowModal}
          blogs={blogs}
          set_blogs={setBlogs}
        />
        <div className="px-5">
          <Button
            size="long"
            text="Create Blog"
            action={() => {
              setModalAction("add");
              setShowModal(true);
            }}
          ></Button>
        </div>

        <div className="w-full grid gap-4 px-5">
          {currentBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              set_modal={setShowModal}
              set_modal_action={setModalAction}
              set_title={setTitle}
              set_content={setContent}
              set_id={setEditingId}
              blogs={blogs}
              set_blogs={setBlogs}
            />
          ))}
        </div>
        <Pagination
          items_per_page={blogsPerPage}
          items={blogs}
          page={currentPage}
          set_page={setCurrentPage}
        />
      </div>
    </div>
  );
}
