# app/core/chat.py

import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

load_dotenv()

# --------------------------
# Load LLM
# --------------------------
model = ChatGoogleGenerativeAI(model="gemini-2.5-flash",
                               max_retries=0)

# --------------------------
# Load embeddings + FAISS DB
# --------------------------
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

vector_store = FAISS.load_local(
    "core/faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)

retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}
)

# --------------------------
# Prompt Template
from langchain_core.prompts import PromptTemplate

prompt = PromptTemplate(
    template="""
You are a friendly, supportive, and knowledgeable legal assistant for Nepal.

Follow these rules carefully:

1. If the user greets you with hi, hello, namaste, etc., respond with a warm and simple greeting.
2. Use the retrieved context to answer legal questions. If the context is empty or incomplete, answer using your own understanding of Nepali law and common practices.
3. Always keep the conversation relevant to Nepal: Nepali laws, culture, and situations.
4. Keep your tone supportive, respectful, and helpful.
5. If the user's message seems emotional, acknowledge their feelings before giving legal guidance.
6. Do not use markdown, bold text, or special formatting.
7. Do not use line breaks such as \n or \n\n. Respond in normal plain English sentences.
8. Keep answers short and clear unless the question requires detail.

Conversation Data:

Chat History: {history}
Retrieved Context: {context}
User Message: {question}

Give a clear, empathetic, and accurate answer in normal English.
""",
    input_variables=["history", "context", "question"]
)


# --------------------------
# In-memory Chat History
# You can replace this with DB later
# --------------------------
chat_sessions = {}     # {session_id: [{"role": "user/ai", "message": ""}]}


def get_history_text(session_id: str):
    """Convert history list into prompt text."""
    history = chat_sessions.get(session_id, [])
    return "\n".join([f"{h['role']}: {h['message']}" for h in history])


def ask_chatbot(session_id: str, question: str) -> str:
    """Main Chat Function With Memory"""

    # Create session if not exists
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    # Retrieve context from vector DB
    docs = retriever.invoke(question)
    context = "\n\n".join([d.page_content for d in docs])

    # Prepare history text
    history_text = get_history_text(session_id)

    # Build final prompt
    final_prompt = prompt.invoke({
        "history": history_text,
        "context": context,
        "question": question
    })

    # Call LLM
    answer = model.invoke(final_prompt).content

    # Save conversation
    chat_sessions[session_id].append({"role": "user", "message": question})
    chat_sessions[session_id].append({"role": "ai", "message": answer})

    return answer
