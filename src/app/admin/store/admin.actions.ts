import { Action } from '@ngrx/store';

export class ActionEx implements Action {
    readonly type;
    public payload;
}

export enum DataTableActionTypes  {
    Add = '[Datatable] State'
}


export class DatatableType implements ActionEx {
    readonly type  = DataTableActionTypes.Add;

    constructor(public payload:any) {
        
    }
}
