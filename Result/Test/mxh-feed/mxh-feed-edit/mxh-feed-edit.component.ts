import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BaseEditComponent } from 'src/app/constants/base-edit.component';
import { MESSAGE } from 'src/app/constants/message';
import { ResponseData } from 'src/app/models/response';

@Component({
  selector: 'app-mxh-feed-edit',
  templateUrl: './mxh-feed-edit.component.html',
  styleUrls: ['./mxh-feed-edit.component.scss']
})
export class MxhFeedEditComponent extends BaseEditComponent implements OnInit {
  constructor(
    public modal: NzModalRef,
    private fb: FormBuilder,
    private roleService: RoleService,
    private notification: NzNotificationService,
    private _mxhFeedService: MxhFeedService
  ) {
    super(modal)
  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formInput = this.fb.group({
    	kieuLoai: [null],
			userId: [null,[Validators.required]],
			content: [null],
			images: [null],
			like: [null],
			comment: [null],
			sort: [null],
			pin: [null],
			suDung: [null],
			soLuotXem: [null]
    });

    if (this.id) {
      //edit
      this._mxhFeedService.get(this.id).subscribe((res: ResponseData) => {
        if (res.isSuccess) {
          this.formInput.patchValue({
           	kieuLoai: res.data.kieuLoai,
			userId: res.data.userId,
			content: res.data.content,
			images: res.data.images,
			like: res.data.like,
			comment: res.data.comment,
			sort: res.data.sort,
			pin: res.data.pin,
			suDung: res.data.suDung,
			soLuotXem: res.data.soLuotXem
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
      this._mxhFeedService.create(body).subscribe((res: ResponseData) => {
        if (res.isSuccess) {
          this.notification.success(MESSAGE.SUCCESS, MESSAGE.ADD_SUCCESS);
          this.modal.close(true);
        } else {
          this.notification.error(res.errorCode, res.message);
        }
      });
    } else {
      this._mxhFeedService.update(body).subscribe((res: ResponseData) => {
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

