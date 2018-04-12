import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import utils from '../util/util';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient
  ) { }

  getJson(url:string, params?:any){
    console.log(url);
    console.log(params);
    const requestUrl = params ? url+ `?${utils.parseParam(params)}`: url;

    return this.http.get(requestUrl,{
      // withCredentials: true,
      responseType: 'json'
    });
  }
}
