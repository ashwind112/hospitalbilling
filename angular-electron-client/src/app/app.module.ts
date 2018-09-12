import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { AdmittedPatientsComponent } from './admitted-patients/admitted-patients.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import {PatientUtilityService} from './patient-utility.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    AdmittedPatientsComponent,
    ViewPatientComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [PatientUtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
