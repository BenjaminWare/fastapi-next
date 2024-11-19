"use server"
import { Todo } from '@/utils/types'

// Create endpoint
 export default async function deleteEndpoint(todo: Todo) {
    const rawResponse = await fetch(`${process.env.FASTAPI_URL}/todo/${todo.id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    const res_json = await rawResponse.json()
    return res_json
}