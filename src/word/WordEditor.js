import React from "react";
import {connect} from "react-redux";

import loadAPICall from "api/APIWrapper";
import WordInput from "components/WordInput";
import {setWord} from "word/wordSlice";

export const WordEditor = props => {
  const {word, setWord} = props;
  loadAPICall(word);
  return <WordInput wordValue={word} setState={setWord} />;
};

const mapDispatch = {setWord};

const mapState = state => {
  return {word: state.word.word};
};

export default connect(mapState, mapDispatch)(WordEditor);
