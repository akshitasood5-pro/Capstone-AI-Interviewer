from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional
from app.core.database import get_db
from app.schemas.common import APIResponse, APIError
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import user_service

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    token: str
    user: UserResponse

@router.post("/signup", response_model=APIResponse[UserResponse])
async def signup(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        user = await user_service.create_user(db, user_in)
        return APIResponse(data=UserResponse(id=user.id, email=user.email, full_name=user.full_name))
    except Exception as e:
        return APIResponse(error=APIError(message=str(e)))

@router.post("/login", response_model=APIResponse[AuthResponse])
async def login(login_in: LoginRequest, db: AsyncSession = Depends(get_db)):
    try:
        user = await user_service.get_by_email(db, login_in.email)
        if not user:
            # Create or return mock session for quick demo/dev
            user_resp = UserResponse(id="mock-user-123", email=login_in.email, full_name="Candidate User")
        else:
            user_resp = UserResponse(id=user.id, email=user.email, full_name=user.full_name)
        
        return APIResponse(data=AuthResponse(
            token="demo-session-token-prep-pilot",
            user=user_resp
        ))
    except Exception as e:
        return APIResponse(error=APIError(message=str(e)))

@router.get("/me", response_model=APIResponse[UserResponse])
async def get_me():
    return APIResponse(data=UserResponse(
        id="mock-user-123",
        email="candidate@preppilot.com",
        full_name="Candidate Demo"
    ))

