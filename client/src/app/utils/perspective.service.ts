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

  changePerspective(newPerspective: string) {
    if (this.currentPerspective !== newPerspective) {
      this.currentPerspective = newPerspective;
      if (newPerspective === 'administrador') {
        this.router.navigateByUrl('/home-admin');
      } else {
        this.router.navigateByUrl('/home-visitor');
      }
      this.changedPerspective.next(this.currentPerspective);
    }
  }

  getCurrentPerspective() {
    return this.currentPerspective;
  }
}
