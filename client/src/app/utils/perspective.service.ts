import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PerspectiveService {

  currentPerspective: string = 'visitante';
  changedPerspective = new Subject<string>();

  constructor(private router: Router) { }

  changePerspective() {
    if (this.currentPerspective === 'visitante') {
      this.currentPerspective = 'administrador';
      this.router.navigateByUrl('/home-admin');
    } else {
      this.currentPerspective = 'visitante';
      this.router.navigateByUrl('/home-visitor');
    }
    this.changedPerspective.next(this.currentPerspective);
  }

  getCurrentPerspective() {
    return this.currentPerspective;
  }
}
