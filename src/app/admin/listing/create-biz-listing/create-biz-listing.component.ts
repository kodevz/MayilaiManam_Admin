import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith, debounceTime, tap, switchMap, finalize, mapTo, filter } from 'rxjs/operators';
import { ApiHosts } from 'src/environments/environment';
import { CategoryService } from 'src/app/shared/category/category.service';
import { HttpClient } from '@angular/common/http';
import { Key } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
export interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'create-biz-listing',
    templateUrl: './create-biz-listing.component.html',
    styleUrls: ['./create-biz-listing.component.scss'],
    encapsulation:ViewEncapsulation.None
})
export class CreateBizListingComponent implements OnInit {

    bizListingForm: FormGroup;

    openingTimes: Array<OpeningTimesOptions> = new Array<OpeningTimesOptions>()

    @Output() onDataTableReload: any = new EventEmitter<boolean>();

    _listingData: any;

    expand:boolean = false;

    @Input() set listingData(val: string) {
        this._listingData = val;

        this.showListing();
    }

    get listingData(): string {
        return this._listingData;
    }

    selectedValue: string;
    selectedCar: string;

    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    visible = true;
    visible1 = true;
    selectable = true;
    selectable1 = true;
    removable = true;
    removable1 = true;
    addOnBlur = true;
    addOnBlur1 = true;
    separatorKeysCodes: number[] = [ENTER];

    relCategoryCtrl = new FormControl();
    categoryFormCtrl = new FormControl();
    filteredCategories: Array<any> = new Array<any>();
    choosesRelCategories: string[] = [];
    categories: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
    isLoading = false;
    errorMsg: string;

    categories$: Observable<any>;

    @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
    @ViewChild('categoryAutoComplete', { static: false }) categoryAutoComplete: MatAutocomplete;
    openTimes: FormArray;
    public listingForm: FormGroup;
    isVerified:Boolean = false;
    constructor(public api: ApiService, public formBuilder: FormBuilder, public categoryService: CategoryService, public http: HttpClient, public domSanitizer: DomSanitizer) {



        this.relCategoryCtrl.valueChanges
            .pipe(
                debounceTime(500),
                tap(() => {
                    this.errorMsg = "";
                    this.filteredCategories = [];
                    this.isLoading = true;
                }),
                switchMap(value => this.categoryService.categorySearch(value)
                    .pipe(
                        finalize(() => {
                            this.isLoading = false
                        }),
                    )
                )
            )
            .subscribe((data: any) => {
                this.errorMsg = "";

                const filterData = data.filter((cat) => {
                    let index = this.choosesRelCategories.findIndex((rel: any) => rel.id == cat.id);
                    if (index == -1) {
                        return cat;
                    }
                });

                this.filteredCategories = filterData;
            });

        this.categories$ = this.categoryService.parentCategories();

       

    }

    step = 0;

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

