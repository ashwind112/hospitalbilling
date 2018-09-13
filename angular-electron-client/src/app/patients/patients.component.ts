import { Component, OnInit } from '@angular/core';
import {Patient, AdmitionInfo, TreatmentInfo} from '../../model/Patients';
import {PatientUtilityService} from '../patient-utility.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  newPatient:Patient;
  patientsData: Patient[];
  diagnosis: string;
  treatement: string;
  patientForm: FormGroup;

  constructor(private patientUtilityService:PatientUtilityService ) { }

  ngOnInit() {
    

    this.newPatient = new Patient();

    this.patientUtilityService.getPatients().subscribe((patients) => {
      this.patientsData = patients
    });

    this.patientForm = new FormGroup({
      'FirstName': new FormControl(this.newPatient.FirstName, [Validators.required]),
      'MiddleName': new FormControl(this.newPatient.MiddleName, [Validators.required]),
      'LastName': new FormControl(this.newPatient.LastName, [Validators.required]),
      'Gender': new FormControl(this.newPatient.Gender, [Validators.required]),
      'Age': new FormControl(this.newPatient.Age, [Validators.required, Validators.min(1)]),
      'Address': new FormControl(this.newPatient.Address, [Validators.required])
    });
  

  }

  addPatientToDB():void{
    this.newPatient.DatesOfAdmission.push(new Date());
    this.newPatient.IsAdmitted = true;

    let adInfo = new  AdmitionInfo();
    let tInfo = new TreatmentInfo();

    adInfo.AdmittedOn = new Date();
    if (this.diagnosis.length != 0)
      adInfo.AdmittedFor = this.diagnosis;

    tInfo.TreatmentGivenOn = new Date();
    if (this.treatement.length != 0)
      tInfo.TreatmentGiven = this.treatement;

    this.newPatient.Diagnosis.push(adInfo);
    this.newPatient.Treatment.push(tInfo);
 
    console.log("Going to DB:");
    console.log(this.newPatient);
    this.patientUtilityService.addPatient(this.newPatient).subscribe(
      res =>{
        console.log(res);
      },
      err =>{
        console.log("Error Occured");
      }
    )
  }

  provechange():void{
    alert(this.newPatient.Gender);
  }

  get diagnostic() { return JSON.stringify(this.newPatient); }
}
