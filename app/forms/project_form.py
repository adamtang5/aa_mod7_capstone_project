from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired


class CreateProjectForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    key = StringField("Key", validators=[DataRequired()])
    user_ids = StringField("User Ids", validators=[DataRequired()])
    submit = SubmitField("Submit")


class EditProjectForm(FlaskForm):
    id = IntegerField("id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    key = StringField("Key", validators=[DataRequired()])
    user_ids = StringField("User Ids", validators=[DataRequired()])
    submit = SubmitField("Submit")
