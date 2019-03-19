import { Injectable } from '@angular/core';
import { AppFirebaseService } from './firebase.service';


@Injectable()
export class FirebaseUserService {
    constructor(private fire: AppFirebaseService) {

    }


    async updateUser(user: firebase.User): Promise<boolean> {
        await this.fire.user.updateProfile(user);
        return true;
    }
}
