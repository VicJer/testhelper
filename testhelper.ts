import {EpicTestBuilder} from "./EpicTestBuilder";

const epicTest = new EpicTestBuilder()
    .withEpic(null)
    .withDone(null)
    .withApi(null)
    .withStore(null)
    .withExpectedExceptionAssertion(null)
    .withExpectedOutputAssertion(null)
    .build();
epicTest.testRunningObservable();

/*import {Observable} from "rxjs";
import {toArray} from "rxjs/operators";

//TODO: In case of testing running observable need to add takeUntil or take with numbers;

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
}*/
/*
type TestEpic = (
  action$: any,
  store: any,
  { api }: { api: any }
) => Observable<any>;

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

  constructor(observableUnderTest: Observable<any> | TestEpic, done: any) {
    if (typeof observableUnderTest === `object`) {
      this._observable = observableUnderTest;
    } else if (typeof observableUnderTest === `function`) {
      this._epic = observableUnderTest;
    }
    this._done = done;
  }

  setApiMock(apiMock: any) {
    this._apiMock = apiMock;
    return this;
  }
  setStoreMock(store: any) {
    this._store = store;
    return this;
  }
  setTriggerAction(triggerAction: any) {
    this._triggerAction = triggerAction;
    return this;
  }
  setExpectedOutputAssertion(expectedOutput: (result: any) => void) {
    this._expected = expectedOutput;
    return this;
  }
  setExpectedExceptionAssertion(expectedOutput: (error: any) => void) {
    this._expectedException = expectedOutput;
    return this;
  }

  private isEpicUnderTest() {
    if (
      typeof this._expected !== "function" &&
      typeof this._expectedException !== "function"
    ) {
      throw new Error(
        `You need to provide at least one of the assertion methods using setExpectedOutputAssertion or setExpectedExceptionAssertion`
      );
    }
    if (typeof this._epic === "function") {
      if (!this._triggerAction) {
        throw new Error(
          `Epic requires a trigger action use addTriggerAction() to add one`
        );
      }
      return true;
    }
    return false;
  }
  private getObservableUnderTest() {
    return this.isEpicUnderTest()
      ? this._epic(this._triggerAction, this._store, this._apiMock)
      : this._observable;
  }
  private setUpHandlers(observable: Observable<any>, c = false) {
    const next = typeof this._expected === `function` ? this._expected : noop;
    const error =
      typeof this._expectedException === `function`
        ? this._expectedException
        : err => {
            this._done();
            throw new Error(`Observable completed with error ${err}`);
          };
    const complete = () => this._done();
    const observer = {
      next,
      error,
      complete
    };
    return observable.subscribe(observer);
  }

  testRunToCompletion() {
    const sut = this.getObservableUnderTest().pipe(toArray());
    return this.setUpHandlers(sut);
  }
  testRunningObservable() {
    const sut = this.getObservableUnderTest();
    return this.setUpHandlers(sut);
  }
}
 */
