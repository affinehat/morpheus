import React, {useEffect} from "react";
import {fromEvent} from "rxjs";
import {ajax} from "rxjs/ajax";

export default function loadAPICall(rhyme) {
  useEffect(() => {
    const button = document.getElementById("myButton");
    const displayResults = document.getElementById("results");

    const myObservable = fromEvent(button, "click");

    const myObserver = {
      next: () => {
        const rhymeURL =
          `https://rhymebrain.com/talk?function=getRhymes&word=` + rhyme;

        const results = ajax(rhymeURL);

        const subscription2 = results.subscribe(
          res => {
            displayResults.innerHTML = res.response
              .map(entry => {
                return entry.word;
              })
              .slice(0, 10);
          },
          err => console.error(err)
        );
      },
      error: error => console.log(error),
      complete: () => console.log("complete!")
    };

    const subscription = myObservable.subscribe(myObserver);

    return () => subscription.unsubscribe();
  }, []);
}
