// https://api.mymemory.translated.net/get?q={}&langpair={}|{}
import { countries } from "./translator-data.js";

let fromTextArea = document.querySelector(".from-textarea");
let toTextArea = document.querySelector(".to-textarea");
let fromLanguageSelect = document.querySelector(".from-select");
let toLanguageSelect = document.querySelector(".to-select");
let btn = document.querySelector(".btn");


const options = Object.entries(countries).map(([code, language]) => {
    return `<option value="${code}">${language}</option>`;
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
  try {
    let result = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(string)}&langpair=${from}|${to}`,
  );
  let {responseData} = await result.json();
  // console.log(data);
  let {translatedText} = responseData;
  // console.log(translatedText);

  toTextArea.value = translatedText;
  } catch(e) {
    console.log(e.message);
    // console.log("Catch");  
    
  }
}
