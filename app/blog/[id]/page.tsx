 export const runtime = 'edge'
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Blog, fetchBlog } from "@/app/lib/actions/blog-actions";
import Navbar from "@/components/ui/navbar";

export default function BlogPostPage() {
  const params = useParams();
  const blogId = params.id as string;

  const [blog, setBlog] = useState<Blog>();
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlog(blogId);
      if (data.success) {
        setBlog(data.data);
        return;
      }
      setMessage(data.message);
    };
    fetchData();
  }, [blogId]);
  return (
    <div className="bg-gray-50">
      <Navbar title={"Blog"} />
      <div className="text-black mx-auto w-auto max-w-7xl mt-5">
        {blog ? (
          <article>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              {blog.title}
            </h1>
            <div className="text-gray-500 mb-4">
              <p className="">Author: {blog.authors.display_name}</p>
              <p className="text-sm">Created: {`${blog.created_at}`}</p>
            </div>
            <div className="text-gray-600">{blog.content}</div>
          </article>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}
