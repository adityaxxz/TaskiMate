from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import APIKeyHeader
import time
import jwt
import httpx
from .db import get_database, get_next_sequence, utc_now
from .config import Config
from .schemas import GoogleLoginRequest

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/google-login")
def google_login(data: GoogleLoginRequest, db = Depends(get_database)):
    try:
        response = httpx.get(
            "https://oauth2.googleapis.com/tokeninfo",
            params={"id_token": data.id_token},
            timeout=10.0
        )
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid Google token")
        payload = response.json()
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(status_code=400, detail=f"Failed to verify Google token: {str(e)}")

    # Check audience matches our client ID
    if payload.get("aud") != Config.GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=400, detail="Invalid token audience")

    # Get email and check
    email = payload.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email not found in token")

    # Find or create user
    user = db["users"].find_one({"email": email})
    if not user:
        new_id = get_next_sequence(db, "users")
        db["users"].insert_one({"id": new_id, "email": email, "created_at": utc_now()})
        user = db["users"].find_one({"id": new_id})

    # Generate JWT
    token_payload = {
        "sub": str(user["id"]), 
        "iat": int(time.time()), 
        "exp": int(time.time()) + Config.JWT_TTL_SECONDS
    }
    token = jwt.encode(token_payload, Config.JWT_SECRET, algorithm=Config.JWT_ALG)

    return {"token": token, "user_id": user["id"]}




# Authentication dependency

def get_current_user(authorization = Security(APIKeyHeader(name="Authorization")), db = Depends(get_database)):
    """Simple authentication - expects 'Bearer <token>' format"""
    try:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
        
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, Config.JWT_SECRET, algorithms=[Config.JWT_ALG])
        user_id = int(payload.get("sub"))

    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    except Exception:
        raise HTTPException(status_code=401, detail="Authentication failed")

    user = db["users"].find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


@router.get("/me")
def get_current_user_info(user = Depends(get_current_user)):
    return {
        "id": user["id"],
        "email": user["email"],
        "created_at": user.get("created_at"),
    }


@router.post("/logout")
def logout_user(user = Depends(get_current_user), db = Depends(get_database)):
    user_id = int(user["id"])
    db["user_super_toggle"].delete_one({"user_id": user_id})
    
    return {"message": "Logged out successfully"}