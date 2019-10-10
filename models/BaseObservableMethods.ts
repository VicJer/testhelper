import {Subscription} from "rxjs";

export abstract class BaseObservableMethods{
    abstract testRunToCompletion(): Subscription
    abstract testRunningObservable(limit:number): Subscription
    abstract validate():void;
    abstract set addExpectedAssertions(assertions: (result: any) => void)
    abstract set addExceptionAssertions(assertions: (result: any) => void)
}
