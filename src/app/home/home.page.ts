import { Component, OnDestroy } from '@angular/core';
import { AppFirebaseService } from '../firebase/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  googleSignInSubs: Subscription;

  constructor(private auth: AppFirebaseService) { }



  login(): void {
    this.googleSignInSubs = this.auth.signInGoogle().subscribe(data => console.log(data));
  }


  ngOnDestroy() {
    if (this.googleSignInSubs) {
      this.googleSignInSubs.unsubscribe();
    }

  }

}
