//types.ts

import {
  QueryFormData,
  TimeseriesDataRecord,
  SetDataMaskHook,
  ChartProps,
  QueryMode  
} from '@superset-ui/core';
import { DataStructure } from "./plugin/transformProps";


export type ThemeType = 'stripedteal' | 'classic' | 'lightblue' | 'green' | 'orange';

export interface Cell {
  columnIndex: number;
  columns: any[];
  label: string;
  measure: null;
  hierarchy: {
    uniqueName: string;
    caption: string;
    filterEnabled: boolean;
    sortName: string;
    sortAs: null;
    type: number;
    filter: null;
  };
  member: {
    uniqueName: string;
    caption: string;
    hierarchyName: string;
  };
  rowIndex: number;
  rows: {
    caption: string;
    uniqueName: string;
    hierarchyCaption: string;
    hierarchyUniqueName: string;
  }[];
  type: string;
  value: null;
  recordId: null;
  isTotal: boolean;
  isTotalRow: boolean;
  isTotalColumn: boolean;
  isClassicTotalRow: boolean;
  isGrandTotal: boolean;
  isGrandTotalRow: boolean;
  isGrandTotalColumn: boolean;
  isDrillThrough: boolean;
  level: number;
  x: number;
  y: number;
  width: number;
  height: number;
 }

export interface TreePathInfo {
  name: string;
  dataIndex: number;
  value: number | number[];
}

export interface SupersetPluginChartWdrExtStylesProps {
  height: number;
  width: number;
}

export interface SupersetPluginChartWdrExtControlValue extends ChartProps {
  setControlValue?: (name: string, value: any) => void;
};

// Определяем formData
export interface WdrExtFormData extends QueryFormData {
  report_json_config?: string;
}

export type SupersetPluginChartWdrExtQueryFormData = QueryFormData &
  SupersetPluginChartWdrExtStylesProps ;

export type SupersetPluginChartWdrExtProps = SupersetPluginChartWdrExtStylesProps & {
    showToolbar: boolean;
    data: TimeseriesDataRecord[];
    query_mode: QueryMode;
    dataHeader: DataStructure[];
    reportJsonConfig?: string;
    selectedValues: string[];
    setControlValue?: (name: string, value: any) => void;
    theme?: ThemeType;
    emitCrossFilters?: boolean;
    setDataMask: SetDataMaskHook;
    // add typing here for the props you pass in from transformProps.ts!
  };
