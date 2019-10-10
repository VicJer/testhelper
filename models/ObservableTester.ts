import {BaseObservableTester} from "./BaseObservableTester";
import {Observable, Subscription} from "rxjs";
import {toArray} from "rxjs/operators";

export class ObservableTester extends BaseObservableTester{
    private _observable: Observable<any>
    private _done: any;
    private _successAssertions: (result: any) => void;
    private _exceptionAssertions: (result: any) => void;
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

    validate(): void {
        if(typeof this._observable !== 'object') throw new Error("You haven't added any observables.");
        if(!this._done) throw new Error("Reference to test case done callback is required");
        if(typeof this._successAssertions !== "function" && typeof this._exceptionAssertions){
            throw new Error("Assertion method or exception assertion method is required")
        }
    }

    testRunToCompletion(): Subscription {
        return this._observable.pipe(toArray()).subscribe({
            next: this._successAssertions,
            error: (err)=>{
                this._exceptionAssertions(err);
                this._done();
            } ,
            complete:() => this._done()
        })
    }

    testRunningObservable(): Subscription {
        return this._observable.subscribe({
            next: this._successAssertions,
            error: (err)=>{
                this._exceptionAssertions(err);
                this._done();
            } ,
            complete:() => this._done()
        })
    }
}
