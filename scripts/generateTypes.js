import { compile } from 'json-schema-to-typescript';
import fs from 'fs';

const config = {
  url: "https://fewsdocs.deltares.nl/webservices/rest-api/v1/schemas/pirest",
  message: "/* tslint:disable */",
};

const piSchemas = [
  {
    url: `${config.url}/pi_rest_logdisplays.json`,
    output: "src/response/logs/logDisplaysResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_reports.json`,
    output: "src/response/reports/reportsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_history_edits.json`,
    output: "src/response/timeseries/historyEditsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_flag_sources.json`,
    output: "src/response/flags/TimeSeriesFlagSourcesResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_flags.json`,
    output: "src/response/flags/TimeSeriesFlagsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_displaygroups_nodes.json`,
    output: "src/response/displaygroups/DisplayGroupsNodesResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_weboc_configuration.json`,
    output: "src/response/configuration/WebOcConfigurationResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_web_oc_micro_front_ends.json`,
    output: "src/response/microfrontends/webOcMicroFrontEndsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_importstatus.json`,
    output: "src/response/importStatus/importStatusResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_timeseries.json`,
    output: "src/response/timeseries/timeSeriesResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_parameters.json`,
    output: "src/response/timeseriesparameters/timeSeriesParametersResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_actions.json`,
    output: "src/response/actions/actionsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_topology_nodes.json`,
    output: "src/response/topology/topologyNodeResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_locations.json`,
    output: "src/response/locations/locationsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_topology_thresholds.json`,
    output: "src/response/topology/thresholdsNodeResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_workflows.json`,
    output: "src/response/workflows/workflowsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_web_oc_dashboards.json`,
    output: "src/response/dashboards/webOcDashboardsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_weboc_component_settings.json`,
    output: "src/response/configuration/webOcComponentSettingsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_forecaster_notes.json`,
    output: "src/response/forecasternotes/forecasterNotesResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_forecaster_notes_post.json`,
    output: "src/requestParameters/forecasterNoteBody.ts",
  },
  {
    url: `${config.url}/pi_rest_workflow_forecast_times.json`,
    output: "src/response/workflows/forecastTimesResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_workflow_fss_info.json`,
    output: "src/response/workflows/fssInfoResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_document_displays.json`,
    output: "src/response/documentdisplays/documentDisplaysResponse.ts"
  },
  // FIXME: Currently the backend does not have the correct type for enum value's
  // {
  //   url: `${config.url}/pi_rest_whatifscenariodescriptors.json`,
  //   output: "src/response/embedded/whatIfScenarioDescriptorsResponse.ts",
  // },
  // FIXME: Currently having the type: const in the json schema is quite difficult.
  //        The backend tests give errors.
  // {
  //   url: `${config.url}/pi_rest_whatiftemplates.json`,
  //   output: "src/response/embedded/whatIfTemplatesResponse.ts",
  // }
  {
    url: `${config.url}/pi_rest_timesteps.json`,
    output: "src/response/timeseries/timestepsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_colors.json`,
    output: "src/response/configuration/colorsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_statistics_correlation.json`,
    output: "src/response/statistics/correlationResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_data_analysis_displays.json`,
    output: "src/response/dataanalysis/dataAnalysisDisplaysResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_taskrunstatus.json`,
    output: "src/response/tasks/taskRunStatusResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_user_setting_user_ids.json`,
    output: "src/response/usersettings/userSettingUsersResponse.ts",
  },
];

const archiveSchemas = [
  {
    url: `${config.url}/pi_rest_archive_areas.json`,
    output: "src/response/archivearea/ArchiveAreasResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_archive_attributes.json`,
    output: "src/response/archiveattributes/ArchiveAttributesResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_archive_externalnetcdfstorageforecasts.json`,
    output:
      "src/response/archivenetcdfstorageforecasts/ArchiveExternalNetCdfStorageForecastsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_archive_locations.json`,
    output: "src/response/archivelocations/ArchiveLocationsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_archive_parameters.json`,
    output: "src/response/archiveparameters/ArchiveParametersResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_archive_productsmetadata.json`,
    output:
      "src/response/archiveproductsmetadata/ArchiveProductsMetaDataResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_archive_sources.json`,
    output: "src/response/archivesources/ArchiveSourcesResponse.ts",
  },
];

const generateTypes = async (schemas) => {
  for (const schema of schemas) {
    try {
      const response = await fetch(schema.url);
      const data = await response.json();
      const ts = await compile(data, schema.output, {
        bannerComment: config.message,
      });
      fs.writeFileSync(schema.output, ts);
    } catch (error) {
      console.error(`Error processing file ${schema.url}: ${error}`);
    }
  }
};

const type = process.argv[2];

if (type === "pi") {
  generateTypes(piSchemas);
} else if (type === "archive") {
  generateTypes(archiveSchemas);
} else {
  console.error('Invalid argument. Use "pi" or "archive".');
}
