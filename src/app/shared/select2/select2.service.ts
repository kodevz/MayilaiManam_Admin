import { Injectable } from '@angular/core';
import { ColumnRemoteOptions } from '../datatable/model/dtoptions';


@Injectable({
  providedIn: 'root'
})
export class Select2Service {

  private hasKey: any;

  private endPoint: string = 'buildSelect2';

  private conn: string;

  private table: string;

  private value: string;

  private label: string;

  private orderby: string = 'asc';

  constructor() {

  }

  setSelect2(haskey: string) {

    this.hasKey = haskey;

    return this
  }

  setEndPoint(endpoint: string) {

    this.endPoint = endpoint;

    return this;
  }
  setCon(conn: string){

    this.conn = conn;

    return this;
  }

  setTable(table: string) {

    this.table = table;

    return this;
  }

  setValue(value: string) {

    this.value = value;

    return this;
  }

  setLabel(label: string) {

    this.label = label;

    return this;
  }

  setOrderBy(oderby: string) {
    
    this.orderby = oderby;

    return this
  }

  select2(haskey?: string): ColumnRemoteOptions {

    this.hasKey = haskey ? haskey : this.hasKey;

    const option = this.select2Container().filter(option => option.name == this.hasKey)[0];

    option.table = this.table ? this.table : option.table;

    option.endpoint = this.endPoint ? this.endPoint : option.endpoint;

    option.value = this.value ? this.value : option.value;

    option.label = this.label ? this.label : option.label;

    option.orderby = this.orderby


    this.reset();

    return option;
  }

  create() {

   
    let opts = {
        endpoint: this.endPoint,
        value: this.value,
        label: this.label ? this.label : this.value,
        table: this.table,
        orderby: this.orderby
    };

    this.reset();

    return opts;
    

  }

  reset() {
    this.hasKey = null;
    this.table = null;
    this.value = null;
    this.label = null;
  }

  select2Options(haskey?: string): ColumnRemoteOptions {

    this.hasKey = haskey ? haskey : this.hasKey;

    return this.select2Container().filter(option => option.name == this.hasKey)[0];

  }

