import {Config} from "@deltares/fews-ssd-requests"

export interface Result {
    type: string;
    requests: Request[];
    config: Config;
}