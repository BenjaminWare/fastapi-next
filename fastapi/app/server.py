from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from .engine import get_session,create_db_and_tables
from .my_types import TodoBase,TodoUpdate
from contextlib import asynccontextmanager



SessionDep = Annotated[Session, Depends(get_session)]
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("RUNNING LIFESPAN START")
    create_db_and_tables()
    yield
    print("RUNNING LIFESPAN END")
    # Shutdown

app = FastAPI(lifespan=lifespan)






@app.post("/todo/", response_model=TodoBase)
def create_todo(todo: TodoBase, session: SessionDep):
    db_todo = TodoBase.model_validate(todo)
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    return db_todo


@app.get("/todo/", response_model=list[TodoBase])
def read_todos(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    todoes = session.exec(select(TodoBase).offset(offset).limit(limit)).all()
    return todoes


@app.get("/todo/{todo_id}", response_model=TodoBase)
def read_todo(todo_id: int, session: SessionDep):
    todo = session.get(TodoBase, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="todo not found")
    return todo


@app.patch("/todo/{todo_id}", response_model=TodoBase)
def update_todo(todo_id: int, todo: TodoUpdate, session: SessionDep):
    todo_db = session.get(TodoBase, todo_id)
    if not todo_db:
        raise HTTPException(status_code=404, detail="todo not found")
    todo_data = todo.model_dump(exclude_unset=True)
    todo_db.sqlmodel_update(todo_data)
    session.add(todo_db)
    session.commit()
    session.refresh(todo_db)
    return todo_db


@app.delete("/todo/{todo_id}")
def delete_todo(todo_id: int, session: SessionDep):
    todo_db = session.get(TodoBase, todo_id)
    if not todo_db:
        raise HTTPException(status_code=404, detail="todo_db not found")
    session.delete(todo_db)
    session.commit()
    return {"ok": True}