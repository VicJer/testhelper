import {Observable} from "rxjs";
import {BaseObservableMethods} from "./BaseObservableMethods";
export abstract class BaseObservableTester extends BaseObservableMethods{
    abstract set addObservable(observable: Observable<any>)
    abstract set addDone(done: any)
}
