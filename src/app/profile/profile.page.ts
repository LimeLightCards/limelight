import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  private userSub: Subscription;

  public user: User;
  public displayName = '';
  public currentDisplayName = '';

  public profileError = '';

  public newPassword = '';
  public newPasswordConfirm = '';

  public passwordError = '';

  constructor(private router: Router, private notifyService: NotifyService, public authService: AuthService) { }

  ionViewDidEnter() {
    this.userSub = this.authService.user.subscribe(user => this.setUser(user));
  }

  ionViewDidLeave() {
    this.userSub?.unsubscribe();
  }

  setUser(user: User) {
    this.user = user;
    if(this.user) {
      this.displayName = user.displayName;
      this.currentDisplayName = user.displayName;
    }
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  async changeDisplayName() {
    this.currentDisplayName = this.displayName;

    try {
      await this.authService.changeDisplayName(this.displayName);
      this.notifyService.showMessage('Updated display name!');
    } catch(e) {
      this.profileError = e.message;
    }

  }

  async changePassword() {
    try {
      await this.authService.changePassword(this.newPassword);
      this.notifyService.showMessage('Updated password!');
    } catch(e) {
      this.passwordError = e.message;
    }

    this.newPassword = '';
    this.newPasswordConfirm = '';
  }

}
