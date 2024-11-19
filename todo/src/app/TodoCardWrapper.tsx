"use client"

import React, { ElementType, useState } from 'react'
import TodoCard from './TodoCard'
import UpdateButton from './Button'
import { ButtonAndHandler, Todo } from '@/utils/types'
import update from '@/api/update'
import create from '@/api/create'
import deleteEndpoint from '@/api/delete'


export default function TodoCardWrapper(props:{todos:Todo[]}) {
    const [todos,setTodos] = useState<Todo[]>([...props.todos,{id:null,desc:"",title:"Your New Todo..."}])

    async function deleteTodo(todo:Todo) {
        await deleteEndpoint(todo)
        setTodos(old => old.filter(old => old.id != todo.id))
    }
    async function createTodo(todo:Todo) {
        const todo_res = await create(todo)
        // All update todos stay the same. todo_res is the create todo from the db now with an id so it can be updated, and the new object is so the next create exists
        setTodos(old => [...old.filter(past_todos => past_todos.id != null),todo_res,{id:null,desc:"",title:"Your New Todo..."}])
    }
    async function updateTodo(todo:Todo) {
        // The children state variables will update the todos directly so there is no setTodos needed here. BUG this could cause missed rerenders if todos are rendered
        await update(todo)
    }
    const handleTitleChange = (id:number | null,new_title:string) => {
        setTodos((todos) => todos.map(todo => todo.id === id ? {id:todo.id,desc:todo.desc,title:new_title} : todo))
    }
    const handleDescChange = (id:number | null,new_desc:string) => {
        setTodos((todos) => todos.map(todo => todo.id === id ? {id:todo.id,desc:new_desc,title:todo.title} : todo))
    }

    const createButtonState:ButtonAndHandler = {variant:'Create',handler:createTodo}
    const updateButtonState:ButtonAndHandler = {variant:'Update',handler:updateTodo}
    const deleteButtonState:ButtonAndHandler = {variant:'Delete',handler:deleteTodo}

  return (
    <>
     <div className="grid grid-cols-4 gap-4 m-4">{todos.map((todo) => {
        return <TodoCard key={todo.id} setTitle={(title:string) => handleTitleChange(todo.id,title)} setDesc={(desc:string) => handleDescChange(todo.id,desc)} todo={todo} Buttons={todo.id === null ? [createButtonState] :[updateButtonState,deleteButtonState]}/>
      })}
    
      </div>
      </>
  )
}
