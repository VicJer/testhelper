import {BaseObservableTester} from "./BaseObservableTester";
import {Observable} from "rxjs";

export class ObservableTester extends BaseObservableTester{
    set addDone(done: any) {
        this._done = done;
    }

    set addExpectedAssertions(assertions: (result: any) => void) {
        this._successAssertions = assertions
    }
    set addExceptionAssertions(assertions: (result: any) => void) {
        this._exceptionAssertions = assertions;
    }

    set addObservable(observable: Observable<any>) {
        this._observable = observable;
    }
}
