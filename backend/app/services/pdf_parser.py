"""
PDF Parser Service
Extracts text from PDF files using PyMuPDF
"""

import fitz  # PyMuPDF
from typing import List, Dict, Tuple
import logging

logger = logging.getLogger(__name__)


class PDFParser:
    """Service for parsing PDF documents and extracting text"""

    @staticmethod
    def extract_text_from_pdf(file_path: str) -> Tuple[str, List[Dict]]:
        """
        Extract text and metadata from PDF file.
        
        Args:
            file_path: Path to the PDF file
            
        Returns:
            Tuple of (full_text, page_data)
            - full_text: Complete cleaned text from all pages
            - page_data: List of dicts with page-wise information
        """
        try:
            doc = fitz.open(file_path)
            full_text = ""
            page_data = []

            for page_num, page in enumerate(doc, 1):
                # Extract text
                text = page.get_text()
                
                # Clean text
                cleaned_text = PDFParser._clean_text(text)
                
                if cleaned_text.strip():
                    full_text += cleaned_text + "\n\n"
                    page_data.append({
                        "page_number": page_num,
                        "text": cleaned_text,
                        "word_count": len(cleaned_text.split())
                    })

            doc.close()

            # Final cleanup
            full_text = full_text.strip()

            logger.info(f"Successfully parsed PDF: {len(page_data)} pages, {len(full_text)} characters")
            return full_text, page_data

        except Exception as e:
            logger.error(f"Error parsing PDF: {str(e)}")
            raise

    @staticmethod
    def _clean_text(text: str) -> str:
        """
        Clean extracted text by removing extra whitespace and formatting issues.
        
        Args:
            text: Raw text from PDF
            
        Returns:
            Cleaned text
        """
        # Remove excessive whitespace
        lines = text.split('\n')
        cleaned_lines = [line.strip() for line in lines if line.strip()]
        cleaned_text = ' '.join(cleaned_lines)
        
        # Normalize spaces
        while '  ' in cleaned_text:
            cleaned_text = cleaned_text.replace('  ', ' ')
        
        return cleaned_text

    @staticmethod
    def extract_text_optimized(file_path: str, max_chars: int = 50000) -> str:
        """
        Extract text with a character limit for faster AI processing.
        
        Args:
            file_path: Path to the PDF file
            max_chars: Maximum characters to extract
            
        Returns:
            Extracted and cleaned text
        """
        full_text, _ = PDFParser.extract_text_from_pdf(file_path)
        
        # If text is too long, take the first max_chars
        if len(full_text) > max_chars:
            logger.warning(f"PDF text truncated from {len(full_text)} to {max_chars} characters")
            full_text = full_text[:max_chars]
        
        return full_text
