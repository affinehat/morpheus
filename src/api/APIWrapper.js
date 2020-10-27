import React, {useEffect} from "react";
import {fromEvent} from "rxjs";
import axios from "axios";

export default function show() {
  useEffect(() => {
    const button = document.getElementById("myButton");

    const myObservable = fromEvent(button, "click");

    const myObserver = {
      next: event => console.log(event),
      error: error => console.log(error),
      complete: () => console.log("complete!")
    };

    const subscription = myObservable.subscribe(myObserver);

    return () => subscription.unsubscribe();
  }, []);
}
