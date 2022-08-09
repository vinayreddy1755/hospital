import { Injectable } from '@angular/core';
import { Doctor, Patient } from 'src/app/_models/model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  allDoctors = []
  allSpecialities = []

  loggedInPatient : Patient

  loggedInDoctor : Doctor

  getUID() {

    let now = Date.now().toString();

    now = now + Math.floor(Math.random() * 1000);

    if (now.length < 16) {

      for (let index = 0; index < 16 - now.length; index++) {

        now = '0' + now;

      }

    }

    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 16)].join('-');

  }

  getLoggedInPatient(){
    this.loggedInPatient = JSON.parse(localStorage.getItem("PATIENT"));
    return this.loggedInPatient;
  }

  getAllSpecialities(){
    return this.allSpecialities;
  }

  getAllDoctorsBySpecialityId(specialityId){
    return this.allDoctors.filter(doc => doc.speciality == specialityId);
  }

  getSpecilityNameById(id){
    return this.allSpecialities.find(spl => spl.id == id).name;
  }

  setLoggedInPattient(loggedInPatient){
    this.loggedInPatient = loggedInPatient;
    localStorage.setItem("PATIENT", JSON.stringify(loggedInPatient))
  }


}
