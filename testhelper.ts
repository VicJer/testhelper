import {Observable} from "rxjs";
import {toArray} from "rxjs/operators";

export class TestBuilder<T> {
    private _successCallback: () => void;
    private _errorCallback: () => void;
    private _completeCallback: () => void;
    private _successAssertions: any[];
    private _errorAssertions: any[];
    private readonly _observable: Observable<T>;

    constructor(observableUnderTest: Observable<T>) {
        this._observable = observableUnderTest;
    }

    addSuccessAssertions(assertionsArry:any[]){
       this._successAssertions = assertionsArry;
    }

    addErrorAssertions(assertionsArry:any[]){
        this._errorAssertions = assertionsArry;
    }

    succcess(successCb: any) {
        this._successCallback = successCb;
        return this;
    }
    error(errCb: any) {
        this._errorCallback = errCb;
        return this;
    }
    complete(completeCb: any) {
        this._completeCallback = completeCb;
        return this;
    }
    private validate() {
        if (!this._successCallback) { throw new Error(`Test helper requires success callback`); }
        if (typeof this._successCallback !== 'function') { throw new Error(`Success callback has to be a function`); }
        if (!this._errorCallback) { throw new Error(`Test helper requires error callback`); }
        if (typeof this._errorCallback !== 'function') { throw new Error(`Error callback has to be a function`); }
        if (!this._completeCallback) { throw new Error(`Test helper requires complete callback`); }
        if (typeof this._completeCallback !== 'function') { throw new Error(`Complete callback has to be a function`); }
    }

    build() {
        this.validate();
        return this._observable.pipe(toArray()).subscribe({
            next: this._successCallback,
            error: this._errorCallback,
            complete: this._completeCallback
        })
    }
}
