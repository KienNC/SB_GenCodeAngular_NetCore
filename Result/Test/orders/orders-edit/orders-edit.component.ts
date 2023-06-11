import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BaseEditComponent } from 'src/app/constants/base-edit.component';
import { MESSAGE } from 'src/app/constants/message';
import { ResponseData } from 'src/app/models/response';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.scss']
})
export class OrdersEditComponent extends BaseEditComponent implements OnInit {
  constructor(
    public modal: NzModalRef,
    private fb: FormBuilder,
    private roleService: RoleService,
    private notification: NzNotificationService,
    private _ordersService: OrdersService
  ) {
    super(modal)
  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formInput = this.fb.group({
    	userName: [null,[Validators.required]],
			documentNo: [null,[Validators.required]],
			totalPrice: [null,[Validators.required]],
			firstName: [null,[Validators.required]],
			lastName: [null,[Validators.required]],
			emailAddress: [null,[Validators.required]],
			shippingAddress: [null,[Validators.required]],
			invoiceAddress: [null,[Validators.required]],
			status: [null,[Validators.required]]
    });

    if (this.id) {
      //edit
      this._ordersService.get(this.id).subscribe((res: ResponseData) => {
        if (res.isSuccess) {
          this.formInput.patchValue({
           	userName: res.data.userName,
			documentNo: res.data.documentNo,
			totalPrice: res.data.totalPrice,
			firstName: res.data.firstName,
			lastName: res.data.lastName,
			emailAddress: res.data.emailAddress,
			shippingAddress: res.data.shippingAddress,
			invoiceAddress: res.data.invoiceAddress,
			status: res.data.status
          });
        }
      });
    }
  }

  addOrEdit() {
    this.markFormGroupTouched(this.formInput);
    if (this.formInput.invalid) {
      return;
    }

    let body: any = this.formInput.value;
    if (this.id) {
      body.id = this.id;
    }

    if (!this.id) {
      this._ordersService.create(body).subscribe((res: ResponseData) => {
        if (res.isSuccess) {
          this.notification.success(MESSAGE.SUCCESS, MESSAGE.ADD_SUCCESS);
          this.modal.close(true);
        } else {
          this.notification.error(res.errorCode, res.message);
        }
      });
    } else {
      this._ordersService.update(body).subscribe((res: ResponseData) => {
        if (res.isSuccess) {
          this.notification.success(MESSAGE.SUCCESS, MESSAGE.UPDATE_SUCCESS);
          this.modal.close(true);
        } else {
          this.notification.error(res.errorCode, res.message);
        }
      });
    }
  }
}

