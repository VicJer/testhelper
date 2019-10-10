import {Observable} from "rxjs";

export type Epic = (action$: any, store?: any, { api }?: { api: any }) => Observable<any>;
