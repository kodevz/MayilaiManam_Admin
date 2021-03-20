import { Component, OnInit, ElementRef, Input, ViewChildren, ViewChild, QueryList, ViewEncapsulation } from '@angular/core';
import { DTPageOptions, ColumnFilterOptions } from 'src/app/shared/datatable/model/dtoptions';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { Select2Service } from 'src/app/shared/select2/select2.service';
import { ApiService } from 'src/app/shared/api/api.service';
import { MultiselectComponent } from 'src/app/components/multiselect/multiselect.component';
import { Table } from 'primeng/table';

import { routerTransition } from '../../router.animations';
import { Calendar } from 'primeng/Calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateBizListingComponent } from './create-biz-listing/create-biz-listing.component';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/shared/global/global.service';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None
})
export class ListingComponent implements OnInit {

    cols: any[];

    loading: boolean = false;

    totalRecords: number;

    readonly stateKey = '__MM__ListingComponent';

    readonly rowsLength = 15;

    @ViewChild('bizListingTable', { static: false }) private _bizListingTable: Table;

    showCategoryForm: boolean = false;

    @ViewChildren('columnMultiSelectFilter') mutliSelectFilter: QueryList<MultiselectComponent>;

    @ViewChildren('columnDateFilter') dateFilter: QueryList<Calendar>;

    @Input() name;

    @Input() compOptions = new Array();

    columns: Array<any> = new Array();

    selectedColumns: Array<any> = new Array();

    rows = [];

    dtPageOptions = new DTPageOptions();

    items: any;

    bizListingForm: FormGroup;

    sessionUser: any;

    @ViewChild('createBizListing', { static: false }) createBizListing : CreateBizListingComponent;


    constructor(private el: ElementRef, public datatableService: DatatableService,
        public api: ApiService, public s2Service: Select2Service, 
        public formBuilder: FormBuilder, public modalService: NgbModal,
        private globalService: GlobalService
        ) {

        this.globalService.sessionUser$.subscribe(user => {
            this.sessionUser = user;
        });

    }

    ngOnInit() {


        this.dtPageOptions.rows = 15;
        this.columns = [

            {
                header: 'Title', field: 'title',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'title',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('listings').setValue('title').create()
                }
            },
            // {
            //     header: 'Slug', field: 'slug',
            //     sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
            //     filterOptions: <ColumnFilterOptions>{
            //         datatype: 'select2',
            //         groupId: '#columnMultiSelectFilter',
            //         filterkey: 'slug',
            //         filterConstraint: 'in',
            //         remoteOptions: this.s2Service.setTable('listings').setValue('slug').create()
            //     }
            // },
         
            
            {
                header: 'Address', field: 'full_address',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'full_address',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('listings').setValue('full_address').create()
                }
            },
            {
                header: 'Mobile No', field: 'mobile_no',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'mobile_no',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('listings').setValue('mobile_no').create()
                }
            },
            {
                header: 'Phone After', field: 'phone_afterhours',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'phone_afterhours',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('listings').setValue('phone_afterhours').create()
                }
            },
            {
                header: 'Category', field: 'category_names',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'phone_afterhours',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('listings_view').setValue('category_names').create()
                }
            },
            {
                header: 'Status', field: 'status',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'icrs_no',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('listings').setValue('status').create()
                }
            },
            {
                header: 'Verified', field: 'verified_status',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'icrs_no',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('listings_view').setLabel('verified_status').setValue('verified_status').create()
                }
            },
        ];

        this.dtPageOptions.columns = this.columns;
        this.selectedColumns = this.columns;

        this.bizListingForm = this.formBuilder.group({
            name: ['', Validators.required],
            slug: ['', Validators.required],

        });

    }

    initBizListing(dtEvent: DTPageOptions) {
        this.loading = true;
        let storedDtEvent = JSON.parse(localStorage.getItem(this.stateKey));
        if (storedDtEvent) {
            dtEvent.first = storedDtEvent.first ? storedDtEvent.first : dtEvent.first;
            dtEvent.to = storedDtEvent.to ? storedDtEvent.first : dtEvent.to;
        }
        dtEvent = this.datatableService.onOptionsMerge(this, dtEvent);
        let lastDtEvent = Object.create(dtEvent);
        this.api.post('api', 'listing/all', dtEvent).subscribe((resp: any) => {
            this.rows = resp.data;
            this.dtPageOptions = this.datatableService.updatePageOptions(dtEvent);
            this.dtPageOptions.totalElements = resp.recordsTotal;
            this.dtPageOptions.sno = 1;
            this.dtPageOptions.from = lastDtEvent.first + 1;
            this.dtPageOptions.to = lastDtEvent.first + this.dtPageOptions.rows;
            console.log(this.dtPageOptions)
            this.loading = false;
        });
    }

    saveBizListing() {


        this.api.post('api', 'listing/all', this.bizListingForm.value).subscribe((resp: any) => {
            this.reload();
        },
            (error: any) => {
                console.log(error)
                console.log(this.bizListingForm)
                console.log(error.error.errors);
                // Object.keys(error.error.errors).forEach((v, i) => this.categoryForm.get(v).setErrors('sserr', error.error.errors[v]) );
                console.log();
            });
    }

    reload() {
        this.mutliSelectFilter.toArray().map((comp) => comp.reset())
        // this._bizListingTable.reset();
        this.initBizListing(this.dtPageOptions)
    }

    display: boolean = false;

    editListing(content, listing) {
        //this.openListingModal(content, listing);

        console.log(this.createBizListing)

        this.createBizListing.listingData = listing;
   
    }

    openListingModal(content, listing) {
        this.modalService.open(content, { size: 'xl', scrollable: true })
    }


    deleteRow(row) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result:any)=> {
            if (!result.value) return;
            const id = row.id;
            this.api.get('api', `listing/${id}/delete`).subscribe((resp: any) => {
                if (resp.status) {
                    this.swalMessage('success', resp.msg);
                }
                this.reload();
            }, (error: any) => {
                //this.errorMsgs = error.error.error;
            });
        })
      
       
    }

     swalMessage(icon, msg) {
        Swal.fire({
            position: 'center',
            icon: icon,
            title: msg,
            showConfirmButton: false,
            timer: 1500
        })
    }
}
