# script to test running the server locally
import requests
import json

todo = {'id':None,'title':"Wake up", 'desc':"Get out of bed!"}
print(todo)
res = requests.post('http://127.0.0.1:8000/todo/',data=json.dumps(todo))
print(res.json())