//SupersetPluginChartWdrExt.tsx
import React, { useEffect,  useCallback } from 'react';
//import { styled } from '@superset-ui/core';
import { SupersetPluginChartWdrExtProps, Cell  } from './types';
import { WebDataRocksViewer, WDRConfig } from "./components/WebDataRocks/WebDataRocksViewer";
import '@webdatarocks/webdatarocks/webdatarocks.css';
//import './webdatarocks.min.css';
//import { extractTreePathInfo } from './constants';




export default function SupersetPluginChartWdrExt(props: SupersetPluginChartWdrExtProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉☝

  const { dataHeader, data, height, width, showToolbar, setControlValue, reportJsonConfig ='',  emitCrossFilters, setDataMask/*, selectedValues*/ } = props;
   
  
  //const rootElem = createRef<HTMLDivElement>();

  /*const getCrossFilterDataMask = useCallback(
    (data, treePathInfo) => {
      if (data?.children) {
        return undefined;
      }
      const { treePath } = extractTreePathInfo(treePathInfo);
      const name = treePath.join(',');
      const selected = Object.values(selectedValues);
      let values: string[];
      if (selected.includes(name)) {
        values = selected.filter(v => v !== name);
      } else {
        values = [name];
      }

      const groupbyValues = values.map(value => labelMap[value]);

      return {
        dataMask: {
          extraFormData: {
            filters:
              values.length === 0
                ? []
                : groupby.map((col, idx) => {
                    const val: DataRecordValue[] = groupbyValues.map(
                      v => v[idx],
                    );
                    if (val === null || val === undefined)
                      return {
                        col,
                        op: 'IS NULL' as const,
                      };
                    return {
                      col,
                      op: 'IN' as const,
                      val: val as (string | number | boolean)[],
                    };
                  }),
          },
          filterState: {
            value: groupbyValues.length ? groupbyValues : null,
            selectedValues: values.length ? values : null,
          },
        },
        isCurrentValueSelected: selected.includes(name),
      };
    },
    [groupby, labelMap, selectedValues],
  );*/

  // Создаем callback для обновления значения контрола
  const handleConfigChange = useCallback((newConfig: string) => {
    //console.log('handleConfigChange called with:', newConfig);
    if (setControlValue) {
      //console.log('Attempting to set control value');
      try {
        setControlValue('reportJsonConfig', newConfig);
        //console.log('Control value set successfully');
      } catch (error) {
        console.error('Error setting control value:', error);
      }
    } else {
      console.warn('setControlValue is not available');
    }
  }, [setControlValue]);

  const handleCellClick = useCallback((cell: Cell) => {
    //console.log('handleCellClick called with:', cell);
    /*setDataMask({
      extraFormData: {
        filters: [
          {
            col: 'product_line',
            op: 'IN',
            val: ['Classic Cars']
          }
        ]
      },
      filterState: {
        value: [['Classic Cars']],
        selectedValues: ['product_line.Classic Cars']
      }
     });*/
  }, [emitCrossFilters, setDataMask]);

  const configWDR: WDRConfig = {
    showToolbar: showToolbar,
    report_config: reportJsonConfig,
    onConfigChange: handleConfigChange,
    onCellClick: handleCellClick,
  };

 /*useEffect(() => {
    console.log('Component mounted with props:', props);
    //console.log('Current report config:', reportJsonConfig);
    //console.log('Current configWDR:', configWDR);
  }, [props]);*/

  return (
    <WebDataRocksViewer key={JSON.stringify(dataHeader)+configWDR.showToolbar.toString()+height.toString()+width.toString() } data={{data}} header={{dataHeader}} config={configWDR} height={height} width={width}/>

  );
}
