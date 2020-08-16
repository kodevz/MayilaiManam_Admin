import { Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { DTPageOptions, ColumnFilterOptions } from 'src/app/shared/datatable/model/dtoptions';
import { ApiService } from 'src/app/shared/api/api.service';
import { Select2Service } from 'src/app/shared/select2/select2.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { MultiselectComponent } from 'src/app/components/multiselect/multiselect.component';
import { Table } from 'primeng/table';
import { CreateAdPostComponent } from './create-ad-post/create-ad-post.component';
import { AdPostService } from 'src/app/shared/ad-post/ad-post.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ad-post',
    templateUrl: './ad-post.component.html',
    styleUrls: ['./ad-post.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdPostComponent implements OnInit {

    readonly stateKey = '__MM__AdPostComponent';

    dtPageOptions = new DTPageOptions();

    columns: Array<any> = new Array();

    selectedColumns: Array<any> = new Array();

    adPostForm: FormGroup;

    loading: boolean = false;

    rows = [];

    @ViewChild('createAdPostComp', { static: false }) createAdPostComp: CreateAdPostComponent;

    @ViewChildren('columnMultiSelectFilter') mutliSelectFilter: QueryList<MultiselectComponent>;

    @ViewChild('adPostTable', { static: false }) private _adPostTable: Table;

    constructor(
        public api: ApiService,
        public s2Service: Select2Service,
        public datatableService: DatatableService,
        public formBuilder: FormBuilder,
        public modalService: NgbModal,
        public adPostService: AdPostService
    ) { }

    ngOnInit() {
        this.dtPageOptions.rows = 15;
        this.columns = [

            {
                header: 'Ad Title', field: 'ad_title',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'ad_title',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('ad_post').setValue('ad_title').create()
                }
            },
            {
                header: 'Ad Subtitle', field: 'ad_subtitle',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'ad_subtitle',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('ad_post').setValue('ad_subtitle').create()
                }
            },

            {
                header: 'Ad By', field: 'ad_by',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'ad_by',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('ad_post').setValue('ad_by').create()
                }
            },
            {
                header: 'Ad Date', field: 'ad_post_date',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'ad_post_date',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('ad_post').setValue('ad_post_date').create()
                }
            },
            {
                header: 'Visible Days', field: 'ad_visible_days',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'ad_visible_days',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('ad_post').setValue('ad_visible_days').create()
                }
            },
            {
                header: 'Status', field: 'ad_status',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'ad_status',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('ad_post').setValue('ad_status').create()
                }
            },
        ];

        this.dtPageOptions.columns = this.columns;
        this.selectedColumns = this.columns;



    }

    initAdPost(dtEvent: DTPageOptions) {
        this.loading = true;
        let storedDtEvent = JSON.parse(localStorage.getItem(this.stateKey));
        if (storedDtEvent) {
            dtEvent.first = storedDtEvent.first ? storedDtEvent.first : dtEvent.first;
            dtEvent.to = storedDtEvent.to ? storedDtEvent.first : dtEvent.to;
        }

        dtEvent = this.datatableService.onOptionsMerge(this, dtEvent);
        let lastDtEvent = Object.create(dtEvent);

        this.adPostService.adList(dtEvent).subscribe((resp: any) => {
            this.rows = resp.data;
            this.dtPageOptions = this.datatableService.updatePageOptions(dtEvent);
            this.dtPageOptions.totalElements = resp.recordsTotal;
            this.dtPageOptions.sno = 1;
            
            this.dtPageOptions.from = lastDtEvent.first + 1;
            this.dtPageOptions.to = lastDtEvent.first + this.dtPageOptions.rows;
            console.log(this.dtPageOptions)
            //this.dtPageOptions.first = lastDtEvent.first + this.dtPageOptions.rows;
            this.loading = false;
        });
    }

   

    reload() {
        this.mutliSelectFilter.toArray().map((comp) => comp.reset())
        // this._adPostTable.reset();
        this.initAdPost(this.dtPageOptions);
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
            this.api.get('api', `ad/${id}/delete`).subscribe((resp: any) => {
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
