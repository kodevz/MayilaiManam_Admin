import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BloodDonarsService } from 'src/app/shared/blood-donars/blood-donars.service';
import { Observable } from 'rxjs';
import { ManageUserService } from 'src/app/shared/manager-user/manage-user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
    selector: 'create-manage-users',
    templateUrl: './create-manage-users.component.html',
    styleUrls: ['./create-manage-users.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateManageUsersComponent implements OnInit {

    _user: any;

    @Input() set user(val: string) {
        this._user = val;
        this.editUser();
    }

    get user(): string {
        return this._user;
    }

    @Output() onDataTableReload: any = new EventEmitter<boolean>();

    userForm: FormGroup;

    bloodGroups$: Observable<any>;

    expand: boolean = false;


    dropdownList = [];
    selectedItems = [];
    dropdownSettings = <IDropdownSettings>{};

    constructor(
        public formBuilder: FormBuilder,
        public manageUserService: ManageUserService
    ) { }

    ngOnInit() {

        this.dropdownList = [
            { item_id: 1, item_text: 'Mumbai' },
            { item_id: 2, item_text: 'Bangaluru' },
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' },
            { item_id: 5, item_text: 'New Delhi' }
        ];
        this.selectedItems = [
            { item_id: 3, item_text: 'Pune' },
            { item_id: 4, item_text: 'Navsari' }
        ];
        this.dropdownSettings = <IDropdownSettings>{
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };

        this.userForm = this.formBuilder.group({
            id: [''],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required],
            password: [''],
            c_password: [''],
            //roles: ['', Validators.required],
            confirmed: [''],
            confirmation_code: [''],
            active: [''],
        });
    }

    onItemSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }

    createUser() {

        this.manageUserService.userPost(this.userForm.value).subscribe((resp: any) => {
            this.onDataTableReload.emit(true);
            this.userForm.reset();
            this.successMsg();
        }, () => this.errorMsg());
    }

    editUser() {
        console.log(this.user);
        const user: any = this.user;
        Object.keys(this.userForm.value).forEach((key, i) => {
            if (this.user[key]) {
                this.userForm.get(key).patchValue(this.user[key])
            }
        });
    }

    reset() {
        this.userForm.reset();
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