  select2Container(): Array<ColumnRemoteOptions> {

    return [
      {
        name: 'isoMetricDrawingNo',
        endpoint: this.endPoint,
        value: 'isometric_drawing_no',
        label: 'isometric_drawing_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'ewp',
        endpoint: this.endPoint,
        value: 'ewp',
        label: 'ewp',
        table: 'spool_activity_master_view'
      },
      {
        name: 'cwpNo',
        endpoint: this.endPoint,
        value: 'cwp_no',
        label: 'cwp_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'priority',
        endpoint: this.endPoint,
        value: 'priority',
        label: 'priority',
        table: 'spool_activity_master_view'
      },
      {
        name: 'revNo',
        endpoint: this.endPoint,
        value: 'rev_no',
        label: 'rev_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'isoCode',
        endpoint: this.endPoint,
        value: 'iso_code',
        label: 'iso_code',
        table: 'spool_activity_master_view'
      },
      {
        name: 'lineNo',
        endpoint: this.endPoint,
        value: 'line_no',
        label: 'line_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'sheetNo',
        endpoint: this.endPoint,
        value: 'sht_no',
        label: 'sht_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'moc',
        endpoint: this.endPoint,
        value: 'moc_id',
        label: 'moc',
        table: 'iso_moc'
      },
      {
        name: 'lineClass',
        endpoint: this.endPoint,
        value: 'line_class',
        label: 'line_class',
        table: 'spool_activity_master_view'
      },
      {
        name: 'spool_no',
        endpoint: this.endPoint,
        value: 'spool_no',
        label: 'spool_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'spool_code',
        endpoint: this.endPoint,
        value: 'spool_code',
        label: 'spool_code',
        table: 'spool_activity_master_view'
      },
      {
        name: 'spool_type_id',
        endpoint: this.endPoint,
        value: 'spool_type_id',
        label: 'spool_type_id',
        table: 'spool_activity_master_view'
      },
      {
        name: 'special_note_for_spool_type',
        endpoint: this.endPoint,
        value: 'special_note_for_spool_type',
        label: 'special_note_for_spool_type',
        table: 'spool_activity_master_view'
      },
      {
        name: 'spool_desc',
        endpoint: this.endPoint,
        value: 'spool_desc',
        label: 'spool_desc',
        table: 'spool_activity_master_view'
      },
      {
        name: 'external_coating_spec',
        endpoint: this.endPoint,
        value: 'external_coating_spec',
        label: 'external_coating_spec',
        table: 'spool_activity_master_view'
      },
      {
        name: 'coating_spec',
        endpoint: this.endPoint,
        value: 'coating_spec',
        label: 'coating_spec',
        table: 'spool_activity_master_view'
      },
      {
        name: 'area_sqm',
        endpoint: this.endPoint,
        value: 'area_sqm',
        label: 'area_sqm',
        table: 'spool_activity_master_view'
      },
      {
        name: 'size_1_inch',
        endpoint: this.endPoint,
        value: 'size_1_inch',
        label: 'size_1_inch',
        table: 'spool_activity_master_view'
      },
      {
        name: 'length_1_mm',
        endpoint: this.endPoint,
        value: 'length_1_mm',
        label: 'length_1_mm',
        table: 'spool_activity_master_view'
      },
      {
        name: 'size_2_inch',
        endpoint: this.endPoint,
        value: 'size_2_inch',
        label: 'size_2_inch',
        table: 'spool_activity_master_view'
      },
      {
        name: 'length_2_mm',
        endpoint: this.endPoint,
        value: 'length_2_mm',
        label: 'length_2_mm',
        table: 'spool_activity_master_view'
      },
      {
        name: 'size_3_inch',
        endpoint: this.endPoint,
        value: 'size_3_inch',
        label: 'size_3_inch',
        table: 'spool_activity_master_view'
      },
      {
        name: 'length_3_mm',
        endpoint: this.endPoint,
        value: 'length_3_mm',
        label: 'length_3_mm',
        table: 'spool_activity_master_view'
      },
      {
        name: 'total_length',
        endpoint: this.endPoint,
        value: 'total_length',
        label: 'total_length',
        table: 'spool_activity_master_view'
      },
      {
        name: 'support_weight',
        endpoint: this.endPoint,
        value: 'support_weight',
        label: 'support_weight',
        table: 'spool_activity_master_view'
      },
      {
        name: 'painting_lot_id',
        endpoint: this.endPoint,
        value: 'painting_lot_id',
        label: 'painting_lot_id',
        table: 'spool_activity_master_view'
      },
      {
        name: 'final_color',
        endpoint: this.endPoint,
        value: 'final_color',
        label: 'final_color',
        table: 'spool_activity_master_view'
      },
      {
        name: 'blasting_date',
        endpoint: this.endPoint,
        value: 'blasting_date',
        label: 'blasting_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'blasting_inspection_date',
        endpoint: this.endPoint,
        value: 'blasting_inspection_date',
        label: 'blasting_inspection_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'blasting_status',
        endpoint: this.endPoint,
        value: 'blasting_status',
        label: 'blasting_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'blasting_inspection_status',
        endpoint: this.endPoint,
        value: 'blasting_inspection_status',
        label: 'blasting_inspection_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'primer_date',
        endpoint: this.endPoint,
        value: 'primer_date',
        label: 'primer_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'primer_inspection_date',
        endpoint: this.endPoint,
        value: 'primer_inspection_date',
        label: 'primer_inspection_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'primer_status',
        endpoint: this.endPoint,
        value: 'primer_status',
        label: 'primer_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'primer_inspection_status',
        endpoint: this.endPoint,
        value: 'primer_inspection_status',
        label: 'primer_inspection_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'midcoat_date',
        endpoint: this.endPoint,
        value: 'midcoat_date',
        label: 'midcoat_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'midcoat_inspection_date',
        endpoint: this.endPoint,
        value: 'midcoat_inspection_date',
        label: 'midcoat_inspection_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'midcoat_status',
        endpoint: this.endPoint,
        value: 'midcoat_status',
        label: 'midcoat_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'midcoat_inspection_status',
        endpoint: this.endPoint,
        value: 'midcoat_inspection_status',
        label: 'midcoat_inspection_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'final_date',
        endpoint: this.endPoint,
        value: 'final_date',
        label: 'final_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'final_inspection_date',
        endpoint: this.endPoint,
        value: 'final_inspection_date',
        label: 'final_inspection_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'final_status',
        endpoint: this.endPoint,
        value: 'final_status',
        label: 'final_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'final_inspection_status',
        endpoint: this.endPoint,
        value: 'final_inspection_status',
        label: 'final_inspection_status',
        table: 'spool_activity_master_view'
      },
      {
        name: 'picr_no',
        endpoint: this.endPoint,
        value: 'picr_no',
        label: 'picr_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'picr_date',
        endpoint: this.endPoint,
        value: 'picr_date',
        label: 'picr_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'pre_delivery_tracking',
        endpoint: this.endPoint,
        value: 'pre_delivery_tracking',
        label: 'pre_delivery_tracking',
        table: 'spool_activity_master_view'
      },
      {
        name: 'picr_no',
        endpoint: this.endPoint,
        value: 'picr_no',
        label: 'picr_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'painting_dno',
        endpoint: this.endPoint,
        value: 'painting_dno',
        label: 'painting_dno',
        table: 'spool_activity_master_view'
      },
      {
        name: 'painting_delivery_date',
        endpoint: this.endPoint,
        value: 'painting_delivery_date',
        label: 'painting_delivery_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'fab_required',
        endpoint: this.endPoint,
        value: 'fab_required',
        label: 'fab_required',
        table: 'spool_activity_master_view'
      },
      {
        name: 'heat_no',
        endpoint: this.endPoint,
        value: 'heat_no',
        label: 'heat_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'supply_scope',
        endpoint: this.endPoint,
        value: 'supply_scope',
        label: 'supply_scope',
        table: 'spool_activity_master_view'
      },
      {
        name: 'no_of_shop_joints',
        endpoint: this.endPoint,
        value: 'no_of_shop_joints',
        label: 'no_of_shop_joints',
        table: 'spool_activity_master_view'
      },
      {
        name: 'shop_inch_dia',
        endpoint: this.endPoint,
        value: 'shop_inch_dia',
        label: 'shop_inch_dia',
        table: 'spool_activity_master_view'
      },
      {
        name: 'sub_contractor',
        endpoint: this.endPoint,
        value: 'sub_contractor',
        label: 'sub_contractor',
        table: 'spool_activity_master_view'
      },
      {
        name: 'area_sqm',
        endpoint: this.endPoint,
        value: 'area_sqm',
        label: 'area_sqm',
        table: 'spool_activity_master_view'
      },
      {
        name: 'dwg_category',
        endpoint: this.endPoint,
        value: 'dwg_category',
        label: 'dwg_category',
        table: 'spool_activity_master_view'
      },
      {
        name: 'ecrs_no',
        endpoint: this.endPoint,
        value: 'ecrs_no',
        label: 'ecrs_no',
        table: 'spool_activity_master_view'
      },
      {
        name: 'ecrs_date',
        endpoint: this.endPoint,
        value: 'ecrs_date',
        label: 'ecrs_date',
        table: 'spool_activity_master_view'
      },
      {
        name: 'ht_pack_no',
        endpoint: this.endPoint,
        value: 'ht_pack_no',
        label: 'ht_pack_no',
        table: 'spool_hold_release_view'
      },
      {
        name: 'spool_no',
        endpoint: this.endPoint,
        value: 'spool_no',
        label: 'spool_no',
        table: 'spool_hold_release_view'
      },
      {
        name: 'fh_no',
        endpoint: this.endPoint,
        value: 'fh_no',
        label: 'fh_no',
        table: 'spool_hold_release_view'
      },
      {
        name: 'fhn_date',
        endpoint: this.endPoint,
        value: 'fhn_date',
        label: 'fhn_date',
        table: 'spool_hold_release_view'
      },
      {
        name: 'fhn_by',
        endpoint: this.endPoint,
        value: 'fhn_by',
        label: 'fhn_by',
        table: 'spool_hold_release_view'
      },
      {
        name: 'fhr_no',
        endpoint: this.endPoint,
        value: 'fhr_no',
        label: 'fhr_no',
        table: 'spool_hold_release_view'
      },
      {
        name: 'fhr_date',
        endpoint: this.endPoint,
        value: 'fhr_date',
        label: 'fhr_date',
        table: 'spool_hold_release_view'
      },
      {
        name: 'fhr_by',
        endpoint: this.endPoint,
        value: 'fhr_by',
        label: 'fhr_by',
        table: 'spool_hold_release_view'
      },
      {
        name: 'modified_date',
        endpoint: this.endPoint,
        value: 'modified_date',
        label: 'modified_date',
        table: 'spool_hold_release_view'
      },
      {
        name: 'ecrs_no',
        endpoint: this.endPoint,
        value: 'ecrs_no',
        label: 'ecrs_no',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'ecrs_date',
        endpoint: this.endPoint,
        value: 'ecrs_date',
        label: 'ecrs_date',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'external_spec',
        endpoint: this.endPoint,
        value: 'external_spec',
        label: 'external_spec',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'spool_no',
        endpoint: this.endPoint,
        value: 'spool_no',
        label: 'spool_no',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'iso_code',
        endpoint: this.endPoint,
        value: 'iso_code',
        label: 'iso_code',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'line_no',
        endpoint: this.endPoint,
        value: 'line_no',
        label: 'line_no',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'isometric_drawing_no',
        endpoint: this.endPoint,
        value: 'isometric_drawing_no',
        label: 'isometric_drawing_no',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'moc',
        endpoint: this.endPoint,
        value: 'moc',
        label: 'moc',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'line_class',
        endpoint: this.endPoint,
        value: 'line_class',
        label: 'line_class',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'final_color',
        endpoint: this.endPoint,
        value: 'final_color',
        label: 'final_color',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'size_1_inch',
        endpoint: this.endPoint,
        value: 'size_1_inch',
        label: 'size_1_inch',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'length_1_mm',
        endpoint: this.endPoint,
        value: 'length_1_mm',
        label: 'length_1_mm',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'size_2_inch',
        endpoint: this.endPoint,
        value: 'size_2_inch',
        label: 'size_2_inch',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'length_2_mm',
        endpoint: this.endPoint,
        value: 'length_2_mm',
        label: 'length_2_mm',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'size_3_inch',
        endpoint: this.endPoint,
        value: 'size_3_inch',
        label: 'size_3_inch',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'length_3_mm',
        endpoint: this.endPoint,
        value: 'length_3_mm',
        label: 'length_3_mm',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'area_sqm',
        endpoint: this.endPoint,
        value: 'area_sqm',
        label: 'area_sqm',
        table: 'external_coating_request_slip_view'
      },
      {
        name: 'painting_lot_id',
        endpoint: this.endPoint,
        value: 'painting_lot_id',
        label: 'painting_lot_id',
        table: 'lot_master_view'
      },
      {
        name: 'lot_desc',
        endpoint: this.endPoint,
        value: 'lot_desc',
        label: 'lot_desc',
        table: 'lot_master_view'
      },
      {
        name: 'lot_yard',
        endpoint: this.endPoint,
        value: 'lot_yard',
        label: 'lot_yard',
        table: 'lot_master_view'
      },
      {
        name: 'lot_system',
        endpoint: this.endPoint,
        value: 'lot_system',
        label: 'lot_system',
        table: 'lot_master_view'
      },
      {
        name: 'lot_date',
        endpoint: this.endPoint,
        value: 'lot_date',
        label: 'lot_date',
        table: 'lot_master_view'
      },
      {
        name: 'lot_remarks',
        endpoint: this.endPoint,
        value: 'lot_remarks',
        label: 'lot_remarks',
        table: 'lot_master_view'
      },
      {
        name: 'blasting_date',
        endpoint: this.endPoint,
        value: 'blasting_date',
        label: 'blasting_date',
        table: 'lot_master_view'
      },
      {
        name: 'blasting_inspection_date',
        endpoint: this.endPoint,
        value: 'blasting_inspection_date',
        label: 'blasting_inspection_date',
        table: 'lot_master_view'
      },
      {
        name: 'blasting_status',
        endpoint: this.endPoint,
        value: 'blasting_status',
        label: 'blasting_status',
        table: 'lot_master_view'
      },
      {
        name: 'blasting_inspection_status',
        endpoint: this.endPoint,
        value: 'blasting_inspection_status',
        label: 'blasting_inspection_status',
        table: 'lot_master_view'
      },
      {
        name: 'primer_date',
        endpoint: this.endPoint,
        value: 'primer_date',
        label: 'primer_date',
        table: 'lot_master_view'
      },
      {
        name: 'primer_inspection_date',
        endpoint: this.endPoint,
        value: 'primer_inspection_date',
        label: 'primer_inspection_date',
        table: 'lot_master_view'
      },
      {
        name: 'primer_status',
        endpoint: this.endPoint,
        value: 'primer_status',
        label: 'primer_status',
        table: 'lot_master_view'
      },
      {
        name: 'primer_inspection_status',
        endpoint: this.endPoint,
        value: 'primer_inspection_status',
        label: 'primer_inspection_status',
        table: 'lot_master_view'
      },
      {
        name: 'midcoat_date',
        endpoint: this.endPoint,
        value: 'midcoat_date',
        label: 'midcoat_date',
        table: 'lot_master_view'
      },
      {
        name: 'midcoat_inspection_date',
        endpoint: this.endPoint,
        value: 'midcoat_inspection_date',
        label: 'midcoat_inspection_date',
        table: 'lot_master_view'
      },
      {
        name: 'midcoat_status',
        endpoint: this.endPoint,
        value: 'midcoat_status',
        label: 'midcoat_status',
        table: 'lot_master_view'
      },
      {
        name: 'midcoat_inspection_status',
        endpoint: this.endPoint,
        value: 'midcoat_inspection_status',
        label: 'midcoat_inspection_status',
        table: 'lot_master_view'
      },
      {
        name: 'final_date',
        endpoint: this.endPoint,
        value: 'final_date',
        label: 'final_date',
        table: 'lot_master_view'
      },
      {
        name: 'final_inspection_date',
        endpoint: this.endPoint,
        value: 'final_inspection_date',
        label: 'final_inspection_date',
        table: 'lot_master_view'
      },
      {
        name: 'final_status',
        endpoint: this.endPoint,
        value: 'final_status',
        label: 'final_status',
        table: 'lot_master_view'
      },
      {
        name: 'final_inspection_status',
        endpoint: this.endPoint,
        value: 'final_inspection_status',
        label: 'final_inspection_status',
        table: 'lot_master_view'
      },
      {
        name: 'spool_code',
        endpoint: this.endPoint,
        value: 'spool_code',
        label: 'spool_code',
        table: 'lot_master_view'
      },
      {
        name: 'picr_no',
        endpoint: this.endPoint,
        value: 'picr_no',
        label: 'picr_no',
        table: 'lot_master_view'
      },
      {
        name: 'picr_date',
        endpoint: this.endPoint,
        value: 'picr_date',
        label: 'picr_date',
        table: 'lot_master_view'
      },
      {
        name: 'iso_code',
        endpoint: this.endPoint,
        value: 'iso_code',
        label: 'iso_code',
        table: 'barcode_status_view'
      },
      {
        name: 'isoMetricDrawingNo',
        endpoint: this.endPoint,
        value: 'isoMetricDrawingNo',
        label: 'isoMetricDrawingNo',
        table: 'barcode_status_view'
      },
      {
        name: 'ecrs_no',
        endpoint: this.endPoint,
        value: 'ecrs_no',
        label: 'ecrs_no',
        table: 'barcode_status_view'
      },
      {
        name: 'final_color',
        endpoint: this.endPoint,
        value: 'final_color',
        label: 'final_color',
        table: 'barcode_status_view'
      },
      {
        name: 'painting_system',
        endpoint: this.endPoint,
        value: 'painting_system',
        label: 'painting_system',
        table: 'barcode_status_view'
      },
      {
        name: 'isometric_drawing_no',
        endpoint: this.endPoint,
        value: 'isometric_drawing_no',
        label: 'isometric_drawing_no',
        table: 'barcode_status_view'
      },
      {
        name: 'spool_name',
        endpoint: this.endPoint,
        value: 'spool_name',
        label: 'spool_name',
        table: 'barcode_status_view'
      },
      {
        name: 'sicked_status',
        endpoint: this.endPoint,
        value: 'sicked_status',
        label: 'sicked_status',
        table: 'barcode_status_view'
      },
      {
        name: 'verified_status',
        endpoint: this.endPoint,
        value: 'verified_status',
        label: 'verified_status',
        table: 'barcode_status_view'
      },
      {
        name: 'blasting_status',
        endpoint: this.endPoint,
        value: 'blasting_status',
        label: 'blasting_status',
        table: 'barcode_status_view'
      },
      {
        name: 'midcoat_status',
        endpoint: this.endPoint,
        value: 'midcoat_status',
        label: 'midcoat_status',
        table: 'barcode_status_view'
      },
      {
        name: 'primer_status',
        endpoint: this.endPoint,
        value: 'primer_status',
        label: 'primer_status',
        table: 'barcode_status_view'
      },
      {
        name: 'final_status',
        endpoint: this.endPoint,
        value: 'final_status',
        label: 'final_status',
        table: 'barcode_status_view'
      },
      {
        name: 'delivery_note_id',
        endpoint: this.endPoint,
        value: 'delivery_note_id',
        label: 'delivery_note_id',
        table: 'delivery_master_view'
      },
      {
        name: 'dno',
        endpoint: this.endPoint,
        value: 'dno',
        label: 'dno',
        table: 'delivery_master_view'
      },
      {
        name: 'delivery_date',
        endpoint: this.endPoint,
        value: 'delivery_date',
        label: 'delivery_date',
        table: 'delivery_master_view'
      },
      {
        name: 'from_loc',
        endpoint: this.endPoint,
        value: 'from_loc',
        label: 'from_loc',
        table: 'delivery_master_view'
      },
      {
        name: 'to_loc',
        endpoint: this.endPoint,
        value: 'to_loc',
        label: 'to_loc',
        table: 'delivery_master_view'
      },
      {
        name: 'vehicle_no',
        endpoint: this.endPoint,
        value: 'vehicle_no',
        label: 'vehicle_no',
        table: 'delivery_master_view'
      },
      {
        name: 'driver_no',
        endpoint: this.endPoint,
        value: 'driver_no',
        label: 'driver_no',
        table: 'delivery_master_view'
      },
      {
        name: 'dn_issued_by',
        endpoint: this.endPoint,
        value: 'dn_issued_by',
        label: 'dn_issued_by',
        table: 'delivery_master_view'
      },
      {
        name: 'dn_received_by',
        endpoint: this.endPoint,
        value: 'dn_received_by',
        label: 'dn_received_by',
        table: 'delivery_master_view'
      },
      {
        name: 'dispatched_status',
        endpoint: this.endPoint,
        value: 'dispatched_status',
        label: 'dispatched_status',
        table: 'delivery_master_view'
      },
      {
        name: 'dispatched_date',
        endpoint: this.endPoint,
        value: 'dispatched_date',
        label: 'dispatched_date',
        table: 'delivery_master_view'
      },
      {
        name: 'received_status',
        endpoint: this.endPoint,
        value: 'received_status',
        label: 'received_status',
        table: 'delivery_master_view'
      },
      {
        name: 'received_date',
        endpoint: this.endPoint,
        value: 'received_date',
        label: 'received_date',
        table: 'delivery_master_view'
      },
      {
        name: 'ack_status',
        endpoint: this.endPoint,
        value: 'ack_status',
        label: 'ack_status',
        table: 'delivery_master_view'
      },
      {
        name: 'ack_date',
        endpoint: this.endPoint,
        value: 'ack_date',
        label: 'ack_date',
        table: 'delivery_master_view'
      },
      {
        name: 'ecrs_no',
        endpoint: this.endPoint,
        value: 'ecrs_no',
        label: 'ecrs_no',
        table: 'delivery_master_view'
      },
      {
        name: 'iso_code',
        endpoint: this.endPoint,
        value: 'iso_code',
        label: 'iso_code',
        table: 'delivery_master_view'
      },
      {
        name: 'spool_code',
        endpoint: this.endPoint,
        value: 'spool_code',
        label: 'spool_code',
        table: 'delivery_master_view'
      },
      {
        name: 'uom',
        endpoint: this.endPoint,
        value: 'uom',
        label: 'uom',
        table: 'delivery_master_view'
      },
      {
        name: 'quantity',
        endpoint: this.endPoint,
        value: 'quantity',
        label: 'quantity',
        table: 'delivery_master_view'
      },
      {
        name: 'size_1_inch',
        endpoint: this.endPoint,
        value: 'size_1_inch',
        label: 'size_1_inch',
        table: 'delivery_master_view'
      },
      {
        name: 'total_length',
        endpoint: this.endPoint,
        value: 'total_length',
        label: 'total_length',
        table: 'delivery_master_view'
      },
      {
        name: 'support_weight',
        endpoint: this.endPoint,
        value: 'support_weight',
        label: 'support_weight',
        table: 'delivery_master_view'
      },
      {
        name: 'code_id',
        endpoint: this.endPoint,
        value: 'code_id',
        label: 'code_id',
        table: 'barcode_log_view'
      },
      {
        name: 'spool_code',
        endpoint: this.endPoint,
        value: 'spool_code',
        label: 'spool_code',
        table: 'barcode_log_view'
      },
      {
        name: 'barcode_for',
        endpoint: this.endPoint,
        value: 'barcode_for',
        label: 'barcode_for',
        table: 'barcode_log_view'
      },
      {
        name: 'barcode_for_status',
        endpoint: this.endPoint,
        value: 'barcode_for_status',
        label: 'barcode_for_status',
        table: 'barcode_log_view'
      },
      {
        name: 'scan_by',
        endpoint: this.endPoint,
        value: 'scan_by',
        label: 'scan_by',
        table: 'barcode_log_view'
      },
      {
        name: 'scan_location',
        endpoint: this.endPoint,
        value: 'scan_location',
        label: 'scan_location',
        table: 'barcode_log_view'
      },
      {
        name: 'scan_time',
        endpoint: this.endPoint,
        value: 'scan_time',
        label: 'scan_time',
        table: 'barcode_log_view'
      },
      {
        name: 'scan_at',
        endpoint: this.endPoint,
        value: 'scan_at',
        label: 'scan_at',
        table: 'barcode_log_view'
      },
      {
        name: 'barcode_remarks',
        endpoint: this.endPoint,
        value: 'barcode_remarks',
        label: 'barcode_remarks',
        table: 'barcode_log_view'
      },
      {
        name: 'barcode_status',
        endpoint: this.endPoint,
        value: 'barcode_status',
        label: 'barcode_status',
        table: 'barcode_log_view'
      },
      {
        name: 'PaintSpec',
        endpoint: this.endPoint,
        value: 'painting_spec_id',
        label: 'external_spec',
        table: 'painting_spec_dropdown_view'
      }
    ];
  }
}
