from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Verdiq AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Verdiq AI backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/dashboard")
def get_dashboard():
    return {
        "company": "Demo Company",
        "risk_score": 78,
        "risk_level": "High",
        "contradictions": 4,
        "incidents": 2
    }