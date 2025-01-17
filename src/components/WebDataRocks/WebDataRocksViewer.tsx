//WebDataRocksViewer.tsx
import * as WebDataRocksReact from "@webdatarocks/react-webdatarocks";
import React, { useRef, useCallback, useEffect } from "react";

export interface WDRConfig {
    showToolbar: boolean;
    report_config?: string;
    onConfigChange?: (config: string) => void;
    onCellClick?: (cell: any) => void;
}

export interface WebDataRocksViewerProps {
    data?: any;
    header?: any;
    report?: any;
    config: WDRConfig;
    height: number;
    width: number;
}

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
    width: number;
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
    //report,
    config,
    height,
    width,
}: WebDataRocksViewerProps) => {
    const pivotRef = useRef<PivotWithWebDataRocks>(null);

    const customizeToolbar = useCallback((toolbar: Toolbar) => {
        
        let tabs = toolbar.getTabs();
        tabs = tabs.filter(
            (tab: Tab) =>
                tab.id !== "wdr-tab-connect" &&
                tab.id !== "wdr-tab-open" &&
                tab.id !== "wdr-tab-save"
        );
        //toolbar.getTabs = () => tabs;
        if (pivotRef.current) {
            toolbar.getTabs = () => {
                tabs.unshift({
                    id: "war-tab-expand",
                    title: "Expand",
                    handler: () => pivotRef.current?.webdatarocks.expandAllData(),
                    //icon: toolbar.icons.open,
                });

                tabs.unshift({
                    id: "war-tab-collapse",
                    title: "Collapse",
                    handler: () => pivotRef.current?.webdatarocks.collapseAllData(),
                    //icon: toolbar.icons.,
                });

                return tabs;
            }
        }

    }, []);

    const cellClick = useCallback((cell) => {
        console.log(cell);
        if (config.onCellClick) {
            config.onCellClick(cell);
        } else {
            console.warn("onCellClick is not available");
        }
    }, [config.onCellClick]);

    useEffect(() => {
        if (pivotRef.current) {
            const wdr = pivotRef.current.webdatarocks;
            const event = "cellclick";

            wdr.on(event, cellClick);

            return () => {
                if (pivotRef.current) {
                    const wdr = pivotRef.current.webdatarocks;
                    wdr.off(event, cellClick);
                }
            };
        }
        return () => { }; // Пустая функция очистки для случая, когда pivotRef.current не существует
    }, [cellClick]);

    const handleReportChange = useCallback(() => {
        if (pivotRef.current) {
            try {
                //console.log("Event report");
                const report = pivotRef.current.webdatarocks.getReport();
                // Сохраняем только настройки отчета
                const configToSave = {
                    slice: report.slice || {},
                    options: report.options || {},
                    conditions: report.conditions || [],
                    formats: report.formats || [],
                };

                const configString = JSON.stringify(configToSave, null, 2);
                if (config.onConfigChange) {
                    //console.log('Calling onConfigChange with new config');
                    config.onConfigChange(configString);
                } else {
                    console.warn("onConfigChange is not available");
                }

                //console.log('Saving report configuration:', configToSave);
                //localStorage.setItem('wdr_report_config', JSON.stringify(configToSave));
            } catch (error) {
                console.error("Error saving report:", error);
            }
        }
    }, [config.onConfigChange]);

    useEffect(() => {
        if (pivotRef.current) {
            const wdr = pivotRef.current.webdatarocks;
            const events = ["reportchange", "update", "reportcomplete"];

            events.forEach((event) => {
                wdr.on(event, handleReportChange);
            });

            return () => {
                if (pivotRef.current) {
                    const wdr = pivotRef.current.webdatarocks;
                    events.forEach((event) => {
                        wdr.off(event, handleReportChange);
                    });
                }
            };
        }
        return () => { }; // Пустая функция очистки для случая, когда pivotRef.current не существует
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
        //const savedReport = localStorage.getItem('wdr_report_config');
        const savedReport = config.report_config;
        const savedConfig = savedReport ? JSON.parse(savedReport) : null;

        const preparedData = prepareData(data);

        const mergeData = () => {
            const result = [
                {
                    ...header.dataHeader.data,
                },
                ...preparedData,
            ];
            return result;
        };
        
        const mergedData = mergeData();
        

        return {
            dataSource: {
                //data: preparedData
                data: mergedData,
            },
            slice: savedConfig?.slice || {
                rows: [],
                columns: [],
                measures: [
                    {
                        uniqueName: Object.keys(preparedData[0] || {})[0],
                        aggregation: "sum",
                    },
                ],
                reportFilters: [],
            },
            options: savedConfig?.options || {
                grid: {
                    type: "compact",
                    title: "",
                    showFilter: true,
                    showHeaders: false,
                    showTotals: true,
                    showGrandTotals: "on",
                    showHierarchies: true,
                    showHierarchyCaptions: true,
                    showReportFiltersArea: true,
                    drillThrough: true,
                    showAggregationLabels: false,
                    configuratorButton: false,
                    saveAllFormats: true,
                },
            },
            conditions: savedConfig?.conditions || [],
            formats: savedConfig?.formats || [],
        };
    };

    const initialReport = prepareReport();

    const pivotConfig: PivotConfig = {
        toolbar: config.showToolbar,
        report: initialReport,
        width: width,
        height: height,
        global: {
            options: {
                showHeaders: false,
                drillThrough: true,
                showAggregationLabels: false,
                configuratorButton: false,
                saveAllFormats: true,
            },
        },
        ...(config.showToolbar && { beforetoolbarcreated: customizeToolbar }),
    };

    console.log("pivotConfig ",pivotConfig);
    return <WebDataRocksReact.Pivot ref={pivotRef} {...pivotConfig} />;
};
