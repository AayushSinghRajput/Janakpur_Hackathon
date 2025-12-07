# # app/routers/home.py

# from fastapi import APIRouter
# from pydantic import BaseModel
# from core.chat import ask_legal_ai


# router = APIRouter()


# class QuestionRequest(BaseModel):
#     question: str


# @router.post("/ask")
# def ask_question(payload: QuestionRequest):
#     """API endpoint to ask legal questions"""
#     response = ask_legal_ai(payload.question)
#     return {"answer": response}


# app/routers/chat.py

from fastapi import APIRouter
from schemas.chat import ChatRequest, ChatResponse, ClassifyRequest, ClassifyResponse
from core.chat import ask_chatbot
from core.classifier import classify_single_label

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat_with_bot(payload: ChatRequest):
    answer = ask_chatbot(payload.session_id, payload.message)
    return ChatResponse(reply=answer)


@router.post("/classify", response_model=ClassifyResponse)
def classify_route(payload: ClassifyRequest):
    category = classify_single_label(payload.text)
    return ClassifyResponse(reply=category)