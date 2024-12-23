//SupersetPluginChartWdrExt.tsx
import React, { useEffect, createRef, useCallback } from 'react';
//import { styled } from '@superset-ui/core';
import { SupersetPluginChartWdrExtProps } from './types';
import { WebDataRocksViewer, WDRConfig } from "./components/WebDataRocks/WebDataRocksViewer";
import '@webdatarocks/webdatarocks/theme/stripedteal/webdatarocks.min.css';



export default function SupersetPluginChartWdrExt(props: SupersetPluginChartWdrExtProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉☝
  const { dataHeader, data, height, width, showToolbar, setControlValue, reportJsonConfig ='' } = props;

  
  
  const rootElem = createRef<HTMLDivElement>();

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

  const configWDR: WDRConfig = {
    showToolbar: showToolbar,
    report_config: reportJsonConfig,
    onConfigChange: handleConfigChange
  };


    


 /*useEffect(() => {
    console.log('Component mounted with props:', props);
    console.log('Current report config:', reportJsonConfig);
    console.log('Current configWDR:', configWDR);
  }, [props, reportJsonConfig, configWDR]);*/

  return (
    <WebDataRocksViewer data={{data}} header={{dataHeader}} config={configWDR} height={height} width={width}/>

  );
}
