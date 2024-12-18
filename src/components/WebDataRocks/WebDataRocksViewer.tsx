import * as WebDataRocksReact from "@webdatarocks/react-webdatarocks";


import React, { useRef, useCallback } from "react";
import { myData } from "./data";

// Define the props interface for type safety
export interface WebDataRocksViewerProps {
    data?: any;
    header?: any;
    report?: any;
    config?: any;              // Data to be used in template rendering
};

interface WebDataRocksInstance {
    expandAllData: () => void;
    collapseAllData: () => void;
    //setReport: (report: WebDataRocksReport) => void;
    //getReport: () => WebDataRocksReport;
  }

interface PivotWithWebDataRocks extends WebDataRocksReact.Pivot {
    webdatarocks: WebDataRocksInstance;
  }

interface PivotConfig {
    toolbar: boolean;
    beforetoolbarcreated: (toolbar: Toolbar) => void;
    report: typeof myData;
    width: string;
    height: number;
    licenseKey?: string;
    global?: Record<string, unknown>;
  }

  interface Toolbar {
    getTabs: () => Tab[];
    icons: Record<string, string>;
  }
  
  interface Tab {
    id: string;
    title?: string;
    handler?: () => void;
    mobile?: boolean;
    desktop?: boolean;
    icon?: string;  
  }


export const WebDataRocksViewer :React.FC<WebDataRocksViewerProps>= ({
    data,
    header,
    report,
    config
}: WebDataRocksViewerProps) => {

    const pivotRef = useRef<PivotWithWebDataRocks>(null);

    const customizeToolbar = useCallback((toolbar: Toolbar) => {
      let tabs = toolbar.getTabs();
      
      // Фильтруем ненужные табы
      tabs = tabs.filter((tab: Tab) => 
        tab.id !== "wdr-tab-connect" && 
        tab.id !== "wdr-tab-open" && 
        tab.id !== "wdr-tab-save"
      );
      
      toolbar.getTabs = () => tabs;
    }, []);

    const pivotConfig: PivotConfig = {
        toolbar: true,
        beforetoolbarcreated: customizeToolbar,
        report: myData,
        width: "100%",
        height: 500
      };

    return (
        
              <WebDataRocksReact.Pivot 
                      ref={pivotRef}
                      {...pivotConfig} 
                    />

    );
};