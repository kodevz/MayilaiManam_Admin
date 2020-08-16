import { NgModule, Component, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, Input, Output, Renderer2, EventEmitter,
    forwardRef, ViewChild, ChangeDetectorRef, TemplateRef, ContentChildren, QueryList, ContentChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
  import { trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
  import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
  import { ScrollingModule } from '@angular/cdk/scrolling';
  import { CommonModule } from '@angular/common';

import { SelectItem } from 'primeng/api';

import { ObjectUtils } from 'primeng/components/utils/objectutils';
// import { DomHandler } from 'primeng/dom/DomHandler';

// import { SelectItem } from 'primeng/api/selectitem';
import { ApiService } from 'src/app/shared/api/api.service';
import { SharedModule, PrimeTemplate, Footer } from 'primeng/components/common/shared';
import { DomHandler,  } from 'primeng/api';
//import { SharedModule, PrimeTemplate, Footer } from 'primeng/api/shared';


  
  export const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectComponent),
    multi: true
  };
  
  
  @Component({
    selector: 'multi-select-item',
    template: `
        <li class="ui-multiselect-item ui-corner-all" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)"
            [style.display]="visible ? 'block' : 'none'" [attr.tabindex]="option.disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'ui-state-highlight': selected, 'ui-state-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}"
            *ngIf = "!multiSelect">

            <div class="ui-chkbox ui-widget">
                <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"
                    [ngClass]="{'ui-state-active': selected}">
                    <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check': selected}"></span>
                </div>
            </div>
            <label *ngIf="!template">{{option.label}}</label>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
  
        <li class="ui-multiselect-item ui-corner-all" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)"
            [style.display]="visible ? 'block' : 'none'" [attr.tabindex]="option.disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'ui-state-highlight': selected, 'ui-state-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}" 
            *ngIf = "multiSelect">
            <div class="ui-chkbox ui-widget">
                <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"
                    [ngClass]="{'ui-state-active': selected}">
                    <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check': selected}"></span>
                </div>
            </div>
            <label *ngIf="!template">{{option.label}}</label>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `
  })
  export class MultiSelectItem {
    
    @Input()  multiSelect: boolean = true;
  
    @Input() option: SelectItem;
  
    @Input() selected: boolean;
  
    @Input() disabled: boolean;
  
    @Input() visible: boolean;
  
    @Input() itemSize: number;
  
    @Input() template: TemplateRef<any>;
  
    @Input() maxSelectionLimitReached: boolean;
  
    @Output() onClick: EventEmitter<any> = new EventEmitter();
  
    @Output() onKeydown: EventEmitter<any> = new EventEmitter();

    
  
    onOptionClick(event: Event) {
        
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
  
    
    onOptionKeydown(event: Event) {
  
        this.onKeydown.emit({
            originalEvent: event,
            option: this.option
        });
    }
  }
  
  
  
  @Component({
    selector: 'multi-select',
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.scss'],
    animations: [
        trigger('overlayAnimation', [
            state('void', style({
                transform: 'translateY(5%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus'
    },
    providers: [DomHandler,ObjectUtils,MULTISELECT_VALUE_ACCESSOR]
  })
  export class MultiselectComponent implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {
  
      @ViewChild('in', { static: false}) input : ElementRef;
  
  
  
      @Input() multiSelect: boolean =  true;

      @Input() onOptionClickEvent: boolean =  true;

    
  
      @Input() compId: string;
  
      @Input() scrollHeight: string = '250px';

      multiSelectLabel: string = 'Choose';
  
      _defaultLabel: string = 'Choose';

      
        initialSetLabel: string = '';
      
  
      @Input() set defaultLabel(val: string) {

        if(!this.initialSetLabel) {
            this.initialSetLabel = val;
        }

          this._defaultLabel = val;
          this.updateLabel();
      }
  
      get defaultLabel(): string {
          return this._defaultLabel;
      }
  
      @Input() style: any;
  
      @Input() styleClass: string;
      
      @Input() panelStyle: any;
  
      @Input() panelStyleClass: string;
  
      @Input() inputId: string;
  
      @Input() disabled: boolean;
  
      @Input() readonly: boolean;
      
      @Input() filter: boolean = true;
  
      @Input() filterPlaceHolder: string;
      
      @Input() overlayVisible: boolean;
  
      @Input() tabindex: number;
      
      @Input() appendTo: any;
      
      @Input() dataKey: string;
      
      @Input() name: string;

      @Input() id: string;
      
      @Input() displaySelectedLabel: boolean = true;
      
      @Input() maxSelectedLabels: number = 3;
      
      @Input() selectionLimit: number;
      
      @Input() selectedItemsLabel: string = '{0} items';
      
      @Input() showToggleAll: boolean = true;
      
      @Input() resetFilterOnHide: boolean = false;
      
      @Input() dropdownIcon: string = 'pi pi-caret-down';
      
      @Input() optionLabel: string;
  
      @Input() showHeader: boolean = true;
  
      @Input() autoZIndex: boolean = true;
      
      @Input() baseZIndex: number = 0;
  
      @Input() filterBy: string = 'label';
  
      @Input() virtualScroll: boolean;
  
      @Input() itemSize: number; 
  
      @Input() showTransitionOptions: string = '225ms ease-out';
  
      @Input() hideTransitionOptions: string = '195ms ease-in';
      
      @ViewChild('container', { static: false }) containerViewChild: ElementRef;
      
      @ViewChild('filterInput', { static: false }) filterInputChild: ElementRef;
  
      @ContentChild(Footer, { static: false }) footerFacet;
      
      @ContentChildren(PrimeTemplate) templates: QueryList<any>;
      
      @Output() onChange: EventEmitter<any> = new EventEmitter();
      
      @Output() onFocus: EventEmitter<any> = new EventEmitter();
  
      @Output() onBlur: EventEmitter<any> = new EventEmitter();
      
      @Output() onPanelShow: EventEmitter<any> = new EventEmitter();
      
      @Output() onPanelHide: EventEmitter<any> = new EventEmitter();

      @Output() onDataLoaded: EventEmitter<any> = new EventEmitter();

      @Output() onOkClicked:  EventEmitter<any> = new EventEmitter();

      @Output() onUnSelect:  EventEmitter<any> = new EventEmitter();

      @Output() onModelValue:  EventEmitter<any> = new EventEmitter();



      @Input() public value: any[];
      
      public onModelChange: Function = () => {};
      
      public onModelTouched: Function = () => {};
      
  
      overlay: HTMLDivElement;
      
      @Input() public valuesAsString: string;
      
      public focus: boolean;
  
      filled: boolean;
      
      public documentClickListener: any;
      
      public selfClick: boolean;
      
      public panelClick: boolean;
      
      public filterValue: string;
      
      public visibleOptions: SelectItem[];
      
      public filtered: boolean;
      
      public itemTemplate: TemplateRef<any>;
      
      public selectedItemsTemplate: TemplateRef<any>;
      
      public headerCheckboxFocus: boolean;
  
      public isDataLoaded: boolean = false;
      
      private allCheckedDisabled:boolean = false;
  
      @Input() remoteOptions: any;
  
     
  
      public _whenShow: string = 'pageload';
  
      @Input() set whenShow(val: string) {
        this._whenShow = val;
      }
  
      get whenShow(): string {
          return this._whenShow;
      }

      
  
      
     
      _setValue:any;
  
      _options: any[];
  
      _remoteOptions: any[];
      
      maxSelectionLimitReached: boolean;
  
      documentResizeListener: any;

      @Input() labelColor: boolean = true;
      

      @Input() remoteParams: any;

      @Input() showFooter: boolean = true;

      @Input() hideOnWinResize: boolean = false;

      @Input() filterSpecial:boolean = false;

      changedFilters:Array<string> = new Array<string>();

      @Input() required:boolean = false;


      public _patchValue:any;

      @Input() get patchValue():any {
            return this._patchValue;
      }

      set patchValue(value: any) {
          
      
          if(value) {

              
              setTimeout(() => {
                this.setValue({value: value, label: value},'off')
              },200)
              
             
              
          }else{
              this.defaultLabel = 'Select';
              this.reset();
          }
            this._patchValue =  value;
      }
      
      constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public objectUtils: ObjectUtils, private cd: ChangeDetectorRef, public api: ApiService) {}
      
      @Input() get options(): any[] {

          return this._options;
      }
  
      
      set options(val: any[]) {
          let opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
          this._options = opts;
          this.visibleOptions = this._options;
          this.updateLabel();
      }
  
      
  
  
      ngOnInit() {
          this._whenShow == 'pageload' ? this.updateOptions() : void 0;
      }
  
      updateOptions(){
        
  
          if(this.remoteOptions){

               
               
              let remoteOptions = { ...this.remoteOptions, ...this.remoteParams }

              

              this.api.post('api',this.remoteOptions.endpoint,remoteOptions).subscribe((resp: any) => { 
                  let opts = this.optionLabel ? ObjectUtils.generateSelectItems(resp, this.optionLabel) : resp;
                  this._options = opts;
                  this.visibleOptions = this.options;

                    setTimeout(()=>{
                        this.onDataLoaded.emit(this);
                    },1000)

                    if(this.whenShow == 'everyclick'){
                        this.isDataLoaded = false;
                    }else{
                        this.isDataLoaded = true;
                    }
                    
                    this.updateLabel();
              });
          }
        
      }
  
  
      
      ngAfterContentInit() {
          this.templates.forEach((item) => {
              switch(item.getType()) {
                  case 'item':
                      this.itemTemplate = item.template;
                  break;
                  
                  case 'selectedItems':
                      this.selectedItemsTemplate = item.template;
                  break;
                  
                  default:
                      this.itemTemplate = item.template;
                  break;
              }
          });
      }
      
      ngAfterViewInit() {
          if (this.overlayVisible) {
              this.show();
          }
      }
      
      ngAfterViewChecked() {
          if (this.filtered) {
              this.alignOverlay();
  
              this.filtered = false;
          }
      }
      
      writeValue(value: any) : void {
         
          this.value = value;
          this.updateLabel();
          this.updateFilledState();
          this.cd.markForCheck();
      }
      
      setDefaultLabel(value: string) {

        this.defaultLabel = value;

        return this;
      }


      setValue(value: any, emit?:any): void {

    

        
        this._setValue = value;

      
        if(!this._setValue.value){
            this.updateLabel();
            return;
        }
        
  
        if(!this.multiSelect) {
            this.value = [ this._setValue.value ]   
        }
        if(this.multiSelect) {
            this.value = this._setValue.value
           
        }

        this.defaultLabel = this._setValue.label ? this._setValue.label : this.defaultLabel;


      
       

        if(emit != 'off'){
            this.onModelChange({originalEvent: null, value: this.value, itemValue: this._setValue.value, selectOption : this._setValue});

            this.onModelValue.emit(this._setValue.value);

            this.onChange.emit({originalEvent: null, value: this.value, itemValue: this._setValue.value, selectOption : this._setValue});

           
        }

        if(emit === 'trigger') {
            this.onModelChange({originalEvent: null, value: this.value, itemValue: this._setValue.value, selectOption : this._setValue});
            setTimeout(() =>{this.valuesAsString =  this._setValue.label;}, 1) 
        }

        
       

        this.updateSetValueLabel();
     }

     updateSetValueLabel() {
        

         if(this.value.length > 1) {
            this.valuesAsString =  this.value.length + ' Items';
            return;
         }else{

         }

         this.valuesAsString =  this.value[0];


     }
  
      updateFilledState() {
          this.filled = (this.valuesAsString != null && this.valuesAsString.length > 0);
      }
      
      registerOnChange(fn: Function): void {
          this.onModelChange = fn;
      }
  
      registerOnTouched(fn: Function): void {
          this.onModelTouched = fn;
      }
      
      setDisabledState(val: boolean): void {
          this.disabled = val;
      }
      
      onOptionClick(event) {

        
        
          let option = event.option;
          if (option.disabled) {
              return;
          }
          
          let value = option.value;

          if(!this.changedFilters.length || this.changedFilters[0] != this.name) {
                this.changedFilters = [this.name]
          }
        
          let selectionIndex = this.findSelectionIndex(value);
          
          if(!this.multiSelect){

                if(event.originalEvent.target.textContent == ""){
                    this.value = []
                    
                    value = '';
                    this.onModelChange(null);
                    this.onModelValue.emit(value);
                    this.onChange.emit(null);

                    return true;
                }

                if(this.value != undefined && this.value.includes(value)) {
                    this.value = []
                    
                    value = '';
                    
                    
                    this.onUnSelect.emit({ originalEvent: event.originalEvent,value: this.value, itemValue: value, selectOption : event.option, _multiselect: this})
                    
                   
                    if(this.remoteParams && this.remoteParams.customFilters) {
                        if(this.remoteParams.customFilters[this.name]) {
                            delete this.remoteParams.customFilters[this.name];
                            this.updateOptions();
                        }
                    }
                   
                }else{
                   
                    this.value = [value]
                  
                    this.hide();

                    
                }

                
                this.onModelChange({originalEvent: event.originalEvent, value: this.value, itemValue: value, selectOption : event.option});
                this.onModelValue.emit(value);
                this.onChange.emit({originalEvent: event.originalEvent, value: this.value, itemValue: value, selectOption : event.option});
               
          }
  
          
          if(this.multiSelect){
              if (selectionIndex != -1) {
                  this.value = this.value.filter((val,i) => i != selectionIndex);
      
                  if (this.selectionLimit) {
                      this.maxSelectionLimitReached = false;
                  }
              }
              else {
                  if (!this.selectionLimit || (this.value.length < this.selectionLimit)) {
                      this.value = [...this.value || [], value];
                  }
      
                  if (this.selectionLimit && this.value.length === this.selectionLimit) {
                      this.maxSelectionLimitReached = true;
                  }
              }


             
              this.onModelChange({originalEvent: event.originalEvent, value: this.value, itemValue: value, selectOption : event.option});
              this.onModelValue.emit(value);
              this.onChange.emit({originalEvent: event.originalEvent, value: this.value, itemValue: value, selectOption : event.option});
      
             
          }   
          
  
          
         
         
         
          
       
        
      
       
        this.updateLabel();
        this.updateFilledState();
      }

      visibleItemsChanged() {
          
      }
      
      isSelected(value) {
          
          return this.findSelectionIndex(value) != -1;
      }
      
      findSelectionIndex(val: any): number {
          let index = -1;
          
          if (this.value) {
              for (let i = 0; i < this.value.length; i++) {
                  if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                      index = i;
                      break;
                  }
              }
          }
      
          return index;
      }
      
      toggleAll(event) {
          if (this.isAllChecked()) {
              this.value = [];
          }
          else {
              let opts = this.getVisibleOptions();
              if (opts) {
                  this.value = [];
                  for (let i = 0; i < opts.length; i++) {
                      let option = opts[i];
  
                      if (!option.disabled) {
                          this.value.push(opts[i].value);
                      }
                  }
              }
          }
          
          this.onModelChange(this.value);
          this.onModelValue.emit(this.value);
          this.onChange.emit({originalEvent: event, value: this.value});
       
          this.updateLabel();
      }
      
      isAllChecked() {

         
          if (this.filterValue && this.filterValue.trim().length) {
              return this.value && this.visibleOptions&&this.visibleOptions.length && (this.value.length == this.visibleOptions.length);
          }
          else {
              let optionCount = this.getEnabledOptionCount();
  
              return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount);
          }
      }
  
      getEnabledOptionCount(): number {
          if (this.options) {
              let count = 0;
              for (let opt of this.options) {
                  if (!opt.disabled) {
                      count++;
                  }
              }
  
              return count;
          }
          else {
              return 0;
          }
      }
      
      show() {
          if (!this.overlayVisible){
              this.overlayVisible = true;
          }
      
          if (this.filter) {
              setTimeout(() => {
                  if (this.filterInputChild != undefined) {
                      this.filterInputChild.nativeElement.focus();
                  }
              }, 200);
          }
  
          
          this.bindDocumentClickListener();
          
      }
  
      onOverlayAnimationStart(event: AnimationEvent) {
          switch (event.toState) {
              case 'visible':
                  this.overlay = event.element;
                  this.appendOverlay();
                  if (this.autoZIndex) {
                      this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                  }
                  this.alignOverlay();
                  this.bindDocumentClickListener();
                  this.bindDocumentResizeListener();
                  this.onPanelShow.emit();
              break;
  
              case 'void':
                  this.onOverlayHide();
              break;
          }
      }
  
      appendOverlay() {
          if (this.appendTo) {
              if (this.appendTo === 'body')
                  document.body.appendChild(this.overlay);
              else
                  DomHandler.appendChild(this.overlay, this.appendTo);
  
              this.overlay.style.minWidth = DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
          }
      }
  
      restoreOverlayAppend() {
          if (this.overlay && this.appendTo) {
              this.el.nativeElement.appendChild(this.overlay);
          }
      }
  
      alignOverlay() {
          if (this.overlay) {
              if (this.appendTo)
                  DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
              else
                  DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
          }
      }
      
      hide() {
          this.overlayVisible = false;
          this.unbindDocumentClickListener();
          if (this.resetFilterOnHide){
              this.filterInputChild.nativeElement.value = '';
              this.onFilter();
          }
          this.onPanelHide.emit();
      }
      
      close(event) {
          this.hide();
          event.preventDefault();
          event.stopPropagation();
      }
      
      onMouseclick(event,input) {


            

            if(this.readonly){
                return true;
            }
            if (this._whenShow == 'whenclick' && !this.isDataLoaded) {

               

                this.updateOptions()
            }

            if (this._whenShow == 'everyclick') {

               


                
                this.updateOptions()
            }

           

          
            if (this.selfClick == false && this.panelClick == false  && this.overlayVisible == false && this.appendTo == undefined) {
              
                this.hide();
                this.selfClick = true
                return;
            }
            
            if (this.disabled || this.readonly) {
                return;
            }
            
            if (!this.panelClick) {
                
                
             
                if (this.overlayVisible) {
                    this.hide();
                }
                else {
                    this.input.nativeElement.focus();
                    this.show();
                }
            }
          
          
          this.selfClick = true;
      }
      
      onInputFocus(event) {
        
         
          this.focus = true;
          this.onFocus.emit({originalEvent: event});

         
          if (this._whenShow == 'whenblur' && !this.isDataLoaded) {
              
              this.updateOptions();
              this.onMouseclick(event, this.input)
          } 
      }
      
      onInputBlur(event) {
          
          this.focus = false;
          this.onBlur.emit({originalEvent: event});
          this.onModelTouched();
      }
  
      onOptionKeydown(event) {
          
          if (this.readonly) {
              return;
          }
          
          let item = <HTMLLIElement> event.originalEvent.currentTarget;
          
         
          switch(event.which) {
              //down
              case 40:
                  var nextItem = this.findNextItem(item);
                  if(nextItem) {
                      nextItem.focus();
                  }
                  
                  event.preventDefault();
              break;
              
              //up
              case 38:
                  var prevItem = this.findPrevItem(item);
                  if(prevItem) {
                      prevItem.focus();
                  }
                  
                  event.preventDefault();
              break;
              
              //enter
              case 13:
                  this.onOptionClick(event);
                  event.preventDefault();
              break;
          }
      }
      
      findNextItem(item) {
          let nextItem = item.nextElementSibling;
  
          if (nextItem)
              return DomHandler.hasClass(nextItem, 'ui-state-disabled') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
          else
              return null;
      }
  
      findPrevItem(item) {
          let prevItem = item.previousElementSibling;
          
          if (prevItem)
              return DomHandler.hasClass(prevItem, 'ui-state-disabled') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
          else
              return null;
      } 
      
      onKeydown(event: KeyboardEvent){
          
            
          
          switch(event.which) {
              //down
              case 40:
                  if (!this.overlayVisible && event.altKey) {
                      this.show();
                  }
              break;
      
              //space
              case 32:
                  if (!this.overlayVisible){
                      this.show();
                      event.preventDefault();
                  }
                  break;
      
              //escape
              case 27:
                  this.hide();
              break;
          }
      }

     
      updateLabel() {
  

        
      
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            

           
            if(typeof this.value == 'object'){

             
                let label = '';
                for (let i = 0; i < this.value.length; i++) {
                    let itemLabel = this.findLabelByValue(this.value[i]);
                    if (itemLabel) {
                        if (label.length > 0) {
                            label = label + ', ';
                        }
                        label = label + itemLabel;
                    }
                }

               
                if (this.value.length <= this.maxSelectedLabels) {
                    this.valuesAsString = label;
                }
                else {
                    let pattern = /{(.*?)}/;
                    if (pattern.test(this.selectedItemsLabel)) {
                        this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                    }
                }

                

            }else{
                this.valuesAsString = this.value;
            }

        
        }
        else {
           
            this.valuesAsString = this.defaultLabel;
        }
        

       

        

      }
      
      findLabelByValue(val: any): string {
          let label = null;

          for (let i = 0; i < this.options.length; i++) {
              let option = this.options[i];
             
             
              if (val == null && option.value == null || ObjectUtils.equals(val, option.value, this.dataKey)) {
                  label = option.label;
                  break;
              }
          }


        
          return label;
      }
  
      onFilter() {
        
        let inputValue = this.filterInputChild.nativeElement.value;

     

        if(this.filterSpecial) {
            let splitInput = inputValue.split(" ");
            
            if(splitInput.length && splitInput[0] != ""){
                this.visibleOptions = this.options.filter(option => splitInput.includes(option.value) )
                if(!this.visibleOptions.length){
                    this.onKeyInput(inputValue);
                    return true;
                }
                return true;
            }
            this.onKeyInput(inputValue);
            return true;
        }

        this.allCheckedDisabled = !this.visibleOptions.length

        

        this.onKeyInput(inputValue);
    
    }


    onKeyInput(inputValue) {
           
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.visibleOptions = [];
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.visibleOptions = this.options;
            this.filtered = false;
        }
    }
     

    onSearchKeyDown(event) {
     
       
    }
        
      
      
      activateFilter() {
          if (this.options && this.options.length) {
              let searchFields: string[] = this.filterBy.split(',');
    
              this.visibleOptions = ObjectUtils.filter(this.options, searchFields, this.filterValue);
  
              this.filtered = true;
          }        
      }
      
      isItemVisible(option: SelectItem): boolean {
          if (this.filterValue && this.filterValue.trim().length) {
              for (let i = 0; i < this.visibleOptions.length; i++) {
                  if (this.visibleOptions[i].value == option.value) {
                      return true;
                  }
              }
          }
          else {
              return true;
          }
      }
      
      getVisibleOptions(): SelectItem[] {
          if (this.visibleOptions && this.visibleOptions.length) {
              return this.visibleOptions;
          }
          else {
              return this.options;
          }
      }
      
      onHeaderCheckboxFocus() {
          this.headerCheckboxFocus = true;
      }
      
      onHeaderCheckboxBlur() {
          this.headerCheckboxFocus = false;
      }
      
      bindDocumentClickListener() {
          if (!this.documentClickListener) {
              this.documentClickListener = this.renderer.listen('document', 'click', () => {

                    
                    if (!this.selfClick && !this.panelClick && this.overlayVisible) {
                        this.hide();
                    }
                    
                    this.selfClick = false;
                    this.panelClick = false;
                    this.cd.markForCheck();
              });
          }
      }
      
      unbindDocumentClickListener() {
          if (this.documentClickListener) {
              this.documentClickListener();
              this.documentClickListener = null;
          }
      }
  
      bindDocumentResizeListener() {
          this.documentResizeListener = this.onWindowResize.bind(this);
          window.addEventListener('resize', this.documentResizeListener);
      }
      
      unbindDocumentResizeListener() {
          if (this.documentResizeListener) {
              window.removeEventListener('resize', this.documentResizeListener);
              this.documentResizeListener = null;
          }
      }
  
      onWindowResize() {
        this.hideOnWinResize ? this.hide() : void 0;
      }
  
      onOverlayHide() {
          this.unbindDocumentClickListener();
          this.unbindDocumentResizeListener();
          this.overlay = null;
      }
  
      ngOnDestroy() {
          this.restoreOverlayAppend();
          this.onOverlayHide();
      }
    

    setLabel(value: string) {
        this.defaultLabel =  value;
        return this;
    }

    reset(){
        this.value  = []
        this.valuesAsString = this._defaultLabel;

        
    }


    onOkOptionClick(event) {
        this.onOkClicked.emit({originalEvent: event.originalEvent, value: this.value});
        this.updateLabel();
        this.updateFilledState();
        this.hide();
    }
  
  }
  
  
  @NgModule({
    imports: [CommonModule,SharedModule,ScrollingModule],
    exports: [MultiselectComponent,SharedModule,ScrollingModule],
    declarations: [MultiselectComponent,MultiSelectItem],
    schemas:[ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
  })
  export class MultiSelectModule { }