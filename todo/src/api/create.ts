"use server"
import { Todo } from '@/utils/types'

// Create endpoint
 export default async function create(todo: Todo) {
    const rawResponse = await fetch(`${process.env.FASTAPI_URL}/todo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
    const res_json = await rawResponse.json()
    return res_json
}