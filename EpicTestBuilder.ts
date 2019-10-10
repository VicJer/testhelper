import {Observable} from "rxjs";
import {BaseEpicTestBuilder} from "./models/BaseEpicTestBuilder";
import {EpicTester} from "./EpicTester";

export class EpicTestBuilder extends BaseEpicTestBuilder<EpicTester,EpicTestBuilder>{
    protected createTester(): EpicTester {
        return new EpicTester();
    }

    withDone(done: any): EpicTestBuilder {
        this.tester.addDone = done;
        return this;
    }

    withEpic(epic: (action$: any, store?: any, {api}?: { api: any }) => Observable<any>): EpicTestBuilder {
        this.tester.addEpic = epic;
        return this;
    }

    withApi(api: any): EpicTestBuilder {
        this.tester.addApi = api;
        return this;
    }
    withStore(store: any): EpicTestBuilder {
        this.tester.addStore = store;
        return this;
    }
    withTriggerAction(action: any): EpicTestBuilder {
        this.tester.addTriggerAction = action;
        return this;
    }
    withExpectedExceptionAssertion(method: (error: any) => void): EpicTestBuilder {
        this.tester.addExceptionAssertions = method;
        return this;
    }

    withExpectedOutputAssertion(method: (result: any) => void): EpicTestBuilder {
        this.tester.addExpectedAssertions = method;
        return this;
    }

    build(): EpicTester {
        this.tester.validate();
        return this.tester;
    }
}
