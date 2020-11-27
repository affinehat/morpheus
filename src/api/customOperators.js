import {Observable, pipe} from "rxjs";
import {distinctUntilKeyChanged, filter} from "rxjs/operators";

const filterAPICalls = () =>
  pipe(
    distinctUntilKeyChanged("payload"),
    filter(action => action.payload.trim() !== "")
  );

export {filterAPICalls};
