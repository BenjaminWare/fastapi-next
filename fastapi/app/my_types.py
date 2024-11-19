from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

class TodoBase(SQLModel,table=True):
    id: int | None = Field(primary_key=True,default=None)
    title: str = Field(index=True)
    desc: str = Field(default=None, index=True)


class TodoUpdate(TodoBase):
    name: str | None = None
    age: int | None = None
    secret_name: str | None = None