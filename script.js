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

const characters = document.querySelector("span.page-header__icon").textContent;
const mainMeaning = document
  .querySelector("span.page-header__title-text")
  .textContent.toLowerCase();
const alternativeMeaningsSpan = document.querySelectorAll(
  "p.subject-section__meanings-items"
)[1];
let meanings = [mainMeaning];
if (alternativeMeaningsSpan) {
  const alternativeMeanings = alternativeMeaningsSpan.textContent
    .split(", ")
    .map((t) => t.toLowerCase());
  meanings = [...meanings, ...alternativeMeanings];
}
if (document.querySelector("span.page-header__icon--kanji")) {
  const type = "CharacterType.KANJI";
  const kanjiReadings = document.querySelectorAll(
    "p.subject-readings__reading-items"
  );
  const onyomi = kanjiReadings[0].textContent
    .split(", ")
    .map((txt) => txt.replace(/ /g, "").replace(/(\r\n|\n|\r)/gm, ""));
  const kunyomi = kanjiReadings[1].textContent
    .split(", ")
    .map((txt) => txt.replace(/ /g, "").replace(/(\r\n|\n|\r)/gm, ""));
  const nanori = kanjiReadings[2].textContent
    .split(", ")
    .map((txt) => txt.replace(/ /g, "").replace(/(\r\n|\n|\r)/gm, ""));
  console.log(
    cleanUpAfterStringify(
      JSON.stringify(
        new Kanji(characters, meanings, onyomi, kunyomi, nanori, type)
      )
    )
  );
} else if (document.querySelector("span.page-header__icon--vocabulary")) {
  const type = "CharacterType.VOCABULARY";
  const reading = document.querySelector("div.reading-with-audio__reading")
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
