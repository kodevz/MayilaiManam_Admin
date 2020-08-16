import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BloodDonarsService } from 'src/app/shared/blood-donars/blood-donars.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'create-blood-donars',
    templateUrl: './create-blood-donars.component.html',
    styleUrls: ['./create-blood-donars.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateBloodDonarsComponent implements OnInit {

    _bloodDonar:any;

    @Input() set bloodDonar(val: string) {
        this._bloodDonar = val;
        this.editBloodDonar();
    }

    get bloodDonar(): string {
        return this._bloodDonar;
    }

    @Output() onDataTableReload: any = new EventEmitter<boolean>();

    bloodDonarForm : FormGroup;

    bloodGroups$:Observable<any>;

    expand:boolean = false;

    constructor(
        public formBuilder: FormBuilder,
        public bloodDonarService: BloodDonarsService
    ) { }

    ngOnInit() {

        this.bloodGroups$ = this.bloodDonarService.bloodGroups();
        this.bloodDonarForm = this.formBuilder.group({
            id: [''],
            donar_name: ['', Validators.required],
            donar_code: [''],
            phone_number: ['', Validators.required],
            mm_user_id: [''],
            address: ['', Validators.required],
            blood_group_id: ['',Validators.required],
            selectedBloodGroup:[''],
            status: ['', Validators.required],
        });
    }

    createBloodDonar() {
        this.bloodDonarService.donarPost(this.bloodDonarForm.value).subscribe((resp: any) => {
            this.onDataTableReload.emit(true);
            this.reset();
            this.successMsg();
        },(error: any) => {
            this.errorMsg();
        });
    }

    editBloodDonar() {
       
        const bloodDonar: any = this.bloodDonar;
        Object.keys(this.bloodDonarForm.value).forEach((key, i) => {
            if (this.bloodDonar[key]) {
                this.bloodDonarForm.get(key).patchValue(this.bloodDonar[key])
            }
        });  
        this.bloodDonarForm.get('blood_group_id').patchValue(parseInt(this.bloodDonar['blood_group_id']))
        
    }

    reset() {
        this.bloodDonarForm.reset();
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
