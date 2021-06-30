from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DateTimeField
from wtforms.validators import DataRequired

class EventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    category = SelectField('category', choices=[("Night Life"), ("Sports"), ("Food"), ("Chat"), ("Games"), ("Chill")], validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    when = DateTimeField("when", validators=[DataRequired()])