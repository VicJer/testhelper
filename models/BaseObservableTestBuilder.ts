import {BaseObservableTester} from "./BaseObservableTester";
import { Observable } from "rxjs";

export abstract class BaseObservableTestBuilder<T extends BaseObservableTester, B extends BaseObservableTestBuilder<T,B>> {
    protected tester: T;
    protected abstract createTester():T
    constructor(){
        this.tester = this.createTester()
    }
    protected abstract build():T
    protected abstract withObservable(observable: Observable<any>):B
    protected abstract withDone(done:any):B
    protected abstract withExpectedExceptionAssertion(method:(error: any) => void):B
    protected abstract withExpectedOutputAssertion(method:(result: any) => void):B
}
