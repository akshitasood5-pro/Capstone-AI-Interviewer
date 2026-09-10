from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.resume import ResumeAnalysisReport
from app.schemas.common import APIResponse, APIError
from app.services.resume_service import analyze_resume
from app.core.database import get_db
from app.services.ai_service import ai_service
from app.models.resume import ResumeReport

router = APIRouter()

@router.post("/analyze", response_model=APIResponse[ResumeAnalysisReport])
async def upload_resume(
    file: UploadFile = File(...),
    target_role: str | None = Form(None),
    db: AsyncSession | None = Depends(get_db)
):
    try:
        content = await file.read()
        if not file.filename.endswith('.pdf'):
            return APIResponse(error=APIError(message="Only PDF files are supported"))
            
        report = await analyze_resume(content, target_role, user_id=None, db=db)
        return APIResponse(data=report)
    except Exception as e:
        return APIResponse(error=APIError(message=str(e)))

@router.get("/reports/{report_id}", response_model=APIResponse[ResumeAnalysisReport])
async def get_report(report_id: str, db: AsyncSession = Depends(get_db)):
    if not db:
        return APIResponse(error=APIError(message="Database not configured"))
    report = await db.get(ResumeReport, report_id)
    if not report:
        return APIResponse(error=APIError(message="Report not found"))
    return APIResponse(data=ResumeAnalysisReport(**report.report_data))

@router.get("/sample", response_model=APIResponse[ResumeAnalysisReport])
async def get_sample_report():
    mock_data = ai_service.get_mock_fallback("Software Engineer")
    return APIResponse(data=ResumeAnalysisReport(**mock_data))
