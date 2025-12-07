# app/schemas/chat.py

from pydantic import BaseModel
from typing import  Literal

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str


AllowedClass = Literal[
    "harassment",
    "domestic_violence",
    "sexual_violence",
    "cyber_violence",
    "stalking_and_threats",
    "gender_discrimination"
]

class ClassifyRequest(BaseModel):
    text: str

class ClassifyResponse(BaseModel):
    reply: AllowedClass