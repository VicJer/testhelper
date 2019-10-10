import {Subscription} from "rxjs";
import {toArray} from "rxjs/operators";
import {BaseEpicObservableTester} from "./BaseEpicObservableTester";
import {Epic} from "./Epic";

export class EpicTester extends BaseEpicObservableTester{
    private _epic: Epic;
    private _done: any;
    private _triggerAction: any;
    private _apiMock: any = null;
    private _store: any = null;
    private _successAssertions: (result: any) => void;
    private _exceptionAssertions: (result: any) => void;

    constructor(){
        super();
    }

    set addApi(val: any) {
        this._apiMock = val;
    }

    set addStore(val: any) {
        this._store = val;
    }

    set addTriggerAction(val: any) {
        this._triggerAction = val;
    }

    set addEpic(epic: Epic) {
        this._epic = epic;
    }
    set addDone(done: any) {
        this._done = done;
    }
    set addExpectedAssertions(assertions: (result: any) => void) {
        this._successAssertions = assertions
    }
    set addExceptionAssertions(assertions: (result: any) => void) {
        this._exceptionAssertions = assertions;
    }
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
