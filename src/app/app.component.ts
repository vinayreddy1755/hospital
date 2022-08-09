import { Component, Renderer2 } from '@angular/core';
import 'hammerjs';
import { Subscription } from 'rxjs';
import { User } from './_models/model';
import { UserService } from './shared/services';
import { DataService } from './shared/services/data.service';
import { UtilService } from './shared/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-doctor';
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private util : UtilService,
    private renderer: Renderer2,
    private ds : DataService
  ) {
    this.renderer.addClass(document.body, 'landing2');
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(){
    this.userService.getAllDoctors();
    this.userService.getAllSpecialities();
  }


}
