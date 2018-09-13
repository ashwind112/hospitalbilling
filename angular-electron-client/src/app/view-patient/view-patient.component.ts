import { Component, OnInit } from '@angular/core';
import { Patient } from '../../model/Patients';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientUtilityService } from '../patient-utility.service';
import * as moment from "moment";
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {

  //To show on forms
  selectedPatient: Patient;
  diagnosis: string;
  treatement: string;
  latestAdmissinDate: string;
  latestDischargeDate: string;
  male: boolean;
  female: boolean;
  displayPatient: Patient = new Patient();
  patientForm: FormGroup;
  
  constructor(private patientUtilityService: PatientUtilityService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.patientForm = new FormGroup({
      'FirstName': new FormControl(this.displayPatient.FirstName, [Validators.required]),
      'LastName': new FormControl(this.displayPatient.LastName, [Validators.required]),
      'MiddleName': new FormControl(this.displayPatient.MiddleName, [Validators.required]),
      'Gender': new FormControl(this.displayPatient.Gender, [Validators.required]),
      'Age': new FormControl(this.displayPatient.Age, [Validators.required]),
      'Address': new FormControl(this.displayPatient.Address, [Validators.required])
    });
  }

  selectedItem(item) {

    this.displayPatient = item.item;
    this.diagnosis = this.displayPatient.Diagnosis[this.displayPatient.Diagnosis.length - 1].AdmittedFor;
    this.treatement = this.displayPatient.Treatment[this.displayPatient.Treatment.length - 1].TreatmentGiven;

    if (this.displayPatient.Gender == "Male")
      this.male = true;
    else
      this.female = true;
    if (this.displayPatient.DatesOfAdmission.length != 0)
      this.latestAdmissinDate = moment(this.displayPatient.DatesOfAdmission[this.displayPatient.DatesOfAdmission.length - 1]).format("DD/MM/YYYY");

    if (this.displayPatient.DatesOfDischarge.length != 0)
      this.latestDischargeDate = moment(this.displayPatient.DatesOfDischarge[this.displayPatient.DatesOfDischarge.length - 1]).format("DD/MM/YYYY");
    else
      this.latestDischargeDate = "NA";

    console.log("From DB: ");
    console.log(this.displayPatient);
  }
  patientResultFormatter = (result: Patient) => result.FirstName + ' ' + result.MiddleName + ' ' + result.LastName;
  patientInputFormatter = (result: Patient) => result.FirstName + ' ' + result.MiddleName + ' ' + result.LastName;
  // Function to auto complete search patient by name
  search = (text$: Observable <Patient>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .do((term) => {console.log(term); } )
      .switchMap(term => this.patientUtilityService.getPatientsByName(term.toString()).map((patients) => {
        return patients.map((patient) => term = patient);
      }));
  }

  updatePatientToDB() {
    console.log("Before Update:");
    console.log(this.displayPatient);
    this.spinner.show();

    this.patientUtilityService.updatePatient(this.displayPatient._id.toString(), this.displayPatient).subscribe(
      res => {
        this.spinner.hide();
        this.displayPatient = res;
        return;
      },
      err => {
        
        console.log(err);
        return;
      }
    );
  }



}


// term = patient.FirstName + ' ' + patient.MiddleName + ' ' + patient.LastName
