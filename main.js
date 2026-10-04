// https://api.mymemory.translated.net/get?q={}&langpair={}|{}
import { countries } from "./translator-data.js";

let fromTextArea = document.querySelector(".from-textarea");
let toTextArea = document.querySelector(".to-textarea");
let fromLanguageSelect = document.querySelector(".from-select");
let toLanguageSelect = document.querySelector(".to-select");
let btn = document.querySelector(".btn");


const options = Object.entries(countries).map(([code, language]) => {
    return `<option value=${code}>${language}</option>`;
}).join("");

fromLanguageSelect.innerHTML = options
toLanguageSelect.innerHTML = options


btn.addEventListener("click", () => {
  let plainText = fromTextArea.value;
  let fromLanguageValue = fromLanguageSelect.value;
  let toLanguageValue = toLanguageSelect.value;
//   console.log(plainText);
//   console.log(fromLanguageValue);
//   console.log(toLanguageValue);
  //   console.log(fromlanguageValue);

  translate(plainText, fromLanguageValue, toLanguageValue);
});

async function translate(string, from, to) {
  let result = await fetch(
    `https://api.mymemory.translated.net/get?q=${string}&langpair=${from}|${to}`,
  );
  let data = await result.json();
  console.log(data);

  let responseData = data["responseData"];
  let translatedText = responseData["translatedText"];
  // console.log(translatedText);

  toTextArea.innerHTML = translatedText;
}
