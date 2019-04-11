import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppFirebaseService } from '../firebase/firebase.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

    appState = this.appFire.appStatus$;

    constructor(private appFire: AppFirebaseService) { }

}
