import React, { useEffect, createRef } from 'react';
//import { styled } from '@superset-ui/core';
import { SupersetPluginChartWdrExtProps } from './types';
import { WebDataRocksViewer } from "./components/WebDataRocks/WebDataRocksViewer";
import '@webdatarocks/webdatarocks/webdatarocks.css';



export default function SupersetPluginChartWdrExt(props: SupersetPluginChartWdrExtProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { dataHeader, data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });


  console.log('Plugin props', props);
  /*    <h3>{props.headerText}</h3>
      <pre>${JSON.stringify(dataHeader, null, 2)}</pre>
      <pre>${JSON.stringify(data, null, 2)}</pre>*/

  return (
    <WebDataRocksViewer />

  );
}
