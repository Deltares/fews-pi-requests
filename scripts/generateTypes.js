import { exec } from "child_process";

const config = {
  url: "https://fewsdocs.deltares.nl/webservices/rest-api/v1/schemas/pirest",
  message: "/* tslint:disable */",
};

const piCommands = [
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
    url: `${config.url}/pi_rest_logdisplay_logs.json`,
    output: "src/response/logs/logDisplayLogsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_whatifscenariodescriptors.json`,
    output: "src/response/embedded/whatIfScenarioDescriptorsResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_whatifscenariodescriptor.json`,
    output: "src/response/embedded/whatIfScenarioDescriptorResponse.ts",
  },
  {
    url: `${config.url}/pi_rest_weboc_component_settings.json`,
    output: "src/response/configuration/webOcComponentSettingsResponse.ts",
  },
];

const archiveCommands = [
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

const generateTypes = (commands) => {
  commands.forEach((command) => {
    const cmd = `curl ${command.url} | json2ts --bannerComment "${config.message}" > ${command.output}`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${cmd}\n${error}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Output: ${stdout}`);
    });
  });
};

const type = process.argv[2];

if (type === "pi") {
  generateTypes(piCommands);
} else if (type === "archive") {
  generateTypes(archiveCommands);
} else {
  console.error('Invalid argument. Use "pi" or "archive".');
}
