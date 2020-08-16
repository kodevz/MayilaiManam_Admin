import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BloodDonarsService } from 'src/app/shared/blood-donars/blood-donars.service';
import { Observable } from 'rxjs';
import { AdPostService } from 'src/app/shared/ad-post/ad-post.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
    selector: 'create-ad-post',
    templateUrl: './create-ad-post.component.html',
    styleUrls: ['./create-ad-post.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateAdPostComponent implements OnInit {

    _adPost: any;

    @Input() set adPost(val: string) {
        this._adPost = val;
        this.editAdPost();
    }

    get adPost(): string {
        return this._adPost;
    }

    @Output() onDataTableReload: any = new EventEmitter<boolean>();

    adPostForm: FormGroup;

    expand: boolean = false;

    constructor(
        public formBuilder: FormBuilder,
        public adPostService: AdPostService,
        public domSanitizer: DomSanitizer
    ) { }

    ngOnInit() {

        this.adPostForm = this.formBuilder.group({
            id: [''],
            ad_title: ['', Validators.required],
            ad_subtitle: ['', Validators.required],
            ad_content: ['', Validators.required],
            ad_image: [''],
            ad_by: [''],
            ad_post_date: [new Date, Validators.required],
            ad_visible_days: [''],
            ad_status: [''],
            ad_image_url: [''],
        });
    }


    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.adPostForm.get('ad_image').setValue(file);
           
            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onload = (e) => { 
                this.adPostForm.get('ad_image_url').setValue(reader.result);
            }
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


    createAdPost() {

        let formData = new FormData;

        Object.keys(this.adPostForm.value).forEach((val, key) => {
            const value = this.adPostForm.value[val];
            if (Array.isArray(value)) {
                this.createFormData(formData, val, value);
            } else {
                formData.append(val, this.adPostForm.value[val])
            }
        });

        formData.append('ad_image', this.adPostForm.get('ad_image').value);

        this.adPostService.adPost(formData).subscribe((resp: any) => {
            this.onDataTableReload.emit(true);
            this.successMsg();
            this.reset();
        }, () => this.errorMsg() );
    }

    editAdPost() {
        const bloodDonar: any = this.adPost;
        Object.keys(this.adPostForm.value).forEach((key, i) => {
            if (this.adPost[key]) {
                this.adPostForm.get(key).patchValue(this.adPost[key])
            }
        });

        this.adPostForm.get('ad_image_url').patchValue(this.domSanitizer.bypassSecurityTrustUrl(this.adPost['ad_image']));
    }

    reset() {
        this.adPostForm.reset();
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
