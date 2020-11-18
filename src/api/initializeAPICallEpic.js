import { of } from "rxjs"
import { switchMap, distinctUntilKeyChanged, filter } from "rxjs/operators"
import { ofType } from "redux-observable"

import { setCurrentWord } from "editor/editorSlice"
import { rhymebrainDecoupled } from "api/APIs/rhymebrain"
import { datamuseDecoupled } from "api/APIs/datamuse"

const initializeAPICallEpic = action$ =>
  action$.pipe(
    ofType(setCurrentWord.type),
    distinctUntilKeyChanged("payload"),
    filter(action => action.payload.trim() !== ""),
    switchMap(action => {
      return of(
        rhymebrainDecoupled(),
        datamuseDecoupled(),
      );
    }),
  );

export {initializeAPICallEpic};
