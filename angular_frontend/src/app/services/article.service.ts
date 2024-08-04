import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {global} from "../global";
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public url: string;
  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
   }

  getAll(): Observable<any>{
    return this._http.get(this.url+"articles");
  }

  getLatest(): Observable<any>{
    return this._http.get(this.url+"/latest-articles");
  }

  getOne(id: any): Observable<any>{
    return this._http.get(this.url+"/article/"+id);
  }

  save(article: any): Observable<any>{
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set("Content-type", "application/json");
    return this._http.post(this.url+"/save", params, {headers});
  }

  update(id: any, article: any, formdata: FormData): Observable<any>{
    let params = JSON.stringify(article);
    

    let headers = new HttpHeaders().set("Content-Type", "multipart/form-data; charset=utf-8; boundary='another cool boundary'");
    return this._http.put(this.url+"/article/"+id, formdata);
  }

  delete(id: any): Observable<any>{
    return this._http.delete(this.url+"article/"+id);
  }

  uploadImage(id:any, image: any): Observable<any>{
    
    return this._http.post(this.url+"/upload/image/"+id, image);
  }

  getImage(imageName: string): Observable<any>{
    
    return this._http.get(this.url+"image/"+imageName);
  }

  search(search: string): Observable<any>{
    
    return this._http.get(this.url+"search/"+search);
  }

  deleteImage(filename: any): Observable<any>{
    return this._http.delete(this.url+"delete/image/"+filename);
  }


}
