import {Observable, pipe} from "rxjs";
import {distinctUntilKeyChanged, filter} from "rxjs/operators";

//if the response contains no results, return "No matches found"
const first20ResultsOrNoMatches = ajax =>
  ajax.response.length ? ajax.response.slice(0, 20) : [];

const filterUnchangedOrEmptyAPICalls = () =>
  pipe(
    distinctUntilKeyChanged("payload"),
    filter(action => action.payload.trim() !== "")
  );

export {first20ResultsOrNoMatches, filterUnchangedOrEmptyAPICalls};
