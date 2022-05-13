from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired


class EditUserForm(FlaskForm):
    id = IntegerField("id", validators=[DataRequired()])
    display_name = StringField("Display Name", validators=[DataRequired()])
    avatar_url = StringField("Avatar URL")
    submit = SubmitField("Submit")
