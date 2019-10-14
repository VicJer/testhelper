import {ObservableTester} from "../models/ObservableTester";
import {Observable} from "rxjs";
import {BaseObservableTestBuilder} from "../models/BaseObservableTestBuilder";

export class ObservableTestBuilder extends BaseObservableTestBuilder<ObservableTester,ObservableTestBuilder>{
    build(): ObservableTester {
        this.tester.validate();
        return this.tester;
    }
    protected createTester(): ObservableTester {
        return new ObservableTester();
    }

    withDone(done: any): ObservableTestBuilder {
        this.tester.addDone = done;
        return this;
    }

    withExpectedExceptionAssertion(method: (error: any) => void): ObservableTestBuilder {
        this.tester.addExceptionAssertions = method;
        return this;
    }

    withExpectedOutputAssertion(method: (result: any) => void): ObservableTestBuilder {
        this.tester.addExpectedAssertions = method;
        return this;
    }

    withObservable(observable: Observable<any>): ObservableTestBuilder {
        this.tester.addObservable = observable;
        return this;
    }

}
