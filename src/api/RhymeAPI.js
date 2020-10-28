import APIWrapper from "api/APIWrapper";

export default function loadRhymeAPI() {
  APIWrapper(
    "rhymeBtn",
    "https://rhymebrain.com/talk?function=getRhymes&word="
  );
}
