import { Injectable, ComponentFactoryResolver, Type, ComponentFactory, QueryList } from '@angular/core';
import { Page } from './model/page';
import { DTPageOptions, ExportOptions } from './model/dtoptions';
import { HttpClient } from '@angular/common/http';

import { ConfirmationService } from 'primeng/api';


import { Table } from 'primeng/table';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { ApiHosts } from 'src/environments/environment';
import { MultiselectComponent } from 'src/app/components/multiselect/multiselect.component';
import { GlobalService } from '../global/global.service';


@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  // public confirmationService = new ConfirmationService;

  frozenWidth: string = '200px';

  toggleSelected: any[];

  toggleColIndexes: number[];

  toggleColIndexes$:BehaviorSubject<number>;

  constructor(public http: HttpClient) {

    

  }

  public updatePageInfo(target, pagedData: any) {
    target.page.totalElements = pagedData.recordsTotal;
    target.page.pageNumber = !target.page.pageNumber ? 0 : target.page.pageNumber;
  
  }


  public onSearch(target, evt, callbackFn: () => void) {
    if (evt.which !== 13) {
      return false;
    }
    target.page.search = evt.target.value;
    target.page = target.page;
    callbackFn();
  }

  public onSort(target, evt, callbackFn: () => void) {
    target.loading = true;
    target.page.sorts = evt.sorts;
    callbackFn();
  }


  selectAllRows(target, evt, allRowsSelected) {

    // target.allRowsSelected = allRowsSelected;

    // $('.row-checkbox:checkbox').prop('checked', false);
    // if (target.allRowsSelected) {
    //   $('.row-checkbox:checkbox').each((i, e) => {
    //     let checkbox: HTMLElement = e as HTMLElement;
    //     checkbox.click();
    //   });
    // }
  }

  dtColumns(target) {
    return target.columns.filter(col => !col.frozencol)
  }

  frozenColumns(target) {
    return target.columns.filter(col => col.frozencol)
  }

  toggleColumns(target) {
    return target.columns.filter(col => !col.toggle)
  }

  setToggleSelected(columns) {
    this.toggleSelected = columns.filter(col => col.toggle)
    this.toggleColumnIndexes(columns);
   
  }

  toggleColumnIndexes(columns) {
    
    this.toggleColIndexes = columns.map((col, i) => col.toggle ? i : undefined).filter(v => v);
    
    
  } 
  



  onOptionsMerge(target, dtEvent: DTPageOptions) {

    
  
    
    let dtPageOptions = dtEvent;

    let eventOrigin = target.dtPageOptions.eventOrigin;

    dtPageOptions.columns = target.dtPageOptions.columns;

    dtPageOptions.rows = dtEvent.rows ? dtEvent.rows : target.dtPageOptions.rows;

    dtPageOptions.first = target.dtPageOptions.eventOrigin == 'filter' ? 0 : dtEvent.first;

    dtPageOptions.filters = dtEvent.filters;

    dtPageOptions.multiSortMeta = dtEvent.multiSortMeta ? dtEvent.multiSortMeta : target.dtPageOptions.multiSortMeta;

    dtPageOptions.globalFilter = dtEvent.globalFilter ? dtEvent.globalFilter : target.dtPageOptions.globalFilter;

    dtPageOptions.ParamId = dtEvent.ParamId ? dtEvent.ParamId : target.dtPageOptions.ParamId;

    dtPageOptions.eventOrigin = eventOrigin;

    dtPageOptions.stateKey = target.dtPageOptions.stateKey;
    
    

    return dtPageOptions;
  }

  
  


  updatePageOptions(dtEvent): DTPageOptions {

    
    let dtPageOptions = dtEvent;

    dtPageOptions.exportOptions = new ExportOptions()

    dtPageOptions.rows = dtEvent.rows;

    dtPageOptions.first = dtEvent.first;

    dtPageOptions.filters = dtEvent.filters;

    dtPageOptions.multiSortMeta = dtEvent.multiSortMeta;

    dtPageOptions.globalFilter = dtEvent.globalFilter;

    dtPageOptions.ParamId = dtEvent.ParamId;

    dtPageOptions.eventOrigin = "";
    
    return dtPageOptions;
  }

  sumOf(target): any{
    
    let sumofCol:any = target.columns.find(item => item.sumof )
    sumofCol.footer = this.sumOfKeys(target.rows, sumofCol.field);
    //target.rows.map(row => row[sumofCol.field] ).reduce((a, b) => parseFloat(a) +  parseFloat(b), 0).toFixed(3);
    return this;
  }

  sumOfKeys(arr: Array<any>, key: string, isFixed:boolean = true): any {

    let mapValues = arr.map(row => row[key] ).filter(row => (row != '-' && row != '')  ).reduce((a, b) => parseFloat(a) +  parseFloat(b), 0)
    
    if(isFixed){
      return mapValues.toFixed(3);
    }

    return mapValues;
      
  }

  average(sumOf, noOf) {
      return  (sumOf/noOf).toFixed(3) ;
  }

  averageByKey(arr: Array<any>, key: string) {

  }

  percentage(numerator: number, denominator: number) {
      return (numerator/denominator) * 100
  }



  onToggle(target, event) {
    target.columns.find(item => item.field == event.itemValue.field).toggle = !event.itemValue.toggle;

    
    this.toggleColumnIndexes(target.columns);
    
    this.setFrozenWidth(target);

    
    // if(target.getTableElement){
    //   let table:HTMLTableElement = target.getTableElement().tableViewChild;
    
    //   let tbody = table.querySelectorAll('tbody');
    //   //let tbody = table.tBodies;
    //   console.log(tbody)

    // }

  
  }

  setFrozenWidth(target) {

    this.frozenWidth = (100 / target.columns.filter(col => !col.toggle).length) + '%';
  }

  export(dtOptions: DTPageOptions) {

    
    
    dtOptions.customFilters = {
      project_id : {
        matchMode : 'in',
        value : [localStorage.getItem('projectId')]
      },
      ...dtOptions.customFilters
    }

  
   
  }

  createLazyLoadMetadata(dtOptions, table:Table) : DTPageOptions {

   
      let dtPageOptions = dtOptions;

      dtPageOptions.first = table.first;

      dtPageOptions.rows = table.virtualScroll ? table.rows * 2: table.rows

      dtPageOptions.sortField = table.sortField;
      
      dtPageOptions.sortOrder = table.sortOrder;

      dtPageOptions.filters = {...dtOptions.filters,...table.filters};

      dtPageOptions.multiSortMeta = table.multiSortMeta;

      dtPageOptions.globalFilter = table.filters && table.filters['global'] ? table.filters['global'].value : null;

      return dtPageOptions;


      // first: this.first,
      // rows: this.virtualScroll ? this.rows * 2: this.rows,
      // sortField: this.sortField,
      // sortOrder: this.sortOrder,
      // filters: this.filters,
      // globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
      // multiSortMeta: this.multiSortMeta

  }


  stateInit(source, table: Table, multiSelectFilter:QueryList<MultiselectComponent>, dtPageOptions?: DTPageOptions) {

      if(!dtPageOptions.stateKey) {
          return true;
      }

    
      let state:DTPageOptions =  JSON.parse(localStorage.getItem(dtPageOptions.stateKey))
     
      if(!state) {
          return true;
      }
      
      let filters:any = state.filters;
      multiSelectFilter.toArray().map( comp => {
       
          if(filters[comp.name]){
              comp.setValue({
                  value: filters[comp.name]['value'],
                  label: 'Select'
              }, 'off')
          }
      })

      table.filters = filters;
  }

  stateSave(dtPageOptions: DTPageOptions) : DTPageOptions {

    
      if(!dtPageOptions.stateKey) {
          return dtPageOptions;
      }

      localStorage.setItem(dtPageOptions.stateKey,JSON.stringify(dtPageOptions))
      return dtPageOptions;
  }

  hasStateStore(dtPageOptions: DTPageOptions) {
    if(!dtPageOptions.stateKey) {
        return false;
    }

    let state:DTPageOptions = this.getState(dtPageOptions.stateKey);

    if(!state) {
        return false;
    }

    return state;

  }

  getState(key: string): DTPageOptions {
    return JSON.parse(localStorage.getItem(key))
  }

  stateRestore(this, dtOptions, table: Table) {

  }
  // stateRestore(this, dtOptions, table:Table) : DTPageOptions {

  //     let dtPageOptions = dtOptions;

  //     dtPageOptions.first = table.first;

  //     dtPageOptions.rows = table.virtualScroll ? table.rows * 2: table.rows

  //     dtPageOptions.sortField = table.sortField;
      
  //     dtPageOptions.sortOrder = table.sortOrder;

  //     dtPageOptions.filters = {...dtOptions.filters,...table.filters};

  //     dtPageOptions.multiSortMeta = table.multiSortMeta;

  //     dtPageOptions.globalFilter = table.filters && table.filters['global'] ? table.filters['global'].value : null;

  //     return dtPageOptions;
  // }




}


