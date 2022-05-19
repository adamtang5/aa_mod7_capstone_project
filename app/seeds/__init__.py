from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .issue_types import seed_issue_types, undo_issue_types
from .statuses import seed_statuses, undo_statuses
# from .roles import seed_roles, undo_roles


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_projects()
    seed_issue_types()
    seed_statuses()
    # seed_roles()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_roles()
    undo_statuses()
    undo_issue_types()
    undo_projects()
    undo_users()
    # Add other undo functions here
