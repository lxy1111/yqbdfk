import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
@Injectable()
export class missionService {
  public API = 'http://101.132.117.17:8080/missions';
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

  getAppliedReason(message:any)
  {
    return this.handlemessage(message,'getappliedreason');
  }

  getExperience(message:any)
  {
    return this.handlemessage(message,'getexperiences');
  }

  passApplicants(message:any)
  {
    return this.handlemessage(message,'passApplicants');
  }

  collectMissions(message:any)
  {
  return this.handlemessage(message,'collectmissions');
  }

  getMyCollectedMissions(message:any)
  {
return this.handlemessage(message,'getcollectedmissions');
  }

  getAppliedMissions(message: any){
    return this.handlemessage(message,'getappliedmissions');
  }

  getMyMissions(message: any){
return this.handlemessage(message,'getmymissions');
  }

  applyForMission(message:any)
  {
return this.handlemessage(message,'applyformissions');
  }

  getAllMissions(message: any){
    return this.handlemessage(message,'getallmissions');
  }

  addMissions(message: any){
    return this.handlemessage(message,'addmissions');
  }

  remove(id: string) {
    return this.http.delete(this.BEER_API + '/' + id);
  }
}
