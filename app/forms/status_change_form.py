from flask_wtf import FlaskForm
from wtforms import IntegerField, DateTimeField
from wtforms.validators import DataRequired
from datetime import datetime


class StatusChangeForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    issue_id = IntegerField("Issue Id", validators=[DataRequired()])
    status_id = IntegerField("Status Id", validators=[DataRequired()])
