import {Observable, Subscription} from "rxjs";
import {BaseObservableMethods} from "./BaseObservableMethods";
import {take, toArray} from "rxjs/operators";
export abstract class BaseObservableTester extends BaseObservableMethods{
    protected _observable: Observable<any>;
    protected _done: any;
    protected _successAssertions: (result: any) => void;
    protected _exceptionAssertions: (result: any) => void;

    abstract set addObservable(observable: Observable<any>)
    abstract set addDone(done: any)

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

    testRunningObservable(limit:number = 0): Subscription {
        const s = this._observable;
        let ret = s;
        if(limit > 0){
            ret = s.pipe(take(limit))
        }
        return ret.subscribe({
            next: this._successAssertions,
            error: (err)=>{
                this._exceptionAssertions(err);
                this._done();
            } ,
            complete:() => this._done()
        })
    }
}
