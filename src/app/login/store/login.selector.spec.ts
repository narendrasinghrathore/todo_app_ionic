import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

// store import
import * as FromActions from './login.action';
import * as FromReducers from './login.reducer';
import * as FromSelectors from './login.selector';
// root store
import * as FromRootReducer from '../../store/reducers/index';
import { environment } from 'environments/environment';
import { AppUser } from 'src/app/models/User';

describe('Login Selector', () => {
  let store: Store<FromReducers.LoginAppState>;
  const loginState: FromReducers.ILoginState = {
    loaded: false,
    loading: true,
    user: {
      authenticated: false,
      email: '',
      phoneNumber: '',
      uid: ''
    }
  };

  const user = { email: '1@2.com', password: '123456' };
  const userSuccess: AppUser = {
    authenticated: true,
    email: user.email,
    uid: '123456'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...FromRootReducer.reducers,
          [environment.store.login.storeName]: combineReducers(
            FromReducers.reducers
          )
        })
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('No action', () => {
    it('loading should be false', () => {
      let result: boolean;

      store.select(FromSelectors.selectLoading).subscribe(val => {
        result = val;
      });

      expect(result).toEqual(false);
    });
  });

  describe('Action Login', () => {
    it('loading should be true', () => {
      let result: boolean;

      store.select(FromSelectors.selectLoading).subscribe(val => {
        result = val;
      });

      store.dispatch(new FromActions.Login(user));

      expect(result).toEqual(true);
    });

    it('loaded should be false', () => {
      let result: boolean;

      store.select(FromSelectors.selectLoaded).subscribe(val => {
        result = val;
      });

      store.dispatch(new FromActions.Login(user));

      expect(result).toEqual(false);
    });
  });

  describe('Action Login Success', () => {
    it('loading should be false', () => {
      let result: boolean;

      store.select(FromSelectors.selectLoading).subscribe(val => {
        result = val;
      });

      store.dispatch(new FromActions.Login(user));

      expect(result).toEqual(true);

      store.dispatch(new FromActions.LoginSuccess(userSuccess));

      expect(result).toEqual(false);
    });

    it('loaded should be true', () => {
      let result: boolean;

      store.select(FromSelectors.selectLoaded).subscribe(val => {
        result = val;
      });

      store.dispatch(new FromActions.Login(user));

      expect(result).toEqual(false);

      store.dispatch(new FromActions.LoginSuccess(userSuccess));

      expect(result).toEqual(true);
    });
  });

  describe('Action Login Fail', () => {
    it('loading should be false', () => {
      let result: boolean;

      store.select(FromSelectors.selectLoading).subscribe(val => {
        result = val;
      });

      store.dispatch(new FromActions.Login(user));

      expect(result).toEqual(true);

      store.dispatch(new FromActions.LoginFail({}));

      expect(result).toEqual(false);
    });

    it('loaded should be false', () => {
      let result: boolean;

      store.select(FromSelectors.selectLoaded).subscribe(val => {
        result = val;
      });

      store.dispatch(new FromActions.Login(user));

      expect(result).toEqual(false);

      store.dispatch(new FromActions.LoginFail({}));

      expect(result).toEqual(false);
    });
  });

  describe('Action Login Success: User', () => {
    it('user should return', () => {
      let result: AppUser | {};

      store.select(FromSelectors.selectUser).subscribe(val => {
        result = val;
      });

      store.dispatch(new FromActions.Login(user));

      store.dispatch(new FromActions.LoginSuccess(userSuccess));

      expect(result).toEqual(userSuccess);
    });
  });
});
