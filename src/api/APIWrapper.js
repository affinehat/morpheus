import React, {useEffect} from "react";
import {fromEvent} from "rxjs";
import {ajax} from "rxjs/ajax";
import store from "../store";

export default function APIWrapper(btnID, baseURL) {
  const state = store.getState();

  useEffect(() => {
    const targetBtn = document.getElementById(btnID);
    const resultsDiv = document.getElementById("results");

    const targetObservable = fromEvent(targetBtn, "click");

    const targetObserver = {
      next: () => {
        const fullURL = baseURL + state.word.word;

        const response = ajax(fullURL);

        const ajaxSubscription = response.subscribe(
          res => {
            resultsDiv.innerHTML = res.response
              .map(entry => {
                return entry.word;
              })
              .slice(0, 20);
          },
          err => console.error(err)
        );
      },
      error: error => console.log(error),
      complete: () => console.log("Complete!")
    };

    const targetSubscription = targetObservable.subscribe(targetObserver);

    return () => targetSubscription.unsubscribe();
  }, [state.word]);
}
