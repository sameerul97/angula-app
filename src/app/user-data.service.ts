import { Injectable } from '@angular/core';
import { LoginMessage } from './Interfaces/loginInterface';
import { HttpClient } from '@angular/common/http';
// import { url } from 'inspector';
import { UserCredential } from './Interfaces/userCredentialInterface';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // --------------------------
  // Remember to update login service if updating api url
  // --------------------------
  constructor(private http_Var: HttpClient) { }

  // functionList array to hold the function name tht gets called 
  // but the session is expired (STILL NOT WRKING)
  public myFunctionList = [];
  addFunctionList(functionName): void{
    this.myFunctionList.push(functionName);
    console.log("Pushed Data");
    console.log(this.myFunctionList);
  }
  getFunctionList():void{
    console.log(this.myFunctionList);
  }

  getProfile(): Observable<profileData> {

    // const body = new HttpParams()
    // .set('username',name)
    // .set('password', password);
    var storedToken = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', storedToken);

    // console.log(storedToken);

    // console.log(headers);

    return this.http_Var.get<profileData>("http://api.sameerul.com:3000/profile",
      { headers }
    )
    // return this.http_Var.post <LoginMessage> ("http://localhost:3000/profile",
    // {params: params}  );
  }

  getNotes(): Observable<profileData> {
    var storedToken = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', storedToken);

    // console.log(storedToken);

    // console.log(headers);

    return this.http_Var.get<profileData>("http://api.sameerul.com:3000/notes",
      { headers }
    )
  }
  // Send Notes (Post Notes)
  sendNotes(title, content): Observable<LoginMessage> {

    // This function calls the route to add new notes
    const Notes = new HttpParams()
      .set('noteTitle', title)
      .set('noteContent', content);
    var storedToken = localStorage.getItem('token');
    // let headers = new HttpHeaders().set('Authorization', storedToken);
    //     console.log(this.http_Var.post <UserCredential> ("http://localhost:3000/login",
    //     body.toString(),
    //     {
    //       headers: new HttpHeaders()
    //         .set('Content-Type', 'application/x-www-form-urlencoded')
    //     }
    //   )
    // );
    return this.http_Var.post<LoginMessage>("http://api.sameerul.com:3000/addNote",
      Notes.toString(),
      {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', storedToken)
      }
    )
  }


  // ------ Update Note request
  updateNotes(id,title, content): Observable<LoginMessage> {

    // This function calls the route to add new notes
    const Notes = new HttpParams()
      .set('noteId',id)
      .set('noteTitle', title)
      .set('noteContent', content);
    var storedToken = localStorage.getItem('token');
    // let headers = new HttpHeaders().set('Authorization', storedToken);
    //     console.log(this.http_Var.post <UserCredential> ("http://localhost:3000/login",
    //     body.toString(),
    //     {
    //       headers: new HttpHeaders()
    //         .set('Content-Type', 'application/x-www-form-urlencoded')
    //     }
    //   )
    // );
    return this.http_Var.put<LoginMessage>("http://api.sameerul.com:3000/updateNote",
      Notes.toString(),
      {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', storedToken)
      }
    )
  }
    // ------ Delete Note request
    deleteNotes(id): Observable<LoginMessage> {

      // This function calls the route to add new notes
      const NoteId = new HttpParams()
        .set('noteId',id);

      var storedToken = localStorage.getItem('token');
      // let headers = new HttpHeaders().set('Authorization', storedToken);
      //     console.log(this.http_Var.post <UserCredential> ("http://localhost:3000/login",
      //     body.toString(),
      //     {
      //       headers: new HttpHeaders()
      //         .set('Content-Type', 'application/x-www-form-urlencoded')
      //     }
      //   )
      // );
      return this.http_Var.delete<LoginMessage>("http://api.sameerul.com:3000/deleteNote/"+id,
        {
          headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', storedToken),
        }
      )
    }
}




//  Interface used when getting a reply back from server once logged in
export interface profileData {
  Message: string,
  name: string,
  Userdata: any
}

