from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired


class EditProjectForm(FlaskForm):
    id = IntegerField("id", validators[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    key = StringField("Key", validators=[DataRequired()])
    submit = SubmitField("Submit")
