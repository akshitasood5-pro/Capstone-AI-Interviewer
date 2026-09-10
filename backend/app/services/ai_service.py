import json
import google.generativeai as genai
from groq import Groq
from app.core.config import settings

class AIService:
    def __init__(self):
        self.gemini_configured = bool(settings.GEMINI_API_KEY)
        if self.gemini_configured:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')
        
        self.groq_configured = bool(settings.GROQ_API_KEY)
        if self.groq_configured:
            self.groq_client = Groq(api_key=settings.GROQ_API_KEY)

    def get_prompt(self, text: str, target_role: str | None) -> str:
        role_context = f" targeting the role of {target_role}" if target_role else ""
        return f"""
        Act as an expert ATS system and career coach. Analyze the following resume{role_context}.
        Score it on 4 pillars (Impact, Technical Depth, ATS Compatibility, Structure).
        Extract skills, identify strengths and weaknesses, and provide actionable before/after bullet improvements.
        
        Output valid JSON matching this schema:
        {{
            "overall_score": int (0-100),
            "grade": "string (A+/A/A-/B+/.../F)",
            "summary": "string",
            "category_scores": [
                {{"category_name": "string", "score": int, "weight": float, "feedback_text": "string"}}
            ],
            "skills": [
                {{"category": "string (languages/frameworks/tools/soft_skills)", "skills": ["string"]}}
            ],
            "strengths": ["string"],
            "weaknesses": ["string"],
            "improvements": [
                {{"section": "string", "issue": "string", "before_text": "string", "suggested_text": "string", "priority": "high/medium/low"}}
            ],
            "recommended_interview_topics": ["string"]
        }}

        Resume text:
        {text}
        """

    def analyze_resume(self, text: str, target_role: str | None) -> dict:
        prompt = self.get_prompt(text, target_role)
        
        if self.gemini_configured:
            try:
                response = self.gemini_model.generate_content(prompt)
                try:
                    # Strip markdown json blocks if present
                    text_resp = response.text
                    if text_resp.startswith("```json"):
                        text_resp = text_resp[7:-3]
                    elif text_resp.startswith("```"):
                        text_resp = text_resp[3:-3]
                    return json.loads(text_resp)
                except json.JSONDecodeError:
                    pass # Fallback to groq
            except Exception:
                pass # Fallback to groq
                
        if self.groq_configured:
            try:
                completion = self.groq_client.chat.completions.create(
                    model="llama3-8b-8192",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.2,
                    response_format={"type": "json_object"}
                )
                return json.loads(completion.choices[0].message.content)
            except Exception:
                pass # Fallback to mock

        return self.get_mock_fallback(target_role)

    def get_mock_fallback(self, target_role: str | None) -> dict:
        return {
            "overall_score": 85,
            "grade": "B+",
            "summary": f"Strong candidate for {target_role or 'the role'}, but could improve quantifiable metrics.",
            "category_scores": [
                {"category_name": "Impact", "score": 80, "weight": 0.3, "feedback_text": "Good experience, but lacks metrics."},
                {"category_name": "Technical Depth", "score": 90, "weight": 0.3, "feedback_text": "Strong technical skills listed."},
                {"category_name": "ATS Compatibility", "score": 85, "weight": 0.2, "feedback_text": "Standard formatting, easily parsed."},
                {"category_name": "Structure", "score": 85, "weight": 0.2, "feedback_text": "Clear sections, consistent bullet points."}
            ],
            "skills": [
                {"category": "languages", "skills": ["Python", "JavaScript"]},
                {"category": "frameworks", "skills": ["FastAPI", "React"]}
            ],
            "strengths": ["Clear progression in roles", "Relevant technical stack"],
            "weaknesses": ["Missing quantifiable achievements in recent roles"],
            "improvements": [
                {
                    "section": "Experience",
                    "issue": "Vague responsibility",
                    "before_text": "Developed backend APIs",
                    "suggested_text": "Developed 15+ RESTful APIs using FastAPI, improving response time by 20%",
                    "priority": "high"
                }
            ],
            "recommended_interview_topics": ["System Design", "FastAPI Internals"]
        }

ai_service = AIService()
