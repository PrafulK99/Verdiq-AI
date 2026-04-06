"""
AI Claim Extractor Service
Uses OpenAI API to extract sustainability claims from text
"""

import json
import logging
from typing import List, Dict
import os
from openai import OpenAI

logger = logging.getLogger(__name__)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ClaimExtractor:
    """Service for extracting ESG and sustainability claims using AI"""

    SYSTEM_PROMPT = """You are an expert ESG analyst specializing in detecting greenwashing and extracting sustainability claims from Corporate Social Responsibility (CSR) reports.

Your task is to extract only MEANINGFUL and MEASURABLE sustainability claims from the provided text.

IMPORTANT GUIDELINES:
1. Ignore generic marketing language like "committed to sustainability" or "passionate about the environment"
2. Extract only claims that are:
   - Specific (e.g., "reduced emissions by 25%" vs "reduced emissions")
   - Measurable (have numbers or timeframes)
   - Material to ESG reporting
   - Verifiable

3. Valid themes: climate, energy, supply_chain, emissions, water, waste, labor, diversity, governance, ethics

4. Confidence scoring:
   - 0.9-1.0: Specific claim with clear metrics and verification potential
   - 0.7-0.89: Claim with metrics but some ambiguity
   - 0.5-0.69: Claim with context but weak metrics
   - Below 0.5: Generic or unverifiable

Return ONLY a JSON array with claim objects. Each claim must have: claim_text, theme, confidence."""

    @staticmethod
    def extract_claims(text: str) -> List[Dict]:
        """
        Extract sustainability claims from text using OpenAI.
        
        Args:
            text: Cleaned text from PDF
            
        Returns:
            List of extracted claims with structure:
            [
                {
                    "claim_text": str,
                    "theme": str,
                    "confidence": float (0-1),
                    "metrics": str or None
                }
            ]
        """
        try:
            if not text or len(text.strip()) < 50:
                logger.warning("Text is too short for claim extraction")
                return []

            # Prepare the user prompt
            user_prompt = f"""Extract ONLY meaningful and measurable sustainability claims from this text.
Return as a JSON array, no additional text.

Text:
{text[:8000]}"""

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": ClaimExtractor.SYSTEM_PROMPT
                    },
                    {
                        "role": "user",
                        "content": user_prompt
                    }
                ],
                temperature=0.3,
                max_tokens=2000
            )

            # Parse the response
            response_text = response.choices[0].message.content
            
            # Try to extract JSON from response
            try:
                claims = json.loads(response_text)
                    
                # Handle case where API returns {"claims": [...]}
                if isinstance(claims, dict):
                    if "claims" in claims:
                        claims = claims["claims"]
                    else:
                        claims = []
                        
            except json.JSONDecodeError:
                logger.warning(f"Failed to parse JSON response, attempting extraction: {response_text[:200]}")
                claims = []

            # Validate and filter claims
            validated_claims = ClaimExtractor._validate_claims(claims)
            
            logger.info(f"Extracted {len(validated_claims)} valid claims from text")
            return validated_claims

        except Exception as e:
            logger.error(f"Error extracting claims: {str(e)}")
            raise

    @staticmethod
    def _validate_claims(claims: List[Dict]) -> List[Dict]:
        """
        Validate extracted claims to ensure they meet quality standards.
        
        Args:
            claims: Raw claims from API
            
        Returns:
            Filtered and validated claims
        """
        valid_themes = {
            "climate", "energy", "supply_chain", "emissions", 
            "water", "waste", "labor", "diversity", "governance", "ethics"
        }
        
        validated = []
        
        for claim in claims:
            # Check required fields
            if not isinstance(claim, dict):
                continue
                
            claim_text = claim.get("claim_text", "").strip()
            theme = claim.get("theme", "").lower()
            confidence = claim.get("confidence", 0)
            
            # Validate fields
            if not claim_text or len(claim_text) < 10:
                continue
            
            if theme not in valid_themes:
                continue
            
            # Convert confidence to float and validate range
            try:
                confidence = float(confidence)
                if confidence < 0 or confidence > 1:
                    confidence = 0.5
            except (ValueError, TypeError):
                confidence = 0.5
            
            # Only keep claims with reasonable confidence
            if confidence < 0.4:
                continue
            
            validated.append({
                "claim_text": claim_text,
                "theme": theme,
                "confidence": round(confidence, 2),
                "metrics": claim.get("metrics")
            })
        
        return validated
