import {Observable, Subscription, throwError} from "rxjs";
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
        if(typeof this._observable !== 'object') throw new Error("Test observable is missing add it using withObservable().");
        if(!this._done || typeof this._done !== "function") throw new Error("Done reference is missing add it using withDone()");
        if(typeof this._successAssertions !== "function" && typeof this._exceptionAssertions !== "function"){
            throw new Error("Assertion method or exception assertion method is required add it using withExpectedExceptionAssertion() or withExpectedOutputAssertion()")
        }
    }

    testRunToCompletion(): Subscription {
        return this._observable.pipe(toArray()).subscribe({
            next: this._successAssertions,
            error: (err)=>{
                if(typeof this._exceptionAssertions === "function"){
                    this._exceptionAssertions(err);
                }else{
                    throw new Error(`Did not expect error yet ${err} was thrown`);
                }
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
                if(typeof this._exceptionAssertions === "function"){
                    this._exceptionAssertions(err);
                    this._done();
                }else{
                    throw new Error(`Did not expect error yet ${err} was thrown`);
                }
            } ,
            complete:() => this._done()
        })
    }
}
