import { Component, OnInit } from '@angular/core';
import { PerspectiveService } from 'src/app/utils/perspective.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  perspective: string = '';
  private perspectiveChangeSub: Subscription;

  constructor(
    private perspectiveService: PerspectiveService,
    private router: Router
  ) { }

  ngOnInit() {
    this.perspective = this.perspectiveService.getCurrentPerspective();
    this.perspectiveChangeSub = this.perspectiveService.changedPerspective
      .subscribe(
        newPerspective => {
          this.perspective = newPerspective; 
        }
      );
  }

  ngOnDestroy(): void {
    this.perspectiveChangeSub.unsubscribe();
  }

  changePerspective() {
    this.perspectiveService.changePerspective();
  }

  goHome() {
    if (this.perspective === 'visitante') {
      this.router.navigateByUrl('/home-visitor');
    } else {
      this.router.navigateByUrl('/home-admin');
    }
  }

}
