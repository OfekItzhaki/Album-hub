import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrivateModeService {

  private privateKeySource = new BehaviorSubject(false);
  privateKeyState = this.privateKeySource.asObservable();

  constructor( private http: HttpClient ) { }

  editKeyState(privateKey: boolean) {
    this.privateKeySource.next(privateKey)
  }

  checkPriavateKey(id: string) {
    console.log("checking private key.. ");
    this.http.get(`http://localhost:5555/checkkey/${id}`).subscribe((res: any) => {
      if (res == true) {
        this.editKeyState(true);
      }
      else {
        this.editKeyState(false);
      }
    })
  }
}
