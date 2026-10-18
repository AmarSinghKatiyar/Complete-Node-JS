import mongoose, { Schema } from 'mongoose';

const studentSchema = new Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 40,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true
    },
    PhoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    ParentsName: {
        fatherName: {
            type: String
        },
        motherName: {
            type: String
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],//should only take that array value no other
        default: 'Male'
    },
    /*enrollmentYear : {
        type : Date
    },
    GraduationYear : {
        type : Date
    }*/
    importantDate: {
        enrollmentYear: {
            type: Date
        },
        GraduationYear: {
            type: Date
        }
    },
    address: {
        houseNo: {
            type: String
        },
        street: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: 'India'
        }
    }
}, { timestamps: true }) //on using timestamps 2 new attribute will add created and updated at will initial time but after updated then its updated time will updated with new time

const Student = mongoose.model('Student', studentSchema);

export default Student
