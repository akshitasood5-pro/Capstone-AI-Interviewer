from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional
from app.core.database import get_db
from app.schemas.common import APIResponse, APIError
from app.schemas.user import ProfileUpdate
from app.services.user_service import user_service

router = APIRouter()

class ProfileResponse(BaseModel):
    user_id: str
    target_role: Optional[str] = None
    bio: Optional[str] = None

@router.get("/profile", response_model=APIResponse[ProfileResponse])
async def get_profile(user_id: str = "mock-user-123", db: AsyncSession = Depends(get_db)):
    try:
        profile = await user_service.get_candidate_profile(db, user_id)
        if not profile:
            return APIResponse(data=ProfileResponse(user_id=user_id, target_role="Frontend Engineer", bio="Candidate preparing for tech interviews"))
        return APIResponse(data=ProfileResponse(user_id=profile.user_id, target_role=profile.target_role, bio=profile.bio))
    except Exception as e:
        return APIResponse(error=APIError(message=str(e)))

@router.put("/profile", response_model=APIResponse[ProfileResponse])
async def update_profile(profile_in: ProfileUpdate, user_id: str = "mock-user-123", db: AsyncSession = Depends(get_db)):
    try:
        profile = await user_service.update_candidate_profile(db, user_id, profile_in)
        return APIResponse(data=ProfileResponse(user_id=profile.user_id, target_role=profile.target_role, bio=profile.bio))
    except Exception as e:
        return APIResponse(error=APIError(message=str(e)))

