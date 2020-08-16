import { Component, OnInit, ViewChild, QueryList, ViewChildren, Input, ElementRef, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SelectItem, LazyLoadEvent } from 'primeng/api';


import { MultiselectComponent } from 'src/app/components/multiselect/multiselect.component';
import { Calendar } from 'primeng/Calendar';
import { DTPageOptions, ColumnFilterOptions } from 'src/app/shared/datatable/model/dtoptions';
import { Table } from 'primeng/table';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/shared/api/api.service';
import { Select2Service } from 'src/app/shared/select2/select2.service';
import { DatatableService } from 'src/app/shared/datatable/datatable.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/shared/category/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { setTimeout } from 'timers';
import { last } from 'rxjs/operators';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    animations: [routerTransition()]
})
export class CategoryComponent implements OnInit {



    cols: any[];

    loading: boolean = false;

    totalRecords: number;

    readonly stateKey = "_MM_CategoryComponent";

    readonly rowsLength = 15;

    @ViewChild('categoryTable', {static: false}) private _categoryTable: Table;

    @ViewChild('addCategoryDiv', {static: false}) private addCategoryDiv: ElementRef;

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


    categoryForm: FormGroup;

    errorMsgs: { [key: string]: any };

    constructor(public http: HttpClient, private el: ElementRef, public datatableService: DatatableService,public categoryService: CategoryService,
        public api: ApiService, public s2Service: Select2Service, public formBuilder: FormBuilder, public modalService: NgbModal,
        private _snackBar: MatSnackBar) {


    }

    ngOnInit() {


        this.dtPageOptions.rows = 15;
        this.columns = [

            {
                header: 'Category', field: 'name',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'name',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('categories').setValue('name').create()
                }
            },
            {
                header: 'Child Categories', field: 'child_categories',
                sortable: true, globalsearch: false, coloumnsearch: false, toggle: false,
                filterOptions: <ColumnFilterOptions>{
                    datatype: 'select2',
                    groupId: '#columnMultiSelectFilter',
                    filterkey: 'slug',
                    filterConstraint: 'in',
                    remoteOptions: this.s2Service.setTable('categories').setValue('slug').create()
                }
            },
        ];

        this.dtPageOptions.columns = this.columns;
        this.selectedColumns = this.columns;


        this.categoryForm = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            icon_url: [''],
            image_url: [''],
        });

    }




    initCategory(dtEvent: DTPageOptions) {
        this.loading = true;
        dtEvent = this.datatableService.onOptionsMerge(this, dtEvent);
        let storedDtEvent = JSON.parse(localStorage.getItem(this.stateKey));
        if (storedDtEvent) {
            dtEvent.first = storedDtEvent.first ? storedDtEvent.first : dtEvent.first;
            dtEvent.to = storedDtEvent.to ? storedDtEvent.first : dtEvent.to;
        }

        let lastDtEvent = Object.create(dtEvent);
        this.categoryService.categoryList(dtEvent).subscribe((resp: any) => {
            this.rows = resp.data;
            this.dtPageOptions = this.datatableService.updatePageOptions(dtEvent);
            this.dtPageOptions.totalElements = resp.recordsTotal;
            this.dtPageOptions.sno = 1;
            this.dtPageOptions.from = lastDtEvent.first + 1;
            this.dtPageOptions.to = lastDtEvent.first + this.dtPageOptions.rows;
            this.loading = false;
        });

        
    }

    saveCategory() {
        this.api.post('api', 'category/create', this.categoryForm.value).subscribe((resp: any) => {
            this.reload();
           
        }, (error: any) => {
                 this.errorMsgs = error.error.error;
        });
    }

    showCategory(content, category) {
        this.categoryForm.patchValue({
            id: category.id,
            name: category.name,
            slug: category.slug,
            icon_url: category.icon_url
        });
        
        this.openCategoryModal(content);
    }

    openCategoryModal(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    }

    reload() {
        this.categoryForm.reset();
        this.mutliSelectFilter.toArray().map((comp) => comp.reset())
        // this._categoryTable.reset();
        this.initCategory(this.dtPageOptions)
        
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
            this.api.get('api', `category/${id}/delete`).subscribe((resp: any) => {
                if (resp.status) {
                    this.swalMessage('success', resp.msg);
                }
                this.reload();
            }, (error: any) => {
                this.errorMsgs = error.error.error;
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


export class Car {
    vin: string;
    year: string;
    brand: string;
    color: string;
}