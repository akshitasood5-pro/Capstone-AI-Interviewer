import io
from pypdf import PdfReader
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.resume import ResumeAnalysisReport
from app.services.ai_service import ai_service
from app.models.resume import ResumeReport

async def extract_text_from_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

async def analyze_resume(file_bytes: bytes, target_role: str | None, user_id: str | None, db: AsyncSession | None) -> ResumeAnalysisReport:
    text = await extract_text_from_pdf(file_bytes)
    result_dict = ai_service.analyze_resume(text, target_role)
    
    report = ResumeAnalysisReport(**result_dict)
    
    if db:
        try:
            db_report = ResumeReport(
                user_id=user_id,
                target_role=target_role,
                report_data=report.model_dump()
            )
            db.add(db_report)
            await db.commit()
        except Exception as e:
            await db.rollback()
            # Log and continue so the candidate still receives their report
            print(f"Warning: could not persist report to DB: {e}")
        
    return report
