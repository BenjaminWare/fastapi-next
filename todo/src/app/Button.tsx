"use client"

import update from '@/api/update'
import { Todo } from '@/utils/types'
import { LoaderCircle } from 'lucide-react'
// Button that hits the update todo endpoint
import React, { useState } from 'react'

export default function Button(props:{variant:'Delete' | 'Update' | 'Create', setHasChanged:React.Dispatch<React.SetStateAction<boolean>>,hasChanged:boolean,todo:Todo,handler:Function}) {

    const color_map = {'Delete':'bg-red-600','Update':'bg-blue-600','Create':'bg-green-600'}
    const {setHasChanged,hasChanged,todo,handler} = props
    const [loading,setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        await handler(todo)
        setLoading(false)
        setHasChanged(false)
    }
  return (
    <button className={`flex gap-2 justify-center items-center mx-auto ${color_map[props.variant]} text-white rounded-md p-2 w-32 ${((props.variant !== 'Delete') && !hasChanged) || loading ? 'opacity-50' : ''}`} disabled={(props.variant !== 'Delete') && !hasChanged} onClick={handleClick}>
        {loading && <LoaderCircle className='w-4 h-4 animate-spin'/>}
        {props.variant}
        </button>

  )
}
