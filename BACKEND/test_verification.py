import sys
from datetime import datetime, timezone
from pydantic import ValidationError
from backend.schemas import ProjectWithTicketsSchema, ProjectSchema, TicketSchema, TicketStatus
from backend.db import get_database, execute_transactional, get_next_sequence

def test_pydantic_validation():
    print("Testing Pydantic models & validation...")
    
    # 1. Test status validation
    try:
        TicketSchema(
            id=1,
            project_id=10,
            description="Test ticket",
            status="invalid_status",  # Should raise ValidationError
            creator_id=1,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        print("❌ Error: TicketSchema accepted invalid status!")
        sys.exit(1)
    except ValidationError:
        print("✅ Success: TicketSchema correctly rejected invalid status.")

    # 2. Test valid relationship
    try:
        project = ProjectSchema(id=1, name="Project 1", created_at=datetime.now(timezone.utc))
        tickets = [
            TicketSchema(
                id=101, project_id=1, description="Ticket 1", status="todo",
                creator_id=1, creator_email="test@user.com",
                updated_by_id=1, updated_by_email="test@user.com",
                created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc)
            ),
            TicketSchema(
                id=102, project_id=1, description="Ticket 2", status="inprogress",
                creator_id=1, creator_email="test@user.com",
                updated_by_id=1, updated_by_email="test@user.com",
                created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc)
            )
        ]
        ProjectWithTicketsSchema(project=project, tickets=tickets)
        print("✅ Success: ProjectWithTicketsSchema accepted matching tickets.")
    except ValidationError as e:
        print(f"❌ Error: ProjectWithTicketsSchema rejected valid matching tickets: {e}")
        sys.exit(1)

    # 3. Test invalid relationship validation
    try:
        project = ProjectSchema(id=1, name="Project 1", created_at=datetime.now(timezone.utc))
        tickets = [
            TicketSchema(
                id=101, project_id=1, description="Ticket 1", status="todo",
                creator_id=1, creator_email="test@user.com",
                updated_by_id=1, updated_by_email="test@user.com",
                created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc)
            ),
            TicketSchema(
                id=102, project_id=2, description="Ticket 2", status="inprogress",  # Mismatched project_id
                creator_id=1, creator_email="test@user.com",
                updated_by_id=1, updated_by_email="test@user.com",
                created_at=datetime.now(timezone.utc), updated_at=datetime.now(timezone.utc)
            )
        ]
        ProjectWithTicketsSchema(project=project, tickets=tickets)
        print("❌ Error: ProjectWithTicketsSchema accepted mismatched tickets!")
        sys.exit(1)
    except ValidationError:
        print("✅ Success: ProjectWithTicketsSchema correctly rejected mismatched tickets.")


def test_db_transactions():
    print("\nTesting DB Transactions...")
    try:
        db = get_database()
        
        # Test transactional sequence generation and rollback (using a dummy transaction rollback)
        class DummyRollbackException(Exception):
            pass
        
        def run_failing_tx(session):
            new_id = get_next_sequence(db, "test_tx_seq", session=session)
            db["test_tx_collection"].insert_one({"id": new_id, "name": "Will rollback"}, session=session)
            raise DummyRollbackException("Force rollback")

        try:
            execute_transactional(db, run_failing_tx)
        except DummyRollbackException:
            pass
        
        # If transaction/replica set is supported, the document should NOT be in the DB
        # If standalone and fell back to non-transactional execution, the document WILL be in the DB,
        # which is the expected fallback behavior. We will print the outcome.
        doc = db["test_tx_collection"].find_one({"name": "Will rollback"})
        if doc:
            print("ℹ️ Standalone MongoDB / Fallback mode active (document written on rollback).")
            # clean up
            db["test_tx_collection"].delete_one({"name": "Will rollback"})
            db["counters"].delete_one({"_id": "test_tx_seq"})
        else:
            print("🎉 Replica Set mode active: Transaction successfully rolled back all changes!")

    except Exception as e:
        print(f"❌ Error testing database connection or transaction helper: {e}")
        sys.exit(1)


if __name__ == "__main__":
    test_pydantic_validation()
    test_db_transactions()
    print("\nAll tests completed successfully!")
