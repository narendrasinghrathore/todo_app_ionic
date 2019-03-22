import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppFirebaseUserService } from 'src/app/firebase/user.service';
import { CoreService } from 'src/app/core/core.service';
import { Subscription } from 'rxjs';
import { Store } from 'store';
import { AppUserData } from 'src/app/models/firebase.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {

  userData$: Subscription;
  profileForm: FormGroup;

  userDataExist = false;
  userData: AppUserData;

  constructor(private fb: FormBuilder, private fire: AppFirebaseUserService,
    private core: CoreService, private store: Store) { }

  ngOnInit() {

    this.userData$ = this.fire.userData$(this.fire.url).subscribe();

    this.profileForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required]],
      gender: ['']
    });

    const userStoreSubs = this.store.select('userProfileData').subscribe(
      (val: AppUserData[]) => {
        if (val && val.length) {
          const userData_ = val[0];
          this.userDataExist = true;
          this.userData = userData_;
          this.profileForm.patchValue({ ...userData_ });
        }

      }
    );

    this.userData$.add(userStoreSubs);

  }

  ngOnDestroy() {
    this.userData$.unsubscribe();
    this.userDataExist = false;
  }

  async updateUser() {
    if (this.profileForm.valid) {

      if (this.userDataExist) {
        this.fire.updateTodo_(this.profileForm.value, this.userData.key);

      } else {
        this.fire.addUserProfile(this.profileForm.value);
      }

      this.core.displayToast(`Changes saved.`);

    }
  }

}
