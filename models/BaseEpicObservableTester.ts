import {BaseObservableMethods} from "./BaseObservableMethods";
import {Epic} from "./Epic";

export abstract class BaseEpicObservableTester extends BaseObservableMethods{
    abstract set addEpic(epic: Epic)
    abstract set addDone(done: any)
    abstract set addApi(val: any)
    abstract set addTriggerAction(val: any)
    abstract set addStore(val: any)
}
