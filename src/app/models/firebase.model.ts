export interface FireBaseHttpErrorResponse {
    code: number;
    message: string;
}

export interface FirebaseUser {
    displayName: string;
    photoURL?: string;
}

export interface AppUserData {
    age?: number;
    fullname?: string;
    timestamp?: number;
    gender?: string;
    key?: string;
}

