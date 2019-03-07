import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
@Injectable()
export class groupService {
  public API = 'http://101.132.117.17:8080/group';
  public BEER_API = this.API + '/login';
   public responsemessage;
  public sendmessage;
  constructor(public http: Http) {
  }

  handlemessage(message:any,controllerurl)
  {
    const url = this.API + '/' + controllerurl;
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type' : 'application/x-www-form-urlencoded' });
    const options = new RequestOptions( { headers:headers } );
    this.sendmessage=this.http.post(url, `message=${message}`,options);
    return this.sendmessage;
  }

  getMessage(): Observable<any> {
    console.log("getmessage.")
    return this.http.get(this.API + '/getMessage');
  }

  get(id: string) {
    return this.http.get(this.BEER_API + '/' + id);
  }



  getMyGroups(message: any){
return this.handlemessage(message,'getallmygroups');
  }

  getJoinedGroups(message: any){
    return this.handlemessage(message,'getjoinedgroups');
      }

  getApplicants(message:any)
  {
    return this.handlemessage(message,'getapplicants')
  }
  addMember(message:any)
  {
    return this.handlemessage(message,'addnewmemberofgroup');
  }


  addGroup(message: any){
    return this.handlemessage(message,'creategroup');
  }

  remove(id: string) {
    return this.http.delete(this.BEER_API + '/' + id);
  }
}
