"use server"
import { Todo } from '@/utils/types'

// Update endpoint
 export default async function update(todo: Todo) {
    const rawResponse = await fetch(`${process.env.FASTAPI_URL}/todo/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
    const res_json = await rawResponse.json()
    return res_json
}