import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  getStandardizedControls,
} from '@superset-ui/chart-controls';

import { includeTimeControlSetItem } from './controls/includeTime';
import {
  rowLimitControlSetItem,
  timeSeriesLimitMetricControlSetItem,
} from './controls/limits';
import {
  metricsControlSetItem,
  percentMetricsControlSetItem,
  showTotalsControlSetItem,
} from './controls/metrics';
import {
  orderByControlSetItem,
  orderDescendingControlSetItem,
} from './controls/orderBy';
import {
  serverPageLengthControlSetItem,
  serverPaginationControlSetRow,
} from './controls/pagination';
import { queryModeControlSetItem } from './controls/queryMode';
import { allColumnsControlSetItem } from './controls/columns';
import { groupByControlSetItem } from './controls/groupBy';


const themes = [
  ['classic', 'Classic'],
  ['dark', 'Dark'],
  ['green', 'Green'],
  ['lightblue', 'Light Blue'],
  ['orange', 'Orange'],
  ['stripedblue', 'Striped Blue'],
  ['stripedteal', 'Striped Teal'],
  ['teal', 'Teal']
];

const config: ControlPanelConfig = {


  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [queryModeControlSetItem],
        [groupByControlSetItem],
        [metricsControlSetItem, allColumnsControlSetItem],
        [percentMetricsControlSetItem],
        [timeSeriesLimitMetricControlSetItem, orderByControlSetItem],
        [orderDescendingControlSetItem],
        serverPaginationControlSetRow,
        [rowLimitControlSetItem, serverPageLengthControlSetItem],
        [includeTimeControlSetItem],
        [showTotalsControlSetItem],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Options'),
      expanded: true,
      tabOverride: "customize",
      controlSetRows: [
        [
          {
            name: 'showToolbar',
            config: {
              type: 'CheckboxControl',
              label: t('Show toolbar'),
              renderTrigger: true,
              default: true,
              description: t('Show WDR toolbar'),
            },
          },
        ],
        [
          {
            name: 'theme',
            config: {
              type: 'SelectControl',
              label: t('Theme'),
              default: 'stripedteal',
              choices: themes,
              hidden: true,
              renderTrigger: true,
              description: t('Select WebDataRocks theme'),
            },
          },
        ],
        [
          {
            name: 'reportJsonConfig',
            config: {
              type: 'TextAreaControl',
              label: t('Report Configuration'),
              default: "",
              language: 'json',
              height: 200,
              aboveEdge: false,
              description: t('WebDataRocks report configuration in JSON format'),
              renderTrigger: true,
              //validators: [],
            },
          },
        ],
      ],
    },
  ],
  controlOverrides: {
    columns: {
      multi: true,
      validators: [validateNonEmpty],
      description: t('Choose a target'),
    },
  },
  formDataOverrides: formData => ({
    ...formData,
    metrics: getStandardizedControls().popAllMetrics(),
  }),
};

export default config;
