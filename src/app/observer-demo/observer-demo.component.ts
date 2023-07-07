///<reference path="../../../node_modules/rxjs/internal/operators/takeUntil.d.ts"/>
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of, Subscription, from, interval, throwError, merge, concat} from "rxjs";
import {catchError, concatMap, delay, distinct, filter, find, map, mergeMap, skip, switchMap, take, takeLast, takeUntil, tap} from "rxjs/operators";
import { Person } from './person';


@Component({
  selector: 'observer-demo',
  templateUrl: './observer-demo.html'
})
export class ObserverDemo {

  observer1() {
    let observable = new Observable(
      (subscriber) => {
        subscriber.next(1);
        //subscriber.unsubscribe();
        subscriber.next(2);

      }
    )
    observable.subscribe(
      next =>{
        console.log("it is next")
      },
      error => {console.log("it is error")},
      () => {console.log("it is complete")}
    )
  }

  /**
   * it emits 1, 2, 3 values
   */
  of1(){
    let myObservable1 = of(1, 2, 3);
    let subscription : Subscription  = myObservable1.subscribe(
      (param)=> {
        console.log("this is next " + param);
      }
    )
    subscription.unsubscribe();
  }

  /**
   * emits 1, 2, 3 values
   */
  from1(){
    let observable = from([1,2,3])
    observable.subscribe(
      (next) => {console.log(next)}
    )
  }

  /**
   * emits infinite numbers 1, 2, 3 ... with 1000 ms dealy
   */
  interval1(){
    let observable1 = interval(1000)
    observable1 = observable1.pipe(take(4))
    observable1.subscribe(
      next => {
        console.log("it is next "+next);
      }
    )

    interval(1000).pipe(take(4)).subscribe(
      next => {console.log("it is interval2 "+next)}
    )
  }

  throwError1(){
    throwError(
      () => {
        let error : any = new Error("there is error");
        error.timestamp = Date.now();
        return error;
      }
    ).subscribe(
      (next) => {console.log("it is next" + next)},
      error => { console.log(error())}
    )
  }

  distinct1(){
    of(1,2,2,1,3,4,3)
      .pipe(distinct())
      .subscribe(
        (next) => {console.log(next)}
      )

    of({name : "partha"}, {name: "saradhi"}, {name: "partha"})
      .pipe(
        distinct( ({name}) => name
        )
      )
      .subscribe(
        (next) => {console.log(next)}
      )

      let person1: Person = {personAge: 1, personName: "partha"};
      let person2: Person = {personAge: 2, personName: "saradhi"};
      let person3: Person = {personAge: 3, personName: "gokul"};
      let person4: Person = {personAge: 3, personName: "saradhi"};
      of(person1, person2, person3, person4)
      .pipe(
        distinct( (person: Person) => person.personName
        ))
      .subscribe(
        (next) => {console.log(next)}
      )
  }

  filter1(){
    of(
      {empId: 1, name : "partha"},
      {empId: 2, name: "saradhi"},
      {empId: 3, name: "partha"}
      )
      .pipe(
      filter( (val) => { return val.empId > 2} )
      )
      .subscribe(next => {console.log(next)})
  }

  /**
   * skip first 4 values
   */
  skip1(){
    of(1,2,2,1,3,4,3)
      .pipe( skip(4))
      .subscribe(next => console.log(next));
  }

  take1(){
    //take first 2 values
    of(1,2,2,1,3,4,3)
      .pipe( take(2))
      .subscribe(next => console.log(next));


    // take first 1 value
    of(1,2,2,1,3,4,3)
      .pipe( take(1))
      .subscribe(next => console.log(next));

    // take last 1 value  
    of(1,2,2,1,3,4,9)
      .pipe( takeLast(1))
      .subscribe(next => console.log(next));
  }

  /**
   * find value based predicate which is first occured
   */
  find1(){
    of(1,2,21,8,15,19,18)
      .pipe( 
        find(
          val => val == 21
          )
        ).subscribe(next => console.log(next));
  }

  /**
   * convert data our way
   */
  map1(){    
    of(
      { empId: 1, fn: "partha", ln: "saradhi", fullName: "" },
      { empId: 2, fn: "gokul", ln: "krishna", fullName: "" },
      { empId: 3, fn: "siya", ln: "ram", fullName: "" }
    )
    .pipe(map(value => {
      value.fullName = value.fn + " " + value.ln;
      return value;

    }))
    .subscribe(next => console.log(next));
      
      
    of(
      1, 2, 3
    )
    .pipe(map(
      (value) => { return value * 10 }
    ))
    .subscribe(
      next => console.log(next)
    )
  }