    add(event: MatChipInputEvent): void {
        console.log(event.value)
        // Add fruit only when MatAutocomplete is not open
        // To make sure this does not conflict with OptionSelected Event
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            // Add our fruit
            if ((value || '').trim()) {
                this.choosesRelCategories.push(value.trim());
            }

            // Reset the input value
            if (input) {
                input.value = '';
            }

            this.relCategoryCtrl.setValue(null);
        }
    }

    remove(fruit: string): void {
        const index = this.choosesRelCategories.indexOf(fruit);

        if (index >= 0) {
            this.choosesRelCategories.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        console.log(event.option.viewValue)
        this.choosesRelCategories.push(event.option.value);
        console.log(this.choosesRelCategories)
        this.fruitInput.nativeElement.value = '';
        this.relCategoryCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.categories.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

    ngOnInit(): void {

        this.intiForm();
    }

    intiForm() {
        this.bizListingForm = this.formBuilder.group({
            id: '',
            title: [null, Validators.required],
            short_description: [''],
            slug: [''],
            since: [new Date()],
            category_id: ['', Validators.required],
            banner_image: [''],
            banner_image_url: [''],
            relevant_categories: [''],
            door_no: [''],
            address_line_1: [''],
            city: [''],
            state: [''],
            country: [''],
            zipcode: [''],
            description: [''],
            mobile_no: [''],
            telephone_no: [''],
            phone_afterhours: [''],
            business_mail: [''],
            website: [''],
            latitude: [''],
            longitude: [''],
            facebook: [''],
            twitter: [''],
            google_map_url: [''],
            services: [''],
            status: ['', Validators.required],
            opening_times: this.formBuilder.array([]),
            is_verified: [false]

        });
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.openTimes = this.bizListingForm.get('opening_times') as FormArray;
        for (let index = 0; index < days.length; index++) {
            let dayfb = this.createOpenTimesFormBuilder();

            dayfb.get('weekday').setValue(days[index]);
            this.openTimes.push(dayfb);
            
        }
    }



    createOpenTimesFormBuilder(): FormGroup {
        return this.formBuilder.group({
            id: '',
            weekday: '',
            start: '',
            end: '',
        });
    }

   
    onFileSelect(event) {
         if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.bizListingForm.get('banner_image').setValue(file);
           
            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onload = (e) => { 
                this.bizListingForm.get('banner_image_url').setValue(reader.result);
            }
        }
    }

    errorHandler(event) {
        console.debug(event);
        event.target.src = "https://cdn.browshot.com/static/images/not-found.png";
    }

    getFormData(formData, data, previousKey) {
        if (data instanceof Object) {
            Object.keys(data).forEach(key => {
                const value = data[key];
                if (value instanceof Object && !Array.isArray(value)) {
                    return this.getFormData(formData, value, key);
                }
                if (previousKey) {
                    key = `${previousKey}[${key}]`;
                }
                if (Array.isArray(value)) {
                    value.forEach(val => {
                        formData.append(`${key}[]`, val);
                    });
                } else {
                    formData.append(key, value);
                }
            });
        }
    }

    createFormData(formData, key, data) {
        if (data === Object(data) || Array.isArray(data)) {
            for (var i in data) {
                this.createFormData(formData, key + '[' + i + ']', data[i]);
            }
        } else {
            formData.append(key, data);
        }

        return formData;
    }

    createBizListing() {

       
        this.bizListingForm.value.relevant_categories = this.choosesRelCategories.map((cat: any) => {
            return cat.id;
        })

        let formData = new FormData;

        Object.keys(this.bizListingForm.value).forEach((val, key) => {
            const value = this.bizListingForm.value[val];
            if (Array.isArray(value)) {
                this.createFormData(formData, val, value);
            } else {
                
                if (val == 'is_verified') {
                   formData.append('is_verified', this.isVerified  ? '1' : '0');
                } else {
                    formData.append(val, this.bizListingForm.value[val])
                }   
            }
        });

        formData.append('banner_image', this.bizListingForm.get('banner_image').value);
        // formData.delete('image');
        // formData.delete('icon_image');
        this.categoryService.listingPost(formData).subscribe((resp: any) => {
            this.reset();
            this.onDataTableReload.emit(true);
            this.expand= false;
            this.choosesRelCategories = [];
            this.successMsg();
        },
            () => {
                this.errorMessage();
            });
    }

    isVerifiedSet(ev) {
        console.log(ev)
        //this.bizListingForm.get('is_verified').patchValue(ev)
    }

    showListing() {
        
        this.reset();
        this.expand = true;
       
        const listingData: any = this.listingData;
         
        Object.keys(this.bizListingForm.value).forEach((key, i) => {
            if (this.listingData[key]) {
                this.bizListingForm.get(key).patchValue(this.listingData[key] == 'null' ? null : this.listingData[key])
            }

            if (key == 'is_verified') {
                console.log(this.isVerified)
                this.isVerified = this.listingData[key] == '1' ? true : false;
                this.bizListingForm.get(key).patchValue(this.listingData[key] == '1' ? true : false)
            }
        });

        this.bizListingForm.get('since').setValue(new Date(listingData.since));
        this.choosesRelCategories = [];
        
        if (listingData.listing_category.length) {
            listingData.listing_category.map((val) => {
                if (val.category.parent_id) {
                    this.choosesRelCategories.push(val.category);
                } else {
                    this.bizListingForm.get('category_id').patchValue(val.category.id);
                    // this.selectedValue = val.category.name;
                    // this.selectedValue = val.category.name;
                }
            })
        }
      
        

        this.bizListingForm.get('relevant_categories').patchValue(this.choosesRelCategories.map((val: any) => val.id));
        this.bizListingForm.get('banner_image_url').setValue(this.domSanitizer.bypassSecurityTrustUrl(this.bizListingForm.value.banner_image));

        console.log(this.bizListingForm);
    }

    reload() {
        this.bizListingForm.reset();
        this.onDataTableReload.emit(true);
    }

    reset() {
        this.bizListingForm.reset();
        this.choosesRelCategories = [];
        this.intiForm();
    }

    successMsg() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
    
    errorMessage() {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 1500
        })
    }

}

export class OpeningTimesOptions {

    public id: any;

    public listing_id: any;

    public weekday: string;

    public start: string;

    public end: string;
}


