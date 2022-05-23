"""add comment body constraint

Revision ID: e4d3b30f21fb
Revises: 8e5046d9ec16
Create Date: 2022-05-22 14:10:15.867299

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e4d3b30f21fb'
down_revision = '8e5046d9ec16'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('Comments', 'body',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('Comments', 'body',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###
