const express = require('express');
const router=express.Router();
const Patient = require('../models/patient');

//All routes reside hear

router.get('/getAllPatients', function(req, res,next){


    if(req.query.date)
    {
        var dateTofind =new Date(req.query.date);
        var patientsToreturn = [];
        var i =0;
        Patient.find({}).then(function(patients){

            //Check if patient was discharged at least once before this date
            patients.forEach(patient => {
                patient.DatesOfDischarge.find(function(dateOfDischarge){
                    
                    if(dateOfDischarge <= dateTofind){
                        console.log("dateOfDischarge : " + dateOfDischarge);
                        patientsToreturn[i] = patient;
                        i++;
                    }
                });
            });

            console.log(patientsToreturn);
            res.send(patientsToreturn);
        });
        
    }


    Patient.find({}).then(function(patients){
        res.send(patients);
    }).catch(next);

});

router.get('/getAdmittedPatients', function(req, res,next){
    Patient.find({IsAdmitted:true}).then(function(patients){
        res.send(patients);
    }).catch(next);
});

router.get('/getDischargedPatients', function(req, res,next){
    Patient.find({IsAdmitted:false}).then(function(patients){
        res.send(patients);
    }).catch(next);
});

router.get('/getPatient', function(req, res){
    
    var name = req.query.name;
   
    if(name){
        Patient.find({FirstName:new RegExp(name,"i")}||{MiddleName:new RegExp(name,"i")}||{LastName:new RegExp(name,"i")}).then(function(patients){
            res.send(patients)
        });
    }
});

router.get('/getPatientById', function(req, res,next){

    var name = req.query._id;

    if(name){
        Patient.findById({_id:_id}).then(function(patient){
            res.send(patient);
        }).catch(next)
    }
});



router.post('/addPatient', function(req, res, next){

    Patient.create(req.body).then(function(patient){
        res.send(patient);
    }).catch(next);
    
});

router.put ('/updatePatient/:id', function(req, res,next){
    Patient.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        var updatedPatient = Patient.findOne({_id:req.params.id}).then(function(patient){
            res.send(patient);
        }).catch(next);
        
    }).catch(next);
    
});

router.delete('/deletePatient/:id', function(req, res,next){
    Patient.findByIdAndRemove({_id:req.params.id}).then(function(patient){
        res.send(patient);
    }).catch(next);

});

router.post('/dischargePatient', function(req, res){
    res.send({type:'dischargePatient'});
});


module.exports = router;