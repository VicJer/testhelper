import {Observable} from "rxjs";
import {toArray} from "rxjs/operators";

export class ObservableTestBuilder {
    private readonly _observable: Observable<any>;
    private readonly _epic: (
        action$: any,
        store: any,
        { api }: { api: any }
    ) => Observable<any>;
    private readonly _done: any;
    private _apiMock: any;
    private _triggerAction: any;
    private _store: any = null;
    private _expected: (result: any) => void;
    private _expectedException: (error: any) => void;
    //@ts-ignore
    constructor(observableUnderTest: Observable<any>, done: any) {
        this._observable = observableUnderTest;
        this._done = done;
    }
    //@ts-ignore
    constructor(epicUnderTest: (action$: any, store: any, { api }: { api: any }) => Observable<any>, done: any) {
        this._epic = epicUnderTest;
        this._done = done;
    }

    addApiMock(apiMock: any) {
        this._apiMock = apiMock;
        return this;
    }
    addStoreMock(store: any) {
        this._store = store;
        return this;
    }
    addTriggerAction(triggerAction: any) {
        this._triggerAction = triggerAction;
        return this;
    }
    addExpectedOutputMethod(expectedOutput: any) {
        this._expected = expectedOutput;
        return this;
    }
    addExpectedExceptionMethod(expectedOutput: any) {
        this._expectedException = expectedOutput;
        return this;
    }

    private isEpicUnderTest() {
        if (typeof this._expected !== "function")
            throw new Error(
                `Expected output method is required use addExpectedOutputMethod()`
            );
        if (typeof this._expectedException !== "function")
            throw new Error(
                `Expected exception method is required use addExpectedExceptionMethod()`
            );

        if (typeof this._epic === "function") {
            if (!this._triggerAction)
                throw new Error(
                    `Epic requires a trigger action use addTriggerAction() to add one`
                );
            if (!this._apiMock)
                throw new Error(`Epic requires mocked api use addApiMock() to add one`);
            return true;
        }
    }
    private getObservableUnderTest() {
        return this.isEpicUnderTest()
            ? this._epic(this._triggerAction, this._store, this._apiMock)
            : this._observable;
    }

    testRunToCompletion() {
        const sut = this.getObservableUnderTest();
        return sut.pipe(toArray()).subscribe({
            next: this._expected,
            error: this._expectedException,
            complete: () => this._done()
        });
    }
    testRunningObservable() {
        const sut = this.getObservableUnderTest();
        return sut.subscribe({
            next: this._expected,
            error: this._expectedException,
            complete: () => this._done()
        });
    }
}
