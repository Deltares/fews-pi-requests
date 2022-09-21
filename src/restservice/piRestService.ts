import DataRequestResult from "./dataRequestResult";

export default class PiRestService {
    private readonly webserviceUrl: string;

    constructor(webserviceUrl: string) {
        this.webserviceUrl = webserviceUrl;
    }

    public async getData<T>(url: string): Promise<DataRequestResult<T>> {
        const dataRequestResult = {} as DataRequestResult<T>;
        const res = await fetch(url);
        return await this.processResponse(dataRequestResult, res, url);
    }


    private async processResponse<T>(dataRequestResult: DataRequestResult<T>, res: Response, url: string): Promise<DataRequestResult<T>> {
        dataRequestResult.responseCode = res.status;
        if (res.status != 200) {
            dataRequestResult.errorMessage = res.statusText;
            return dataRequestResult;
        }
        try {
            dataRequestResult.data = await res.json();
        } catch (e: any) {
            e.message += `\n When loading ${url}.`
            throw e;
        }
        return dataRequestResult;
    }

    public async getDataWithRequestInit<T>(url: string, requestInit: RequestInit): Promise<DataRequestResult<T>> {
        const dataRequestResult = {} as DataRequestResult<T>;
        const res = await fetch(url, requestInit);
        return await this.processResponse(dataRequestResult, res, url);
    }
}
