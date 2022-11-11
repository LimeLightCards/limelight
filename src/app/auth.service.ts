import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get user() {
    return this.auth.user;
  }

  constructor(private auth: AngularFireAuth) { }

  async signUp(email: string, password: string, username: string) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      await this.changeDisplayName(username);
    } catch(e) {
      throw e;
    }
  }

  async signIn(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch(e) {
      throw e;
    }
  }

  async signOut() {
    try {
      await this.auth.signOut();
    } catch(e) {
      throw e;
    }
  }

  async changeDisplayName(username: string) {
    const user = await this.auth.currentUser;
    await user.updateProfile({
      displayName: username
    });
  }

  async changePassword(password: string) {
    const user = await this.auth.currentUser;
    await user.updatePassword(password);
  }
}
