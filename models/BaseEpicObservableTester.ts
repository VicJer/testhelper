import {BaseObservableMethods} from "./BaseObservableMethods";
import {Epic} from "./Epic";
import {Subscription} from "rxjs";
import {toArray} from "rxjs/operators";

export abstract class BaseEpicObservableTester extends BaseObservableMethods{
    protected _epic: Epic;
    protected _done: any;
    protected _triggerAction: any;
    protected _apiMock: any = null;
    protected _store: any = null;
    protected _successAssertions: (result: any) => void;
    protected _exceptionAssertions: (result: any) => void;

    abstract set addEpic(epic: Epic)
    abstract set addDone(done: any)
    abstract set addApi(val: any)
    abstract set addTriggerAction(val: any)
    abstract set addStore(val: any)

    validate(): void {
        if(typeof this._epic !== 'function') throw new Error("You haven't added any epic.");
        if(!this._triggerAction) throw new Error("You haven't added any trigger action");
        if(!this._done) throw new Error("Reference to test case done callback is required");
        if(typeof this._successAssertions !== "function" && typeof this._exceptionAssertions){
            throw new Error("Assertion method or exception assertion method is required")
        }
    }

    testRunToCompletion(): Subscription {
        return this._epic(this._triggerAction,this._store,this._apiMock).pipe(toArray()).subscribe({
            next: this._successAssertions,
            error: (err)=>{
                this._exceptionAssertions(err);
                this._done();
            } ,
            complete:() => this._done()
        })
    }

    testRunningObservable(): Subscription {
        return this._epic(this._triggerAction,this._store,this._apiMock).subscribe({
            next: this._successAssertions,
            error: (err)=>{
                this._exceptionAssertions(err);
                this._done();
            } ,
            complete:() => this._done()
        })
    }
}
