import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  appHttpRequest(type, url, body) {
    const apiGatewayUrl = environment.apiBaseURL + environment.hospitalService + url;
    switch(type) {
      case "GET": return this.http.get(apiGatewayUrl, {observe: 'response'});
      case "POST": return this.http.post(apiGatewayUrl, body, {observe: 'response'});
    }
  }

  createAppointment(appointmentDetails){
    const url = "/appointment/create-appointment";

    return this.appHttpRequest("POST", url, appointmentDetails);
  }

  patientLoginWithEmail(email){
    const url = "/patient/login/" + email;

    return this.appHttpRequest("GET", url, null);
  }

  createPatientRecord(patientDetails){
    const url = "/patient/create-patient";

    return this.appHttpRequest("POST", url, patientDetails);
  }

  getAllPatients(){
    const url = "/patient/get-all";

    return this.appHttpRequest("GET", url, null);
  }

  doctorLoginWithId(id){
    const url = "/doctor/login/" + id;

    return this.appHttpRequest("GET", url, null);
  }

  getAllDoctors(){
    const url = "/doctor/get-all";

    return this.appHttpRequest("GET", url, null);
  }

  createDoctorRecord(doctorDetails){
    const url = "/doctor/create-doctor-record";

    return this.appHttpRequest("POST", url, doctorDetails);
  }

  getAllSpecialities(){
    const url = "/speciality/get-all-specialities";

    return this.appHttpRequest("GET", url, null);
  }

  getAllAppointmentsByPatientId(patientId){
    const url = "/appointment/get-appointments-by-patient-id/" + patientId;

    return this.appHttpRequest("GET", url, null);
  }

  getAllAppointmentsByDoctorId(doctorId){
    const url = "/appointment/get-appointments-by-doctor-id/" + doctorId;

    return this.appHttpRequest("GET", url, null);
  }
}
