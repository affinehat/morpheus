import React, {useRef, useEffect} from "react";
import {connect} from "react-redux";

import {Subject} from "rxjs";
import {debounceTime, filter} from "rxjs/operators";

import {EditorView, keymap} from "@codemirror/next/view";
import {EditorState} from "@codemirror/next/state";
import {defaultKeymap} from "@codemirror/next/commands";

import {setText, setCurrentWord} from "editor/editorSlice";

export const LyricsEditor = props => {
  const {text, setText, setCurrentWord, ...otherProps} = props;
  const cmWrapper = useRef(null);

  useEffect(() => {
    const updates$ = new Subject();

    const updates = EditorView.updateListener.of(update => {
      updates$.next(update);
    });

    const cm = new EditorView({
      state: EditorState.create({
        doc: text,
        extensions: [keymap(defaultKeymap), updates]
      })
    });

    cmWrapper.current.append(cm.dom);

    updates$
      .pipe(
        filter(update => update.docChanged),
        debounceTime(250)
      )
      .subscribe(update => {
        setText(update.state.doc.toString());
        let selection = update.state.selection;
        let anchor = selection.ranges[selection.primaryIndex].anchor;
        let line = update.state.doc.lineAt(anchor);
        let anchorIndex = anchor - line.from;

        let isSpace = index => /\s/.test(line.content.charAt(index - 1));
        if (isSpace(anchorIndex) && !isSpace(anchorIndex + 1)) {
          anchorIndex++;
        }

        let left = line.slice(0, anchorIndex).search(/\S+$/);
        let right = line.slice(anchorIndex).search(/\s/);
        if (right < 0) {
          right = line.to - anchorIndex;
        }
        setCurrentWord(line.slice(left, anchorIndex + right));
      });
  }, []);

  return <div {...otherProps} ref={cmWrapper}></div>;
};

const mapDispatch = {setText, setCurrentWord};

const mapState = state => {
  return {text: state.editor.text};
};

export default connect(mapState, mapDispatch)(LyricsEditor);
