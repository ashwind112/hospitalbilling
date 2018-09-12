import { Component, OnInit } from '@angular/core';
import {Patient} from '../../model/Patients';
import { PatientUtilityService } from '../patient-utility.service';
import * as moment from "moment";
import { Observable } from 'rxjs/Observable';



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

  displayPatient: Patient = new Patient();
  
  constructor(private patientUtilityService: PatientUtilityService) { }

  ngOnInit() {

  }

  selectedItem(item) {

    this.displayPatient = item.item;
    this.diagnosis = this.displayPatient.Diagnosis.pop().AdmittedFor;
    this.treatement = this.displayPatient.Treatment.pop().TreatmentGiven;

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

}


// term = patient.FirstName + ' ' + patient.MiddleName + ' ' + patient.LastName
