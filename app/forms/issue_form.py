from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired


class CreateIssueForm(FlaskForm):
    project_id = IntegerField("Project Id", validators=[DataRequired()])
    type_id = IntegerField("Type Id", validators=[DataRequired()])
    title = StringField("Summary", validators=[DataRequired()])
    body = StringField("Description")
    submitter_id = IntegerField("Submitter Id", validators=[DataRequired()])
    assignee_id = IntegerField("Assignee Id")
    submit = SubmitField("Submit")


class EditIssueForm(FlaskForm):
    id = IntegerField("id", validators=[DataRequired()])
    project_id = IntegerField("Project Id", validators=[DataRequired()])
    title = StringField("Summary", validators=[DataRequired()])
    body = StringField("Description")
    type_id = IntegerField("Type Id", validators=[DataRequired()])
    submitter_id = IntegerField("Submitter Id", validators=[DataRequired()])
    assignee_id = IntegerField("Assignee Id")
    participant_ids = StringField("Participants Ids", validators=[DataRequired()])
    submit = SubmitField("Submit")
