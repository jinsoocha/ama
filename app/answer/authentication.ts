import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
 
@Injectable()
export class Authentication {
 
  constructor(
    private router: Router){}
 
  logout() {
    localStorage.removeItem("token");
  }
 
  login(password: string) {
    if ('1111' === password){
      localStorage.setItem("token", "jinsoo");
      this.router.navigate(['/answer/list']);
      return true;   
    }
    return false;
  }
 
  checkCredentials() {
    if (localStorage.getItem("token") !== "jinsoo") {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

}