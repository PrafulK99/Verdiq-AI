from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from typing import List
import uuid
from services.pdf_parser import PDFParser
from services.claim_extractor import ClaimExtractor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Verdiq AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

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

@app.post("/api/upload")
async def upload_esg_document(file: UploadFile = File(...)):
    """
    Upload and process an ESG/CSR document.
    
    - Accepts PDF files
    - Extracts text using PyMuPDF
    - Extracts sustainability claims using AI
    - Returns structured claims as JSON
    """
    try:
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are supported")
        
        if file.size == 0:
            raise HTTPException(status_code=400, detail="File is empty")
        
        # Generate unique filename
        file_id = str(uuid.uuid4())
        file_ext = os.path.splitext(file.filename)[1]
        saved_filename = f"{file_id}{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, saved_filename)
        
        # Save uploaded file
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
        
        logger.info(f"Saved uploaded file: {saved_filename}")
        
        # Parse PDF
        try:
            full_text, page_data = PDFParser.extract_text_from_pdf(file_path)
        except Exception as e:
            os.remove(file_path)  # Clean up
            logger.error(f"PDF parsing failed: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Failed to parse PDF: {str(e)}")
        
        if not full_text.strip():
            os.remove(file_path)  # Clean up
            raise HTTPException(status_code=400, detail="No text could be extracted from PDF")
        
        # Extract claims using AI
        try:
            claims = ClaimExtractor.extract_claims(full_text)
        except Exception as e:
            os.remove(file_path)  # Clean up
            logger.error(f"Claim extraction failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to extract claims: {str(e)}")
        
        # Prepare response
        response = {
            "success": True,
            "file_name": file.filename,
            "file_id": file_id,
            "pages_parsed": len(page_data),
            "total_characters": len(full_text),
            "claims_extracted": len(claims),
            "claims": claims,
            "metadata": {
                "file_name": file.filename,
                "file_size": file.size,
                "pages": len(page_data)
            }
        }
        
        logger.info(f"Successfully processed document {file_id}: {len(claims)} claims extracted")
        
        # Clean up uploaded file (optional - remove for archival)
        os.remove(file_path)
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in upload endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))