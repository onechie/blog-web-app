"use client";
import { useEffect, useState } from "react";
import { fetchPublicBlogs, Blog } from "@/app/lib/actions/blog-actions";
import Navbar from "@/components/ui/navbar";
import BlogCard from "@/components/features/blogs/blog-card";
import Pagination from "@/components/ui/pagination";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    async function getBlogs() {
      const data = await fetchPublicBlogs();
      setBlogs(data);
    }
    getBlogs();
  }, []);

  const lastIndex = currentPage * blogsPerPage;
  const firstIndex = lastIndex - blogsPerPage;
  const currentBlogs = blogs.slice(firstIndex, lastIndex);

  return (
    <div className="bg-gray-50">
      <Navbar title={"Blogs"} />
      <div className="text-black mx-auto w-auto max-w-7xl mt-5">
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 xl:px-0 mb-5">
          {currentBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              author={blog.authors.display_name || "Unknown"}
              updated_at={blog.updated_at}
              created_at={blog.created_at}
            ></BlogCard>
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
