//types.ts

import {
  QueryFormData,
  TimeseriesDataRecord
  
} from '@superset-ui/core';
import { ChartProps } from '@superset-ui/core';
import { DataStructure } from "./plugin/transformProps";

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
    dataHeader: DataStructure[];
    reportJsonConfig?: string;
    setControlValue?: (name: string, value: any) => void;
    // add typing here for the props you pass in from transformProps.ts!
  };
