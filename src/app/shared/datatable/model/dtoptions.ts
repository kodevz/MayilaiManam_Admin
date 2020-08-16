import { GlobalService } from '../../global/global.service';


export class ColumnFilterOptions {

    datatype: string;

    groupId?: string;

    filterkey?: string;

    filterConstraint: string;

    remoteOptions: ColumnRemoteOptions;
}


export class ColumnRemoteOptions {

    endpoint: string;

    name?: string;

    value: string;

    label: string;

    table: string;

    orderby?: string;

}


export class DTPageOptions {

    columns: Array<any> = new Array<any>();

    filters: Object = new Object();
    
    sno : number = 0;

    from: number = 0;

    to: number = 0;

    globalFilter: any = null;

    multiSortMeta: any = undefined;

    first: number = 0;

    rows: number = 15;

    sortField: any = undefined;

    sortOrder: number = 1;

    totalElements: number = 15;

    search: any = '';

    exportOptions: ExportOptions = new ExportOptions();

    ParamId: ParamId = new ParamId();

    customFilters: Object = new Object();

    eventOrigin:string = '';

    mimetype:any;

    stateKey:string= '';

    stateEnabled: boolean = true;

    public setFirst(value):void {
        this.first = value;
    }

}


export class ExportOptions {

    exports: boolean = true;

    mimetype: string = 'csv';

    endpoint: string = '';

    modelName?: string;

}

export class ParamId {

    paramColumn: string = '';

    paramId:number;

}

export class CustomFilterOptions {
    
}