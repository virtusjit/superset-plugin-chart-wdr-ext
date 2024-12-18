/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
      controlSetRows: [
        ['columns'],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },
    {
      label: t('text'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'header_text',
            config: {
              type: 'TextControl',
              default: 'Hello, World!',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Header Text'),
              description: t('The text you want to see in the header'),
            },
          },
        ],
        [
          {
            name: 'show_toolbar',
            config: {
              type: 'CheckboxControl',
              label: t('Show toolbar'),
              renderTrigger: true,
              default: true,
              description: t('Show WDR toolbar'),
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
