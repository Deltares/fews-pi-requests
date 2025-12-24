/* tslint:disable */

/**
 * WebOCMicroFrontEndsResponse PI_JSON
 */
export interface WebOCMicroFrontEndsResponse {
  microFrontEnds?: WebOCMicroFrontEnds[];
}
export interface WebOCMicroFrontEnds {
  /**
   * the id of the micro front end
   */
  id: string;
  /**
   * icon of the micro front end
   */
  icon: string;
  /**
   * Remote id of the micro front end
   */
  remoteId: string;
  /**
   * Component id of the micro front end
   */
  componentId: string;
  /**
   * Display name where the micro front end will be shown in the WebOC
   */
  display: string;
}
