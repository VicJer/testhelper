import {EpicTestBuilder} from "./EpicTestBuilder";
import {ObservableTestBuilder} from "./ObservableTestBuilder";

const epicTest = new EpicTestBuilder()
    .withEpic(null)
    .withDone(null)
    .withApi(null)
    .withStore(null)
    .withExpectedExceptionAssertion(null)
    .withExpectedOutputAssertion(null)
    .build();
epicTest.testRunningObservable();

const observableTest = new ObservableTestBuilder()
    .withObservable(null)
    .withDone(null)
    .withExpectedExceptionAssertion(null)
    .build();

observableTest.testRunToCompletion();
