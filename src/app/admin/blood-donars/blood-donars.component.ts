import { Component, OnInit, ViewEncapsulation, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { DTPageOptions, ColumnFilterOptions } from 'src/app/shared/datatable/model/dtoptions';
import { ApiService } from 'src/app/shared/api/api.service';
import { Select2Service } from 'src/app/shared/select2/select2.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { BloodDonarsService } from 'src/app/shared/blood-donars/blood-donars.service';
import { CreateBloodDonarsComponent } from './create-blood-donars/create-blood-donars.component';
import { MultiselectComponent } from 'src/app/components/multiselect/multiselect.component';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-blood-donars',
    templateUrl: './blood-donars.component.html',
    styleUrls: ['./blood-donars.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BloodDonarsComponent implements OnInit {

    readonly stateKey = '__MM__BloodDonarsComponent';

    dtPageOptions = new DTPageOptions();

    columns: Array<any> = new Array();

    selectedColumns: Array<any> = new Array();

    bloodDonarForm: FormGroup;

    loading: boolean = false;

    rows = [];

    @ViewChild('createBloodDonarComp', { static: false }) createBloodDonarComp : CreateBloodDonarsComponent;

    @ViewChildren('columnMultiSelectFilter') mutliSelectFilter: QueryList<MultiselectComponent>;

    @ViewChild('bloodDonarTable', { static: false }) private _bloodDonarTable: Table;

    constructor(
        public api: ApiService,
        public s2Service: Select2Service,
        public datatableService: DatatableService,
        public formBuilder: FormBuilder,
        public modalService: NgbModal,
        public bloodDonarService: BloodDonarsService
    ) { }

    ngOnInit() {
        this.dtPageOptions.rows = 15;
        this.columns = [

            {
                header: 'Donar Name', field: 'donar_name',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'donar_name',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('blood_donars').setValue('donar_name').create()
                }
            },
            {
                header: 'Donar Code', field: 'donar_code',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'donar_code',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('blood_donars').setValue('donar_code').create()
                }
            },

            {
                header: 'Phone Number', field: 'phone_number',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'phone_number',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('blood_donars').setValue('phone_number').create()
                }
            },
            {
                header: 'Address', field: 'address',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'address',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('blood_donars').setValue('address').create()
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
                    remoteOptions: this.s2Service.setTable('blood_donars').setValue('status').create()
                }
            },
        ];

        this.dtPageOptions.columns = this.columns;
        this.selectedColumns = this.columns;


        
    }

    initBloodDonars(dtEvent: DTPageOptions) {
        this.loading = true;
        let storedDtEvent = JSON.parse(localStorage.getItem(this.stateKey));
        if (storedDtEvent) {
            dtEvent.first = storedDtEvent.first ? storedDtEvent.first : dtEvent.first;
            dtEvent.to = storedDtEvent.to ? storedDtEvent.first : dtEvent.to;
        }
        dtEvent = this.datatableService.onOptionsMerge(this, dtEvent);
        let lastDtEvent = Object.create(dtEvent);
        
        this.bloodDonarService.donarsList(dtEvent).subscribe((resp: any) => {
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
        // this._bloodDonarTable.reset();
        this.initBloodDonars(this.dtPageOptions)
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
            this.api.get('api', `blood-donar/${id}/delete`).subscribe((resp: any) => {
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
