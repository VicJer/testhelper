import { of, throwError, combineLatest, interval } from "rxjs";
import {ObservableTestBuilder} from "./ObservableTestBuilder";
import { mergeMap, retry } from "rxjs/operators";
describe("Observable test builder", () => {
    beforeEach(expect.hasAssertions);
    const source1 = of(1, 2, 3);
    const source2 = throwError(new Error("woops"));
    const source3 = of(4, 5, 6);
    const source = combineLatest(source1, source2, source3);

    const s = interval(200);
    const running = s.pipe(
        mergeMap(val => {
            if (val > 5) {
                return throwError("Error!");
            }
            return of(val);
        }),
        retry(2)
    );

    it("Throws an error when observable isn't provided", () => {
        try{
            new ObservableTestBuilder().build()
        }catch (e){
            expect(e.toString()).toEqual("Error: Test observable is missing add it using withObservable().")
        }

    });

    it("Throws an error when done isn't provided", () => {
        try {
            new ObservableTestBuilder()
                .withObservable(source)
                .build()
        }catch (e){
            expect(e.toString()).toEqual("Error: Done reference is missing add it using withDone()")
        }
    });

    it("Throws an error when assertions aren't provided", (done) => {
        try {
            new ObservableTestBuilder()
                .withObservable(source)
                .withDone(done)
                .build()
        }catch (e){
            expect(e.toString()).toEqual("Error: Assertion method or exception assertion method is required add it using withExpectedExceptionAssertion() or withExpectedOutputAssertion()");
            done();
        }
    });

    it("Error assertion method is called on error work", (done)=>{
        const err = jest.fn();
        new ObservableTestBuilder()
            .withObservable(source)
            .withDone(done)
            .withExpectedExceptionAssertion(err)
            .build()
            .testRunToCompletion();
        expect(err).toHaveBeenCalled();
    });
    it("Error assertions are evaluated properly", (done)=>{
        new ObservableTestBuilder()
            .withObservable(source)
            .withDone(done)
            .withExpectedExceptionAssertion((err)=>{expect(err.toString()).toEqual("Error: woops")})
            .build()
            .testRunToCompletion();
    });

    it("Output assertion method is called on success work", (done)=>{
        const success = jest.fn();
        new ObservableTestBuilder()
            .withObservable(source1)
            .withDone(done)
            .withExpectedOutputAssertion(success)
            .build()
            .testRunToCompletion();
        expect(success).toHaveBeenCalled();
    });

    it("Output assertions are evaluated properly", (done)=>{
        new ObservableTestBuilder()
            .withObservable(source1)
            .withDone(done)
            .withExpectedOutputAssertion((val)=>{expect(val).toEqual([1, 2, 3])})
            .build()
            .testRunToCompletion();
    });

    it("Evaluates running observables",(done)=>{
        new ObservableTestBuilder()
            .withObservable(running)
            .withDone(done)
            .withExpectedOutputAssertion((v)=>{expect(v).toBeLessThanOrEqual(5)})
            .withExpectedExceptionAssertion((e)=>expect(e).toEqual('Error!'))
            .build()
            .testRunningObservable(); // runs until observable times out or errors out;
    });

    it("Limits the emits in long running observables",(done)=>{
        let mocked = jest.fn();
        const subscription = new ObservableTestBuilder()
            .withObservable(running)
            .withDone(done)
            .withExpectedOutputAssertion(mocked)
            .build()
            .testRunningObservable(5);
        subscription.add(()=>expect(mocked).toHaveBeenCalledTimes(5)) //evaluate on teardown
    })
});
