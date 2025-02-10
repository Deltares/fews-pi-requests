export interface PostWhatIfScenarioFilter {
    whatIfTemplateId: string;
    name: string;

    /**
     * Since 2022.02. Properties can be included in the url. These will be used as
     * taskRunProperties, and override global or workflow properties. Each property has to be added
     * to the url seperately. Example:
     *
     *     &property(fileName)=exportFile&property(outputValue)=9.0
     *
     * Where the name of the property is fileName, the value is exportFile. The name of the second
     * property is outputValue, the value is 9.0.
     */
    properties?: { [key: string]: string | number }
}
