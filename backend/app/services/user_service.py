from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User, CandidateProfile
from app.schemas.user import UserCreate, ProfileUpdate
from typing import Optional

class UserService:
    @staticmethod
    async def get_by_email(db: AsyncSession | None, email: str) -> Optional[User]:
        if not db:
            return None
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    @staticmethod
    async def create_user(db: AsyncSession | None, user_in: UserCreate) -> User:
        user = User(email=user_in.email, full_name=user_in.full_name)
        if not db:
            user.id = "mock-user-123"
            return user
        try:
            db.add(user)
            await db.commit()
            await db.refresh(user)
        except Exception:
            await db.rollback()
            user.id = "mock-user-123"
        return user

    @staticmethod
    async def get_candidate_profile(db: AsyncSession | None, user_id: str) -> Optional[CandidateProfile]:
        if not db:
            return CandidateProfile(user_id=user_id, target_role="Frontend Engineer", bio="Aspiring engineer")
        try:
            result = await db.execute(select(CandidateProfile).where(CandidateProfile.user_id == user_id))
            return result.scalar_one_or_none()
        except Exception:
            return CandidateProfile(user_id=user_id, target_role="Frontend Engineer", bio="Aspiring engineer")

    @staticmethod
    async def update_candidate_profile(db: AsyncSession | None, user_id: str, profile_in: ProfileUpdate) -> CandidateProfile:
        if not db:
            return CandidateProfile(user_id=user_id, target_role=profile_in.target_role, bio=profile_in.bio)
        try:
            result = await db.execute(select(CandidateProfile).where(CandidateProfile.user_id == user_id))
            profile = result.scalar_one_or_none()
            if not profile:
                profile = CandidateProfile(user_id=user_id, target_role=profile_in.target_role, bio=profile_in.bio)
                db.add(profile)
            else:
                if profile_in.target_role is not None:
                    profile.target_role = profile_in.target_role
                if profile_in.bio is not None:
                    profile.bio = profile_in.bio
            await db.commit()
            await db.refresh(profile)
            return profile
        except Exception:
            await db.rollback()
            return CandidateProfile(user_id=user_id, target_role=profile_in.target_role, bio=profile_in.bio)

user_service = UserService()

