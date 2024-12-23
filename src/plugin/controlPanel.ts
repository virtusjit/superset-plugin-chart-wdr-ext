import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig
} from '@superset-ui/chart-controls';



const config: ControlPanelConfig = {


  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    
    {
      label: t('Query'),
      expanded: true,
      tabOverride: "data",
      controlSetRows: [
        ['columns'],
        ['adhoc_filters'],
        ['row_limit'],
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
};

export default config;
