from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None

class ProfileUpdate(BaseModel):
    target_role: Optional[str] = None
    bio: Optional[str] = None
