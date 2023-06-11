@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent extends BaseListComponent {
  constructor(
    private _modalService: NzModalService,
    private _notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private _ordersService: OrdersService
  ) {
    super()
  }
  
  ngOnInit() {
    this.gridColums = [
    	new GridColumn({,
			field: 'userName',
			header: 'userName',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'documentNo',
			header: 'documentNo',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'totalPrice',
			header: 'totalPrice',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		}),
		new GridColumn({,
			field: 'firstName',
			header: 'firstName',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'lastName',
			header: 'lastName',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'emailAddress',
			header: 'emailAddress',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'shippingAddress',
			header: 'shippingAddress',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'invoiceAddress',
			header: 'invoiceAddress',
			thWidth: '120px',
			class: 'text-left',
			
		}),
		new GridColumn({,
			field: 'status',
			header: 'status',
			thWidth: '120px',
			class: 'text-right',
			dataType: 'number'
		})
    ];
   this.gridLoadData();
  }

  gridLoadData() {
    this.setSearchPage();
    this._ordersService.search(this.searchModel).subscribe(res=>{
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
      nzContent: OrdersEditComponent,
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
      nzContent: OrdersEditComponent,
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
        this._ordersService.delete(id).subscribe(res=>{
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
    