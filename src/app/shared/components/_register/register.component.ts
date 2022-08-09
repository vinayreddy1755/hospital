import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '../../services';
import { AppRouterLinks } from '../../../app-routing.config';
import { UtilService } from '../../services/util.service';

import * as moment from 'moment';
import { DataService } from '../../services/data.service';
import { Doctor, Patient } from 'src/app/_models/model';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  showAlert = false;
  userType = [{val: 'Doctor'}, {val: 'Patient'}];
  pickedUserType: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    public util : UtilService,
    private ds : DataService,
    private activatedRoute : ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        email: "",
        birthday: "",
  
        specialty: '',
  
        lastName: [],
        userType: ['', Validators.required],
        npi: '',
        city: ''
      });

      if(params.get("userType") == "PATIENT"){
        this.registerForm.get('email').setValidators([Validators.required]);
        this.registerForm.get('birthday').setValidators([Validators.required]);
      }
      else{
        this.registerForm.get('specialty').setValidators([Validators.required]);
      }
    })
    
    this.setConditionalValidator();
  }

  setConditionalValidator() {
    this.registerForm.get('userType').valueChanges
      .subscribe(userType => {
        if (userType === 'Doctor') {
          this.registerForm.get('specialty').setValidators([Validators.required]);
        }
        else{
          this.registerForm.get('email').setValidators([Validators.required]);
          this.registerForm.get('birthday').setValidators([Validators.required]);
        }
    });
  }

  pickUserType(val) {
    this.pickedUserType = val;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if(this.registerForm.value.userType == "Patient"){      
      const requestBody = {
        name: this.registerForm.value.firstName,
        email: this.registerForm.value.email,
        birthday: (moment(this.registerForm.value.birthday)).format("YYYY-MM-DD")
      }

      this.ds.createPatientRecord(requestBody).subscribe(res => {
        const apiData = res.body["response"]
        const patient = new Patient();
        patient.userType = apiData.userType;
        patient.id = apiData.id;
        patient.name = apiData.name;
        patient.birthday = apiData.birthday;
        patient.createdOn = apiData.createdOn;
        patient.lastUpdatedOn = apiData.lastUpdatedOn;
        patient.birthday = apiData.birthday;

        this.util.setLoggedInPattient(patient)

        this.router.navigateByUrl("/appointment/" + patient.userType);
      })
    }
    else{
      const requestBody = {
        name: this.registerForm.value.firstName,
        speciality: this.registerForm.value.speciality,
      }

      this.ds.createDoctorRecord(requestBody).subscribe(res => {
        const apiData = res.body["response"]
        const doctor = new Doctor();
        doctor.userType = apiData.userType;
        doctor.id = apiData.id;
        doctor.name = apiData.name;
        doctor.createdOn = apiData.createdOn;
        doctor.lastUpdatedOn = apiData.lastUpdatedOn;
        doctor.speciality = apiData.speciality;

        this.util.loggedInDoctor = doctor;

        this.router.navigateByUrl("/appointment/" + doctor.userType);
      })
    }

    // this.userService.register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.showAlert = true;
    //       this.alertService.success('Registration successful', true);
    //       setTimeout(() => this.router.navigate([`${AppRouterLinks.LOGIN}`]), 2000);
    //     },
    //     error => {
    //       this.showAlert = true;
    //       this.alertService.error(error.error);
    //       this.loading = false;
    //     });
  }
}
