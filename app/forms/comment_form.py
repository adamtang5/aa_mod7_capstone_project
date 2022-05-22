from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class CreateCommentForm(FlaskForm):
    issue_id = IntegerField("Issue Id", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
    body = StringField("Body", validators=[DataRequired()])


class EditCommentForm(FlaskForm):
    id = IntegerField("Id")
    issue_id = IntegerField("Issue Id")
    user_id = IntegerField("User Id", validators=[DataRequired()])
    body = StringField("Body", validators=[DataRequired()])
