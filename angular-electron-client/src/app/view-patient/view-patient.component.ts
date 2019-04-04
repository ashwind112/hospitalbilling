import { Component, OnInit } from '@angular/core';
import {Patient, AdmitionInfo, TreatmentInfo} from '../../model/Patients';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
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
  diagnosis: string ="";
  treatement: string= "";
  latestAdmissinDate: string;
  latestDischargeDate: string;
  male: boolean;
  female: boolean;
  displayPatient: Patient = new Patient();
  patientForm: FormGroup;
  closeResult:any;
  private modalRef: NgbModalRef;

  constructor(private patientUtilityService: PatientUtilityService, private spinner: NgxSpinnerService,private modalService: NgbModal) { }

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

  admitPatientToDB(content){
    if(this.displayPatient.IsAdmitted)
    {
      this.modalRef = this.modalService.open(content);
        this.modalRef.result.then((result) => {
          this.closeResult = 'Closed with: ${result}';
          console.log(this.closeResult)
        }, (reason) => {
          this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
          console.log(this.closeResult)
        });
        return;
    }
    else
    {

  	  this.displayPatient.DatesOfAdmission.push(new Date());
  	  this.displayPatient.IsAdmitted = true;




  	  let adInfo = new  AdmitionInfo();
      let tInfo = new TreatmentInfo();

      adInfo.AdmittedOn = new Date();
      adInfo.AdmittedFor = "";

      tInfo.TreatmentGivenOn = new Date();
      tInfo.TreatmentGiven = "";

    	this.displayPatient.Diagnosis.push(adInfo);
        this.displayPatient.Treatment.push(tInfo);

    	this.patientUtilityService.updatePatient(this.displayPatient._id.toString(), this.displayPatient).subscribe(
          res =>{
            console.log(res);
            //this.displayPatient=null;
            this.diagnosis="";
            this.treatement="";
          },
          err =>{
            console.log("Error Occured");
          }
        )
    }


  }

  dateOfAdmissionSelected(doa:Date)
  {
    alert("Called");
    this.displayPatient.Diagnosis.forEach(function(value){
      if (doa == value.AdmittedOn)
      {
        this.diagnosis=value.AdmittedFor;
      }
    }.bind(this));

    this.displayPatient.Treatment.forEach(function(value){
      if (doa == value.TreatmentGivenOn)
      {
        this.treatement=value.TreatmentGiven;
      }
    }.bind(this));

  }


}


// term = patient.FirstName + ' ' + patient.MiddleName + ' ' + patient.LastName
