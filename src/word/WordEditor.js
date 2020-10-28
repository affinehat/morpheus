import React from "react";
import {connect} from "react-redux";

import loadRhymeAPI from "api/RhymeAPI";
import loadSynonymAPI from "api/SynonymAPI";
import WordInput from "components/WordInput";
import {setWord} from "word/wordSlice";

export const WordEditor = props => {
  const {word, setWord} = props;
  loadRhymeAPI();
  loadSynonymAPI();
  return <WordInput wordValue={word} setState={setWord} />;
};

const mapDispatch = {setWord};

const mapState = state => {
  return {word: state.word.word};
};

export default connect(mapState, mapDispatch)(WordEditor);
