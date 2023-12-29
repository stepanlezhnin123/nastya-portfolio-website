from flask import Flask, render_template, request, jsonify, url_for, redirect
from flask_wtf.csrf import CSRFProtect
import smtplib

app = Flask(__name__)
csrf = CSRFProtect(app)

app.config['SECRET_KEY'] = 'secretkey'

def send_email_function(sender_email, subject, message):
    email = "alezhnina37@gmail.com"  # You can remove this line
    receiver_email = "alezhnina37@gmail.com"

    text = f"Subject: {subject}\n\n{message}\n\n{sender_email}"

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(email, "ulth vkvb dlay oyrp")  # Replace with your actual password

        server.sendmail(sender_email, receiver_email, text)

        print(f"Email has been sent from {sender_email} to {receiver_email}")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        server.quit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.form
    sender_email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    try:
        send_email_function(sender_email, subject, message)
        # Redirect to /#about after sending the email
        return redirect(url_for('index', _anchor='email'))
    except Exception as e:
        return jsonify({"status": "error", "message": f"An error occurred: {str(e)}"})