  /**
   * merge two observable vlaues
   */
  mergeMap1(){
    let charObservable = of ('a', 'b' , 'c');
    let ascillObservable =  of (97, 98, 99);

    charObservable.pipe(mergeMap(
      (chars) => {        
        return ascillObservable.pipe(map(ascii => chars + " -> " + ascii));
      }
    ))
    .subscribe(
      next => {console.log(next)}
    )


  }

  /**
   * merge two observable vlaues
   */
  switchMap1(){
    let charObservable = of ('a', 'b' , 'c');
    let ascillObservable =  of (97, 98, 99);

    charObservable.pipe(switchMap(
      (chars) => {        
        return ascillObservable.pipe(map(ascii => chars + " -> " + ascii));
      }
    ))
    .subscribe(
      next => {console.log(next)}
    )

  }

  /**
   * merge two observable vlaues
   */
  concatMap1(){
    let charObservable = of ('a', 'b' , 'c');
    let ascillObservable =  of (97, 98, 99);

    charObservable.pipe(concatMap(
      (chars) => {        
        return ascillObservable.pipe(map(ascii => chars + " -> " + ascii));
      }
    ))
    .subscribe(
      next => {console.log(next)}
    )

  }

  /**
   * add two observables into one observable
   */
  merge1(){
    let obs1 = of( 1, 2, 3);
    let obs2 = of('a', 'b', 'c');
    let obs3 = merge(obs1, obs2);
    obs3.subscribe(
      next => console.log(next)
    )
  }

  /**
   * add two observables into one observable
   */
  concat1(){
    let obs1 = of( 1, 2, 3);
    let obs2 = of('a', 'b', 'c');
    let obs3 = concat(obs1, obs2);
    obs3.subscribe(
      next => console.log(next)
    )
  }

  errorHandling1() {
    let obs1 = of(1, 2, 0, 3);
    obs1.pipe(
      map(
        val => {
          let temp = 0;
          if (val == 0) {
            throw Error("value 0 found");
          }
          else {
            temp = val / 3
          }
          return temp;
        })
    )
    .subscribe(
      next => console.log(next)
    )
  }

  errorHandling2() {
    let obs1 = of(1, 2, 0, 3);
    obs1.pipe(
      map(
        val => {
          let temp = 0;
          if (val == 0) {
            throw Error("value 0 found");
          }
          else {
            temp = val / 3
          }
          return temp;
        }), 
        catchError((error) => {
          return of(0)
        })
    )
    .subscribe(
      next => console.log(next)
    )
  }

  errorHandling3() {
    let obs1 = of(1, 2, 0, 3);
    obs1.pipe(
      map(
        val => {
          let temp = 0;
          if (val == 0) {
            throw Error("value 0 found");
          }
          else {
            temp = val / 3
          }
          return temp;
        }), 
        catchError((error) => {
          return of("error found")
        })
    )
    .subscribe(
      next => console.log(next)
    )
  }

  errorHandling4() {
    let obs1 = of(1, 2, 0, 3);
    obs1.pipe(
      map(
        val => {
          let temp = 0;
          if (val == 0) {
            throw Error("value 0 found");
          }
          else {
            temp = val / 3
          }
          return temp;
        }), 
        catchError(
          (error, caught) => caught
        ),
        take(6)
    )
    .subscribe(
      next => console.log(next)
    )
  }

  errorHandling5() {
    let obs1 = of(1, 2, 0, 3);
    obs1.pipe(
      map(
        val => {
          let temp = 0;
          if (val == 0) {
            throw Error("value 0 found");
          }
          else {
            temp = val / 3
          }
          return temp;
        }), 
        catchError(
          error => {throw 'error found at 0'}
        )
    )
    .subscribe(
      next => console.log(next),
      error => console.log(error)
    )
  }

  /**
   * Just to know what value going to be emitted
   */
  tap1(){
    of(1, 2 , 3)
    .pipe(
      tap(console.log)
    )
    .subscribe(
      next => console.log(next)
    )
  }

  /**
   * emit each value with 2000 ms delay
   */
  delay1(){
    of(1, 2 , 3)
    .pipe(
      delay(2000)
    )
    .subscribe(
      next => console.log(next)
    )
  }

}

