import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/category/category.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateCategoryComponent implements OnInit {

    _category:any;

    @Input() set category(val: string) {
        this._category = val;
        this.editCategory();
    }

    get category(): string {
        return this._category;
    }

    @Output() onDataTableReload: any = new EventEmitter<boolean>();

    categoryForm : FormGroup;

    categories$:Observable<any>;

    expand:boolean = false;

    constructor(
        public formBuilder: FormBuilder,
        public categoryService: CategoryService,
        public domSanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.categories$ = this.categoryService.parentCategories();
        this.categoryForm = this.formBuilder.group({
            id: [''],
            name: [null, Validators.required],
            slug: [''],
            is_parent: [false],
            parent_id: [null],
            icon_image: [''],
            icon_url: ['', Validators.required],
            image: [''],
            image_url: ['', Validators.required],
        });
    }

    createCategory() {

        let formData = new FormData;

        Object.keys(this.categoryForm.value).forEach((val, key) => {
            const value = this.categoryForm.value[val];
            if (Array.isArray(value)) {
                this.createFormData(formData, val, value);
            } else {
                formData.append(val, this.categoryForm.value[val])
            }
        });
        formData.delete('image');
        formData.delete('icon_image');
        
        this.categoryService.categoryPost(formData).subscribe((resp: any) => {
            this.categoryForm.reset();
            this.onDataTableReload.emit(true);
            this.successMsg();
        },(error: any) => {
            this.errorMsg();  
        });
    }

    editCategory() {
        this.reset();
        const category: any = this.category;
        console.log(this.category)
        Object.keys(this.categoryForm.value).forEach((key, i) => {
            if (this.category[key]) {
                this.categoryForm.get(key).patchValue(this.category[key])
            }
        });   
        this.categoryForm.get('is_parent').patchValue(!this.categoryForm.value.parent_id ? true : false);
        this.categoryForm.get('parent_id').patchValue(parseInt(category.parent_id));
        this.categoryForm.get('image').patchValue(this.domSanitizer.bypassSecurityTrustUrl(this.categoryForm.value.image_url));
        this.categoryForm.get('icon_image').patchValue(this.domSanitizer.bypassSecurityTrustUrl(this.categoryForm.value.icon_url));
    }


    onImageSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.categoryForm.get('image_url').setValue(file);

            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onload = (e) => { 
                this.categoryForm.get('image').setValue(reader.result);
            }
        }
    }

    onIconSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.categoryForm.get('icon_url').setValue(file);

            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onload = (e) => { 
                this.categoryForm.get('icon_image').setValue(reader.result);
            }
        }
    }

    errorHandler(event, placeholderText?:string) {
        console.debug(event);
        event.target.src = `https://fakeimg.pl/500x200/?text=${placeholderText}`;
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

    reset() {
        this.categoryForm.reset();
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
    
    errorMsg() {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
