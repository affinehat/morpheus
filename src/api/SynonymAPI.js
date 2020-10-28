import APIWrapper from "api/APIWrapper";

export default function loadSynonymAPI() {
  APIWrapper("synonymBtn", "https://api.datamuse.com/words?rel_syn=");
}
