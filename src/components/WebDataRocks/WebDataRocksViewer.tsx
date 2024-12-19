//WebDataRocksViewer.tsx
import * as WebDataRocksReact from "@webdatarocks/react-webdatarocks";
import React, { useRef, useCallback, useEffect } from "react";

export interface WDRConfig {
  showToolbar: boolean;  
  //wdrConfig?: string;
}; 

export interface WebDataRocksViewerProps {
    data?: any;
    header?: any;
    report?: any;
    config: WDRConfig;
};

interface WebDataRocksInstance {
    expandAllData: () => void;
    collapseAllData: () => void;
    getReport: () => any;
    on: (eventName: string, callback: any) => void;
    off: (eventName: string, callback: any) => void;
}

interface PivotWithWebDataRocks extends WebDataRocksReact.Pivot {
    webdatarocks: WebDataRocksInstance;
}

interface PivotConfig {
    toolbar: boolean;
    beforetoolbarcreated?: (toolbar: Toolbar) => void;
    report: any;
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

export const WebDataRocksViewer: React.FC<WebDataRocksViewerProps> = ({
    data,
    header,
    report,
    config
}: WebDataRocksViewerProps) => {

    const pivotRef = useRef<PivotWithWebDataRocks>(null);

    const customizeToolbar = useCallback((toolbar: Toolbar) => {
        let tabs = toolbar.getTabs();
        tabs = tabs.filter((tab: Tab) => 
            tab.id !== "wdr-tab-connect" && 
            tab.id !== "wdr-tab-open" && 
            tab.id !== "wdr-tab-save"
        );
        toolbar.getTabs = () => tabs;
    }, []);

    const handleReportChange = useCallback(() => {
        if (pivotRef.current) {
            try {
                const report = pivotRef.current.webdatarocks.getReport();
                // Сохраняем только настройки отчета
                const configToSave = {
                    slice: report.slice || {},
                    options: report.options || {},
                    conditions: report.conditions || [],
                    formats: report.formats || []
                };
                console.log('Saving report configuration:', configToSave);
                localStorage.setItem('wdr_report_config', JSON.stringify(configToSave));
            } catch (error) {
                console.error('Error saving report:', error);
            }
        }
    }, []);

    useEffect(() => {
      if (pivotRef.current) {
          const wdr = pivotRef.current.webdatarocks;
          const events = ['reportchange', 'update', 'reportcomplete'];
          
          events.forEach(event => {
              wdr.on(event, handleReportChange);
          });
  
          return () => {
              if (pivotRef.current) {
                  const wdr = pivotRef.current.webdatarocks;
                  events.forEach(event => {
                      wdr.off(event, handleReportChange);
                  });
              }
          };
      }
      return () => {}; // Пустая функция очистки для случая, когда pivotRef.current не существует
  }, [handleReportChange]);

    // Подготовка данных
    const prepareData = (rawData: any) => {
        if (Array.isArray(rawData)) {
            return rawData;
        }
        if (rawData && rawData.data) {
            return Array.isArray(rawData.data) ? rawData.data : [rawData.data];
        }
        return [];
    };

    // Формирование отчета
    const prepareReport = () => {
        const savedReport = localStorage.getItem('wdr_report_config');
        const savedConfig = savedReport ? JSON.parse(savedReport) : null;

        const preparedData = prepareData(data);
        console.log('Prepared data:', preparedData);

        return {
            dataSource: {
                data: preparedData
            },
            slice: savedConfig?.slice || {
                rows: [],
                columns: [],
                measures: [{
                    uniqueName: Object.keys(preparedData[0] || {})[0],
                    aggregation: 'sum'
                }],
                reportFilters: []
            },
            options: savedConfig?.options || {
                grid: {
                    type: "compact",
                    title: "",
                    showFilter: true,
                    showHeaders: true,
                    showTotals: true,
                    showGrandTotals: "on",
                    showHierarchies: true,
                    showHierarchyCaptions: true,
                    showReportFiltersArea: true
                }
            },
            conditions: savedConfig?.conditions || [],
            formats: savedConfig?.formats || []
        };
    };

    const initialReport = prepareReport();
    console.log('Initial report:', initialReport);

    const pivotConfig: PivotConfig = {
        toolbar: config.showToolbar,
        report: initialReport,
        width: "100%",
        height: 300,
        ...(config.showToolbar && { beforetoolbarcreated: customizeToolbar })
    };

    return (
        <WebDataRocksReact.Pivot 
            ref={pivotRef}
            {...pivotConfig} 
        />
    );
};