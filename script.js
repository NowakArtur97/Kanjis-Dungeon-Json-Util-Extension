class Radical {
  constructor(characters, meanings, type) {
    this.characters = characters;
    this.meanings = meanings;
    this.type = type;
  }
}

class Kanji {
  constructor(characters, meanings, onyomi, kunyomi, nanori, type) {
    this.characters = characters;
    this.meanings = meanings;
    this.onyomi = onyomi;
    this.kunyomi = kunyomi;
    this.nanori = nanori;
    this.type = type;
  }
}

class Word {
  constructor(characters, meanings, reading, type) {
    this.characters = characters;
    this.meanings = meanings;
    this.reading = reading;
    this.type = type;
  }
}

const CHARACTER_SPAN_SELECTOR = "span.page-header__icon";
const MAIN_MEANING_SELECTOR = "span.page-header__title-text";
const ALTERNATIVE_MEANING_SELECTOR = "p.subject-section__meanings-items";
const ALTERNATIVE_MEANING_HEADER_SELECTOR =
  "h2.subject-section__meanings-title";
const KANJI_ICON_SELECTOR = "span.page-header__icon--kanji";
const KANJI_READINGS_SELECTOR = "p.subject-readings__reading-items";
const VOCABULARY_ICON_SELECTOR = "span.page-header__icon--vocabulary";
const VOCABULARY_READINGS_SELECTOR = "div.reading-with-audio__reading";

const characters = document.querySelector(CHARACTER_SPAN_SELECTOR).textContent;
const mainMeaning = document
  .querySelector(MAIN_MEANING_SELECTOR)
  .textContent.toLowerCase();
const alternativeMeaningsSpan = document.querySelectorAll(
  ALTERNATIVE_MEANING_SELECTOR
)[1];
const alternativeMeaningsHeader = document.querySelectorAll(
  ALTERNATIVE_MEANING_HEADER_SELECTOR
)[1];
let meanings = [mainMeaning];
if (
  alternativeMeaningsSpan &&
  alternativeMeaningsHeader &&
  alternativeMeaningsHeader.textContent.includes("Alternative")
) {
  const alternativeMeanings = alternativeMeaningsSpan.textContent
    .split(", ")
    .map((t) => t.toLowerCase());
  meanings = [...meanings, ...alternativeMeanings];
}
if (document.querySelector(KANJI_ICON_SELECTOR)) {
  const type = "CharacterType.KANJI";
  const kanjiReadings = document.querySelectorAll(KANJI_READINGS_SELECTOR);
  const emptyLineRegex = /(\r\n|\n|\r)/gm;
  const onyomi = kanjiReadings[0].textContent
    .split(", ")
    .map((txt) => txt.replace(/ /g, "").replace(emptyLineRegex, ""));
  const kunyomi = kanjiReadings[1].textContent
    .split(", ")
    .map((txt) => txt.replace(/ /g, "").replace(emptyLineRegex, ""));
  const nanori = kanjiReadings[2].textContent
    .split(", ")
    .map((txt) => txt.replace(/ /g, "").replace(emptyLineRegex, ""));
  console.log(
    cleanUpAfterStringify(
      JSON.stringify(
        new Kanji(characters, meanings, onyomi, kunyomi, nanori, type)
      )
    )
  );
} else if (document.querySelector(VOCABULARY_ICON_SELECTOR)) {
  const type = "CharacterType.VOCABULARY";
  const reading = document.querySelector(VOCABULARY_READINGS_SELECTOR)
    .textContent;
  console.log(
    cleanUpAfterStringify(
      JSON.stringify(new Word(characters, meanings, reading, type))
    )
  );
} else {
  const type = "CharacterType.RADICAL";
  console.log(
    cleanUpAfterStringify(
      JSON.stringify(new Radical(characters, meanings, type))
    )
  );
}

function cleanUpAfterStringify(text) {
  return (
    text
      .replace('"characters"', "characters")
      .replace('"meanings"', "meanings")
      .replace('"onyomi"', "onyomi")
      .replace('"kunyomi"', "kunyomi")
      .replace('"nanori"', "nanori")
      .replace('"reading"', "reading")
      .replace('"type":"CharacterType.RADICAL"', "type:CharacterType.RADICAL")
      .replace('"type":"CharacterType.KANJI"', "type:CharacterType.KANJI")
      .replace(
        '"type":"CharacterType.VOCABULARY"',
        "type:CharacterType.VOCABULARY"
      )
      .replace('onyomi:["None"],', "")
      .replace('kunyomi:["None"],', "")
      .replace('nanori:["None"],', "") + ","
  );
}
