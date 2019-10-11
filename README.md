# Observable test helper
This is an abstraction library for testing individual observables or react-redux epics.

## Testing Epics

To test your epics use the `EpicTestBuilder`
```
import {myTestEpic} from 'somewhere'

it(`FooBars the foo bar`, (done) => {
    const expectedAssertions = (result)=>{
        expect(result).toEqual();
    };
    const expectedErrorAssertions = (error) => {
        expect(error).toEqual();
    }
    const epicTest = new EpicTestBuilder()
        .withEpic(myTestEpic)
        .withDone(done)
        .withTriggerAction({type:'...',payload:{...}})
        .withApi(mockedAPI)
        .withStore(mockedStore)
        .withExpectedOutputAssertion(expectedAssertions)
        .withExpectedExceptionAssertion(expectedErrorAssertions)
        .build();

    epicTest.testRunToCompletion();
});
```
`withEpic, withDone, withTriggerAction` - are required and at least one of the `withExpectedOutputAssertion` or `withExpectedExceptionAssertion` is required depending if you are asserting error or success, use both if you are asserting both epic throwing errors and emitting values. 

`withApi, withStore` are optional as not every epic require API or Store mocks.

The resulting EpicTester have 2 methods available `testRunningObservable()` and `testRunToCompletion()`.
 
`testRunningObservable()` is meant to test observables that don't complete. 

It will run until your epic either throws an error or you manually unsubscribe from it. The method accepts a `number` parameter which attaches `take(number)` to your test which will wait for `number` amount of emits and complete the running observable for you.
 
 If you are testing the observable that runs to completion `testRunToCompletion()` should be used. 
 
 Both of these methods return `Subscription` which allow you to trigger `unsubscribe()`.
 

## Testing observables
To test your epics use the `ObservableTestBuilder`
```
import {myTestObservable} from 'somewhere'

it(`FooBars the foo bar`, (done) => {
    const expectedAssertions = (result)=>{
        expect(result).toEqual();
    };
    const expectedErrorAssertions = (error) => {
        expect(error).toEqual();
    }
    const observableTest = new ObservableTestBuilder()
        .withObservable(myTestObservable)
        .withDone(done)
        .withExpectedOutputAssertion(expectedAssertions)
        .withExpectedExceptionAssertion(expectedErrorAssertions)
        .build();

    observableTest.testRunToCompletion();
});
```
Pretty much the same rules apply just how much mocking you need to pass is reduced.

Happy testing

!["happy testing"](https://media.giphy.com/media/i5RWkVZzVScmY/200w.gif)
