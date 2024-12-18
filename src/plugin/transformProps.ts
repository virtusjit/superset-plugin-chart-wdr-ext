//transformProps.ts
import { ChartProps, GenericDataType, TimeseriesDataRecord } from '@superset-ui/core';

// Define interfaces for better type safety
interface FieldDefinition {
  type: string;
}

export interface DataStructure {
  data: Record<string, FieldDefinition>;
}


// Function to convert GenericDataType to string type
function getTypeString(type: GenericDataType): string {
  switch (type) {
      case GenericDataType.Numeric:
          return "number";
      case GenericDataType.String:
          return "string";
      case GenericDataType.Temporal:
          return "date";
      case GenericDataType.Boolean:
          return "boolean";
      default:
          return "unknown";
  }
}

export default function transformProps(chartProps: ChartProps) {

  const { width, height, formData, queriesData } = chartProps;
  const { showToolbar, headerText} = formData;
  const data = queriesData[0].data as TimeseriesDataRecord[];
  const datatypes = queriesData[0].coltypes as GenericDataType[];
  const columnNames = queriesData[0].colnames as string[];

  // Create the desired structure
  const dataHeader: DataStructure = {
    data: columnNames.reduce<Record<string, FieldDefinition>>((acc, field, index) => {
        acc[field] = {
            type: getTypeString(datatypes[index])
        };
        return acc;
    }, {})
  };

  //console.log('formData via TransformProps.ts', formData);
  console.log('formData via TransformProps.ts', queriesData);
  return {
    width,
    height,
    data,
    dataHeader,
    // and now your control data, manipulated as needed, and passed through as props!
    showToolbar,
    headerText,
  };
}
