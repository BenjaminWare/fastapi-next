'use client'
import React, { Children, ComponentType, ElementType, ReactElement, ReactNode, useState } from 'react'
import UpdateButton from './Button'
import { ButtonAndHandler, Todo } from '@/utils/types'
import Button from './Button'

export default function TodoCard(props: {setDesc:(desc:string) => void, setTitle: (title:string) => void,todo:Todo,Buttons:ButtonAndHandler[]}) {
    const {title,desc} = props.todo
    const {setDesc,setTitle} = props
    const [hasChanged,setHasChanged] = useState(false)

  return (
    <div className="rounded-md p-8 shadow border border-grey-500 flex flex-col gap-2 max-w-sm ">
        <input className='text-xl' type="text" onChange={(e) => 
          {
            setTitle(e.target.value)
            setHasChanged(true)

          }} value={title}/>
        <textarea placeholder="Description of your todo..." className='text-md min-h-36' name="desc" id="desc" onChange={(e) => {
          
          setDesc(e.target.value)
          setHasChanged(true)
          
          }} value={desc}></textarea>
        <div className='flex flex-row'>
        {props.Buttons.map((But,i) => {        
          return <Button key={i} variant={But.variant} setHasChanged={setHasChanged} hasChanged={hasChanged} handler={But.handler} todo={{"id":props.todo.id,'title':title,'desc':desc}} />})}
        </div>
    </div>
  )
}
