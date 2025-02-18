"use client";
import Link from "next/link";
type BlogCard = {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: Date;
  updated_at: Date;
};
export default function BlogCard(props: BlogCard) {
  const { id, title, content, author, created_at, updated_at } = props;
  return (
    <Link
      href={`/blog/${id}`}
      className="group border rounded h-80 flex-1 flex flex-col justify-between bg-white hover:scale-105 transition duration-200 hover:shadow-md hover:cursor-pointer hover:bg-gray-800"
    >
      <h1 className="truncate mx-5 py-2 border-b text-gray-800 group-hover:text-gray-100">
        {title}
      </h1>
      <p className="truncate text-wrap flex-1 mx-5 my-2 text-gray-600 text-sm group-hover:text-gray-300">
        {content}
      </p>
      <p className="truncate mx-5 py-3 border-t text-xs text-gray-800 group-hover:text-gray-100">
        {author}
      </p>
    </Link>
  );
}
