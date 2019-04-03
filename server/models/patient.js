const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    FirstName:{
        type:String,
        required:[true,'Patient must have a name']
    },
    MiddleName:{
        type:String,
    },
    LastName:{
        type:String,
        required:[true,'Patient must have a name']
    },
    Address:{
        type:String
    },
    DatesOfAdmission:[Date],
    DatesOfDischarge:[Date],
    HistoryOf:{
        type:String,
        default:"None"
    },
    Diagnosis:[{
        AdmittedFor:{
            type : String,
        },
        AdmittedOn:
        {
            type:Date,
        }
    }],
    Treatment:[{
        TreatmentGiven:{
            type : String,
        },
        TreatmentGivenOn:
        {
            type:Date,
        }
    }],
    Discharge:[{
      TypeOfDischarge:{
        type:String
      },
      DischargeDate:{
        type:Date
      }
    }],
    PhoneNumber:{
        type:String,
        required:[true,'Must have a phone number']
    },
    IsAdmitted:{
        type:Boolean,
        default:true
    },
    Age:{
        type:Number,
        required:[true,"Patient Must have age"]
    },
    Gender:{
        type:String,
        required:[true,"Patient Must Have gender"]
    }
});

const Patient = mongoose.model('patient',PatientSchema);

module.exports = Patient;
