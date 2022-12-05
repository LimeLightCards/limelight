import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile-public',
  templateUrl: './profile-public.page.html',
  styleUrls: ['./profile-public.page.scss'],
})
export class ProfilePublicPage implements OnInit {

  public user;
  public deckQuery = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.apiService.getUserById(userId).subscribe(user => {
      if(!user) {
        this.router.navigate(['/']);
        return;
      }

      this.user = user;
      this.deckQuery = `authorid:${user.id}`;
    });
  }

  search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

}
