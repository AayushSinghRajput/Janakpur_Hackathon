# backend_fastapi/core/classify.py

from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

model = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

valid_labels = [
    "harassment",
    "domestic_violence",
    "sexual_violence",
    "cyber_violence",
    "stalking_and_threats",
    "gender_discrimination"
]

classification_prompt = PromptTemplate(
    template="""
You are a Nepali legal classifier.  
Classify the text into exactly ONE of the following categories:

harassment
domestic_violence
sexual_violence
cyber_violence
stalking_and_threats
gender_discrimination

Rules:
- Return ONLY the category name.
- No explanation. No extra text.
- Output must be lowercase.

Text: "{text}"

Your classification:
""",
    input_variables=["text"]
)

def classify_single_label(text: str) -> str:
    """Classify text into one legal category"""

    prompt = classification_prompt.format(text=text)
    result = model.invoke(prompt).content.strip().lower()

    # sanitize model output
    if result not in valid_labels:
        # fallback category (or choose best match logic)
        result = "harassment"

    return result
