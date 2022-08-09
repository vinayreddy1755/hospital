import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../../../shared/services';
import { Patient, User } from '../../../_models/model';
import { Subscription } from 'rxjs';
import { Data, Router } from '@angular/router';
import { AppRouterLinks, AppRoutes } from '../../../app-routing.config';
import { DataService } from 'src/app/shared/services/data.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  landingType = 'landing1';
  currentUser: User;
  currentUserSubscription: Subscription;

  patientEmail = "";
  doctorId = "";

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private router: Router,
    private ds :DataService,
    public util: UtilService,
    private modal : NgbModal
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    if (this.currentUser) {
      this.router.navigate(AppRouterLinks.HOME);
    }
  }

  ngOnInit() {
    localStorage.clear();
  }

  getStarted(){
    this.ds.patientLoginWithEmail(this.patientEmail).subscribe(res => {
      const apiData = res.body["response"];
      if(apiData){
        const patient = new Patient();
        patient.userType = apiData.userType;
        patient.id = apiData.id;
        patient.birthday = apiData.birthday;
        patient.createdOn = apiData.createdOn;
        patient.lastUpdatedOn = apiData.lastUpdatedOn;
        patient.birthday = apiData.birthday;

        this.util.setLoggedInPattient(patient)

        this.router.navigateByUrl("/appointment/" + patient.userType);
      }
      else{
        this.router.navigateByUrl("/register" + "PATIENT")
      }
    }, error => {
      this.router.navigateByUrl("/register" + "PATIENT")
      console.log("Error ", error);
    })
  }

  landing() {
    if (this.landingType === 'landing1') {
      this.renderer.removeClass(document.body, 'landing1');
      this.renderer.addClass(document.body, 'landing2');
    } else if (this.landingType === 'landing3') {
      this.renderer.removeClass(document.body, 'landing3');
      this.renderer.addClass(document.body, 'landing2');
    }
    this.landingType = 'landing2';
  }

  landing1() {
    this.landingType = 'landing1';
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing1');
  }

  landing3() {
    this.landingType = 'landing3';
    this.renderer.removeClass(document.body, 'landing2');
    this.renderer.addClass(document.body, 'landing3');
    this.renderer.setStyle(document.body, 'background', '#3668ff');
  }
}
