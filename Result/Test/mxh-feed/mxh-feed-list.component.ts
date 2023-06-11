@Component({
  selector: 'app-mxh-feed-list',
  templateUrl: './mxh-feed-list.component.html',
  styleUrls: ['./mxh-feed-list.component.scss']
})
export class MxhFeedListComponent extends BaseListComponent {
  constructor(
    private _modalService: NzModalService,
    private _notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private _mxhFeedService: MxhFeedService
  ) {
    super()
  }
  
  ngOnInit() {
    this.gridColums = [
    	new GridColumn({,
			field: 'kieuLoai',
			header: 'kieuLoai',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'userId',
			header: 'userId',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'content',
			header: 'content',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'images',
			header: 'images',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'like',
			header: 'like',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'comment',
			header: 'comment',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'sort',
			header: 'sort',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'pin',
			header: 'pin',
			thWidth: '120px',
			class: 'text-center',
			dataType: 'boolean'
		}),
		new GridColumn({,
			field: 'suDung',
			header: 'suDung',
			thWidth: '120px',
			class: 'text-center',
			dataType: 'boolean'
		}),
		new GridColumn({,
			field: 'soLuotXem',
			header: 'soLuotXem',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'updatedById',
			header: 'updatedById',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'updatedByName',
			header: 'updatedByName',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'updatedDate',
			header: 'updatedDate',
			thWidth: '120px',
			class: 'text-center',
			dataType: 'date'
		})
    ];
   this.gridLoadData();
  }

  gridLoadData() {
    this.setSearchPage();
    this._mxhFeedService.search(this.searchModel).subscribe(res=>{
      if(res.isSuccess){
        this.gridData = res.data;
        this.totalRecord = res.totalRecord
      }
    })
  }
  
  changePageSize(event) {
    this.pageSize = event;
    this.gridLoadData()
  }
  
  changePageIndex(event) {
    this.page = event;
    this.gridLoadData()
  }

  onAddNew() {
    let modal = this._modalService.create({
      nzTitle: 'Thêm mới người dùng',
      nzContent: MxhFeedEditComponent,
      nzClosable: true,
      nzFooter: null,
      nzStyle: { top: '50px' },
      nzWidth: 1000,
    });
    modal.afterClose.subscribe(res => {
      if (res) {
        this.gridLoadData();
      }
    });
  }

  onEdit(id) {
    let modal = this._modalService.create({
      nzTitle: 'Cập nhật người dùng',
      nzContent: MxhFeedEditComponent,
      nzClosable: true,
      nzFooter: null,
      nzStyle: { top: '50px' },
      nzWidth: 1000,
      nzComponentParams: { id },
    });
    modal.afterClose.subscribe(res => {
      if (res) {
        this.gridLoadData();
      }
    });
  }

  onDelete(id) {
    this._modalService.confirm({
      nzClosable: false,
      nzTitle: 'Xác nhận',
      nzContent: 'Bạn có chắc chắn muốn xóa?',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Không',
      nzOkDanger: true,
      nzWidth: 310,
      nzOnOk: () => {
        this.spinner.show();
        this._mxhFeedService.delete(id).subscribe(res=>{
          this.spinner.hide()
          if(res.isSuccess){
            this._notification.success(MESSAGE.SUCCESS,MESSAGE.DELETE_SUCCESS)
            this.gridLoadData();
          }         
        })    
      }
    });
  }


  search(): void {
    this.gridLoadData()
  }

}
    