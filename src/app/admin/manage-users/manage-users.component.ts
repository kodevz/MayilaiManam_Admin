import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { MultiselectComponent } from 'src/app/components/multiselect/multiselect.component';
import { Calendar } from 'primeng/Calendar';
import { DTPageOptions, ColumnFilterOptions } from 'src/app/shared/datatable/model/dtoptions';
import { HttpClient } from '@angular/common/http';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { ApiService } from 'src/app/shared/api/api.service';
import { Select2Service } from 'src/app/shared/select2/select2.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from 'src/app/router.animations';
import { CreateManageUsersComponent } from './create-manage-users/create-manage-users.component';
import { ManageUserService } from 'src/app/shared/manager-user/manage-user.service';
@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [routerTransition()]
})
export class ManageUsersComponent implements OnInit {

    cols: any[];

    loading: boolean = false;

    totalRecords: number;

    static key = "ManageUsersComponent";

    readonly rowsLength = 15;

    @ViewChild('usersTable', {static: false}) private _usersTable: Table;

    //@ViewChild('addCategoryDiv') private addCategoryDiv: ElementRef;

    //showCategoryForm: boolean = false;

    @ViewChild('createUserComp', { static: false }) createUserComp : CreateManageUsersComponent;

    @ViewChildren('columnMultiSelectFilter') mutliSelectFilter: QueryList<MultiselectComponent>;

    @ViewChildren('columnDateFilter') dateFilter: QueryList<Calendar>;

    @Input() name;

    @Input() compOptions = new Array();

    columns: Array<any> = new Array();

    selectedColumns: Array<any> = new Array();

    rows = [];

    dtPageOptions = new DTPageOptions();

    items: any;

    userForm: FormGroup;

    closeResult = '';

    errorMsgs: { [key: string]: any };
    constructor(public http: HttpClient, private el: ElementRef, public datatableService: DatatableService,
        public api: ApiService, public s2Service: Select2Service, public formBuilder: FormBuilder,
        public manageUserService: ManageUserService,
        public modalService: NgbModal) {

            
    }


    ngOnInit() {


        this.dtPageOptions.rows = 15;
        this.columns = [

            {
                header: 'Name', field: 'full_name',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'full_name',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('users_view').setValue('full_name').create()
                }
            },

            {
                header: 'Email', field: 'email',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'email',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('users_view').setValue('email').create()
                }
            },
            {
                header: 'Confirmation Code', field: 'confirmation_code',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'confirmation_code',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('users_view').setValue('confirmation_code').create()
                }
            },
            {
                header: 'Register Status', field: 'register_status',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'register_status',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('users_view').setValue('register_status').create()
                }
            },
            {
                header: 'Status', field: 'status',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'status',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('users_view').setValue('status').create()
                }
            },
        ];

        this.dtPageOptions.columns = this.columns;
        this.selectedColumns = this.columns;

        this.createFormBuilder();

    }

    createFormBuilder() {
        this.userForm = this.formBuilder.group({
            id: [''],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            password: [''],
            c_password: [''],
            roles: ['', Validators.required],
            confirmed: [''],
            confirmation_code: [''],
            active: [''],
        });
    }




    initUsers(dtEvent: DTPageOptions) {
        this.loading = true;
        dtEvent.from = 0;
        dtEvent.to = this.dtPageOptions.rows;
        dtEvent = this.datatableService.onOptionsMerge(this, dtEvent);
        let lastDtEvent = Object.create(dtEvent);
        this.manageUserService.usersList(dtEvent).subscribe((resp: any) => {
            this.rows = resp.data;
            this.dtPageOptions = this.datatableService.updatePageOptions(dtEvent);
            this.dtPageOptions.totalElements = resp.recordsTotal;
            this.dtPageOptions.sno = 1;
            this.dtPageOptions.from = lastDtEvent.first + 1;
            this.dtPageOptions.to = lastDtEvent.first + this.dtPageOptions.rows;

            this.loading = false;
        });
    }


    reload() {
        this.mutliSelectFilter.toArray().map((comp) => comp.reset())
        this._usersTable.reset();
    }

    
}
