from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class StatusChangeForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    issue_id = IntegerField("Issue Id", validators=[DataRequired()])
    status_id = IntegerField("Status Id", validators=[DataRequired()])
