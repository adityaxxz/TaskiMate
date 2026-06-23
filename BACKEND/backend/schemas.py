from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Optional, List, Literal
from datetime import datetime

# Enforce valid ticket statuses
TicketStatus = Literal["todo", "deployed", "done", "inprogress", "proposed"]


class GoogleLoginRequest(BaseModel):
    id_token: str = Field(..., description="Google OAuth 2.0 ID Token")


class ProjectCreate(BaseModel):
    name: str = Field(..., description="name of the project")


class TicketCreate(BaseModel):
    project_id: int = Field(..., description="id of the project")
    description: str = Field(..., description="description of the ticket")


class TicketUpdate(BaseModel):
    description: Optional[str] = Field(default=None, description="description of the ticket")
    status: Optional[TicketStatus] = Field(default=None, description="status of the ticket")


class SuperToggleRequest(BaseModel):
    enable: bool
    password: str


class TicketSchema(BaseModel):
    id: int
    project_id: int
    description: str
    status: TicketStatus
    creator_id: int
    creator_email: Optional[EmailStr] = None
    updated_by_id: int
    updated_by_email: Optional[EmailStr] = None
    created_at: datetime
    updated_at: datetime
    actor_email: Optional[EmailStr] = None


class ProjectSchema(BaseModel):
    id: int
    name: str
    created_at: datetime


class ProjectWithTicketsSchema(BaseModel):
    project: ProjectSchema
    tickets: List[TicketSchema] = Field(default_factory=list)

    @model_validator(mode="after")
    def validate_tickets_belong_to_project(self) -> 'ProjectWithTicketsSchema':
        project_id = self.project.id
        for ticket in self.tickets:
            if ticket.project_id != project_id:
                raise ValueError(
                    f"Ticket {ticket.id} belongs to project {ticket.project_id}, but was supplied under project {project_id}"
                )
        return self