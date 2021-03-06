import {BaseEpicObservableTester} from "./BaseEpicObservableTester";
import {Epic} from "./Epic";

export abstract class BaseEpicTestBuilder<T extends BaseEpicObservableTester, B extends BaseEpicTestBuilder<T,B>> {
    protected tester: T;
    protected abstract createTester():T
    constructor(){
        this.tester = this.createTester();
    }
    protected abstract build():T
    protected abstract withApi(api: any):B
    protected abstract withDone(done:any):B
    protected abstract withEpic(epic: Epic):B
    protected abstract withExpectedExceptionAssertion(method:(error: any) => void):B
    protected abstract withExpectedOutputAssertion(method:(result: any) => void):B
    protected abstract withStore(store: any):B
    protected abstract withTriggerAction(action: any):B
}


