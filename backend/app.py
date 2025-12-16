from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///learners_college.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

# Models
class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    inquiry_type = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)
    newsletter = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'inquiry_type': self.inquiry_type,
            'message': self.message,
            'newsletter': self.newsletter,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class CareerApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.String(50), nullable=False)
    current_salary = db.Column(db.String(50))
    qualification = db.Column(db.String(200), nullable=False)
    cover_letter = db.Column(db.Text, nullable=False)
    resume_filename = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'position': self.position,
            'experience': self.experience,
            'current_salary': self.current_salary,
            'qualification': self.qualification,
            'cover_letter': self.cover_letter,
            'resume_filename': self.resume_filename,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# Routes
@app.route('/api/enquiries', methods=['POST'])
def create_inquiry():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'inquiryType', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new inquiry
        inquiry = Inquiry(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            phone=data.get('phone', ''),
            inquiry_type=data['inquiryType'],
            message=data['message'],
            newsletter=data.get('newsletter', False) == "Yes"
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        return jsonify({
            'message': 'Inquiry submitted successfully',
            'inquiry': inquiry.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to submit inquiry', 'details': str(e)}), 500

@app.route('/api/careers', methods=['POST'])
def create_career_application():
    try:
        # Handle form data
        form_data = request.form
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'phone', 'position', 'experience', 'qualification', 'coverLetter']
        for field in required_fields:
            if not form_data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Handle file upload
        resume_filename = None
        if 'resume' in request.files:
            file = request.files['resume']
            if file.filename != '':
                filename = secure_filename(file.filename)
                # Add timestamp to avoid filename conflicts
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"{timestamp}_{filename}"
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                resume_filename = filename
        
        # Create new career application
        application = CareerApplication(
            full_name=form_data['fullName'],
            email=form_data['email'],
            phone=form_data['phone'],
            position=form_data['position'],
            experience=form_data['experience'],
            current_salary=form_data.get('currentSalary', ''),
            qualification=form_data['qualification'],
            cover_letter=form_data['coverLetter'],
            resume_filename=resume_filename
        )
        
        db.session.add(application)
        db.session.commit()
        
        return jsonify({
            'message': 'Application submitted successfully',
            'application': application.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to submit application', 'details': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

# Create tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
