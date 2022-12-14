import DataRequestResult from "./dataRequestResult";

export default class PiRestService {
    private readonly webserviceUrl: string;
    private _oauth2Token: string | undefined = undefined;


    set oauth2Token(value: string) {
        this._oauth2Token = value;
    }

    constructor(webserviceUrl: string) {
        this.webserviceUrl = webserviceUrl;
    }

    public async getData<T>(url: string): Promise<DataRequestResult<T>> {
        const dataRequestResult = {} as DataRequestResult<T>;
        const requestParameters = {} as RequestInit;
        requestParameters.method = "GET";
        if (this._oauth2Token !== undefined) {
            requestParameters.headers = {"Authorization": "Bearer " + this._oauth2Token}
        }

        const res = await fetch(url,requestParameters);
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
        if (this._oauth2Token !== undefined) {
            const authorizationHeader = {"Authorization": "Bearer " + this._oauth2Token};
            requestInit.headers = {...authorizationHeader, ...requestInit.headers};
        }
        const res = await fetch(url, requestInit);
        return await this.processResponse(dataRequestResult, res, url);
    }
}
