"""
BOTPILOT AI — Backend API (FastAPI)

Handles:
  - POST /contact  → Receives contact form submissions & sends email notification
  - GET  /health   → Health check endpoint

Run:
  uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI(
    title="BOTPILOT AI API",
    description="Backend API for BOTPILOT AI website — handles contact form submissions.",
    version="1.0.0",
)

# ─── CORS ──────────────────────────────────────────────
# Allow all origins in development. In production, restrict to your domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["https://yourdomain.com"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Models ────────────────────────────────────────────
class ContactForm(BaseModel):
    """Schema for contact form submissions."""
    name: str
    email: str
    phone: str = ""
    message: str


# ─── Storage (file-based for simplicity) ──────────────
SUBMISSIONS_FILE = os.path.join(os.path.dirname(__file__), "submissions.json")

# ─── Email Config ──────────────────────────────────────
NOTIFY_EMAIL = "ahmad.dstech@gmail.com"
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")   # Set in .env or environment
SMTP_PASS = os.getenv("SMTP_PASS", "")   # Gmail App Password


def save_submission(data: dict) -> None:
    """Append a submission to the local JSON file."""
    submissions = []
    if os.path.exists(SUBMISSIONS_FILE):
        with open(SUBMISSIONS_FILE, "r") as f:
            try:
                submissions = json.load(f)
            except json.JSONDecodeError:
                submissions = []

    submissions.append(data)

    with open(SUBMISSIONS_FILE, "w") as f:
        json.dump(submissions, f, indent=2, default=str)


def send_email_notification(data: dict) -> None:
    """Send an email notification to ahmad.dstech@gmail.com with form data."""
    if not SMTP_USER or not SMTP_PASS:
        print("⚠️  SMTP credentials not set — skipping email notification.")
        return

    subject = f"🤖 New Contact Form: {data['name']} — BOTPILOT AI"
    body = f"""<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#0a0f1c;color:#fff;padding:30px;">
  <div style="max-width:600px;margin:auto;background:#111827;border-radius:12px;padding:30px;border:1px solid rgba(255,255,255,0.08);">
    <h2 style="color:#06b6d4;margin-top:0;">New Contact Form Submission</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;color:#9ca3af;width:100px;">Name</td><td style="padding:10px 0;color:#fff;font-weight:bold;">{data['name']}</td></tr>
      <tr><td style="padding:10px 0;color:#9ca3af;">Email</td><td style="padding:10px 0;color:#fff;">{data['email']}</td></tr>
      <tr><td style="padding:10px 0;color:#9ca3af;">Phone</td><td style="padding:10px 0;color:#fff;">{data.get('phone', 'N/A')}</td></tr>
      <tr><td style="padding:10px 0;color:#9ca3af;">Time</td><td style="padding:10px 0;color:#fff;">{data['submitted_at']}</td></tr>
    </table>
    <hr style="border-color:rgba(255,255,255,0.08);margin:20px 0;">
    <p style="color:#9ca3af;margin-bottom:5px;">Message:</p>
    <p style="color:#fff;line-height:1.6;background:#0a0f1c;padding:15px;border-radius:8px;">{data['message']}</p>
  </div>
</body>
</html>"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = SMTP_USER
    msg["To"] = NOTIFY_EMAIL
    msg["Reply-To"] = data["email"]
    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, NOTIFY_EMAIL, msg.as_string())
        print(f"✅ Email sent to {NOTIFY_EMAIL}")
    except Exception as e:
        print(f"❌ Email failed: {e}")


# ─── Endpoints ─────────────────────────────────────────
@app.get("/health")
async def health_check():
    """Health check — useful for monitoring."""
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


@app.post("/contact")
async def submit_contact(form: ContactForm):
    """
    Receive contact form data and store it.
    In production, you'd also send an email notification here.
    """
    submission = {
        "name": form.name,
        "email": form.email,
        "phone": form.phone,
        "message": form.message,
        "submitted_at": datetime.utcnow().isoformat(),
    }

    try:
        save_submission(submission)
        send_email_notification(submission)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save: {str(e)}")

    return {
        "message": "Form received successfully! We'll get back to you soon.",
        "data": submission,
    }


@app.get("/submissions")
async def get_submissions():
    """
    Admin endpoint to view all submissions.
    In production, protect this with authentication.
    """
    if not os.path.exists(SUBMISSIONS_FILE):
        return {"submissions": []}

    with open(SUBMISSIONS_FILE, "r") as f:
        try:
            submissions = json.load(f)
        except json.JSONDecodeError:
            submissions = []

    return {"submissions": submissions, "total": len(submissions)}
