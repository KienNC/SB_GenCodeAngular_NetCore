import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseData } from "src/app/models/response";
import { environment } from "src/environments/environment";
import { BaseService } from "../../base/base.service";
@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService {

  constructor(public httpClient: HttpClient,) {
    super(httpClient, `${environment.API_URL}Orders`);
  }
}

