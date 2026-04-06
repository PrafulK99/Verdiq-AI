# Verdiq AI - ESG Claim Extraction Feature Setup

## 🚀 Quick Start Guide

This document outlines how to set up and run the ESG Document Upload + Claim Extraction Pipeline.

---

## 📋 Prerequisites

- **Python 3.8+** (Backend)
- **Node.js 16+** (Frontend)
- **OpenAI API Key** (for AI claim extraction)
- **pip** (Python package manager)
- **npm** (Node package manager)

---

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-key-here
```

### 5. Run Backend Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

---

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Frontend will be available at: **http://localhost:5173**

---

## 📚 API Endpoints

### POST `/api/upload`
Upload a CSR PDF and extract sustainability claims.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: PDF file

**Response:**
```json
{
  "success": true,
  "file_name": "report.pdf",
  "file_id": "uuid-string",
  "pages_parsed": 15,
  "total_characters": 45000,
  "claims_extracted": 12,
  "claims": [
    {
      "claim_text": "We reduced carbon emissions by 25% in 2023",
      "theme": "emissions",
      "confidence": 0.92,
      "metrics": "25% reduction in 2023"
    }
  ],
  "metadata": {
    "file_name": "report.pdf",
    "file_size": 2048576,
    "pages": 15
  }
}
```

### GET `/health`
Health check endpoint.

---

## 🧪 Testing the Feature

### Using curl:
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@/path/to/your/csr-report.pdf"
```

### Using the Frontend UI:
1. Open http://localhost:5173 in your browser
2. Drag and drop a PDF or click to upload
3. Wait for processing
4. View extracted claims with confidence scores and themes

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py                 # FastAPI app and routes
│   ├── services/
│   │   ├── pdf_parser.py      # PDF text extraction
│   │   └── claim_extractor.py # AI claim extraction
│   ├── utils/
│   └── uploads/                # Temporary PDF storage
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
└── venv/                      # Virtual environment

frontend/
├── src/
│   ├── App.tsx                # Main app component
│   ├── components/
│   │   ├── UploadComponent.tsx    # Drag & drop upload
│   │   └── ClaimsDisplay.tsx      # Claims visualization
│   ├── index.css              # Tailwind styles
│   └── main.tsx               # React entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎯 Feature Overview

### 1. Upload Component
- **Drag & drop** PDF upload
- **Progress tracking**
- **File validation** (PDF only, max 50MB)
- **Error handling**

### 2. Claims Extraction
- **AI-powered analysis** using OpenAI GPT-3.5-turbo
- **JSON structured output**
- **Confidence scoring** (0-1 scale)
- **Theme categorization** (climate, energy, emissions, etc.)
- **Greenwashing detection** - filters generic marketing language

### 3. Display Component
- **Glassmorphism UI** with dark theme
- **Theme-colored badges** for ESG categories
- **Confidence percentage** indicators
- **Summary statistics** by theme
- **Average confidence** calculation

---

## ⚙️ Configuration

### Claim Extraction Settings
Edit `app/services/claim_extractor.py`:
- `temperature=0.3` - Controls AI creativity (lower = more consistent)
- `max_tokens=2000` - Limits response length
- Confidence thresholds in `_validate_claims()` method

### PDF Processing
Edit `app/services/pdf_parser.py`:
- `max_chars=50000` - Character limit for AI processing
- Text cleaning and normalization logic

---

## 🐛 Troubleshooting

### OpenAI API Errors
- Check `.env` file has valid `OPENAI_API_KEY`
- Ensure API key has active quota
- Try using `gpt-3.5-turbo` model

### PDF Parsing Errors
- Ensure PDF is not password protected
- Check file is not corrupted
- Try with different PDF file

### CORS Errors
- Verify frontend URL in `CORSMiddleware` config
- Check both frontend and backend are running
- Clear browser cache

### Port Already in Use
- Change port: `uvicorn app.main:app --port 8001`
- Update frontend API URL accordingly

---

## 📊 Example CSR Documents

For testing, you can use publicly available CSR reports from:
- Tesla Impact Report
- Patagonia Environmental Report
- Microsoft Sustainability Report
- Unilever Sustainable Living Plan

---

## 🔐 Security Notes

- API keys are NOT committed to git (.env is in .gitignore)
- PDFs are temporarily stored and deleted after processing
- Use environment variables for all sensitive data
- Validate file inputs on both frontend and backend

---

## 📝 Next Steps

After setting up the feature, you can:
1. **Add more AI models** (Gemini, Claude, etc.)
2. **Implement contradiction detection** between claims
3. **Add historical tracking** of documents
4. **Create greenwashing risk scoring**
5. **Deploy to production** (Docker, cloud services)

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error logs in terminal
3. Verify all dependencies are installed
4. Check API key configuration

---

**Happy ESG auditing! 🌱**
