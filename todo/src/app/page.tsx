import Image from "next/image";
import TodoCard from "./TodoCard";
import { Todo } from "@/utils/types";
import UpdateButton from "./Button";
import TodoCardWrapper from "./TodoCardWrapper";

export default async function Home() {

  const url = process.env.FASTAPI_URL  + '/todo'
  const res = await fetch(url)
  const todos = await res.json() as unknown as Todo[]


  return (
    <TodoCardWrapper todos={todos} />
  )
}