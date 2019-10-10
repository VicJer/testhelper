import {BaseEpicObservableTester} from "./BaseEpicObservableTester";
import {Epic} from "./Epic";

export class EpicTester extends BaseEpicObservableTester{
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
}
