"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SingleTodo = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    router.push("http://localhost:3000/new-todo");
  }, []);
  const router = useRouter();
  return;
};

export default SingleTodo;
