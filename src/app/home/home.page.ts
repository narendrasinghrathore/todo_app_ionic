import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppFirebaseService } from '../firebase/firebase.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  googleSignInSubs: Subscription;

  constructor(private auth: AppFirebaseService) { }

  ngOnInit() {
  }

  login(): void {
    this.googleSignInSubs = this.auth.signInGoogle().subscribe(data => console.log(data));
  }


  ngOnDestroy() {
    if (this.googleSignInSubs) {
      this.googleSignInSubs.unsubscribe();
    }

  }

}
