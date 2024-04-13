import axios from "axios";
import _ from "lodash";
import { generate } from "random-words";

const generateMcqs = (
  meaning: {
    Text: string;
  }[],
  idx: number
): string[] => {
  const correctAns: string = meaning[idx].Text;

  // An Array with all words except for correct ans
  const allMeaningExceptForCorrect = meaning.filter(
    (i) => i.Text !== correctAns
  );

  // Randomly genrating 3 elements from incorrectArray
  const incorrectOptions: string[] = _.sampleSize(
    allMeaningExceptForCorrect,
    3
  ).map((i) => i.Text);

  const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

  return mcqOptions;
};

export const translateWords = async (lang: LangType): Promise<WordType[]> => {
  try {
    const words = generate(8).map((i) => ({
      Text: i,
    }));
    console.log(words);

    const res = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": lang,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "2dcd82506emsh3d446916255b8a8p1d5e01jsn61c3e440e740",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );
    console.log(res.data);

    const recieved: FetchedDataType[] = res.data;

    const arr: WordType[] = recieved.map((i, idx) => {
      const options = generateMcqs(words, idx);
      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options: options,
      };
    });

    return arr;
  } catch (error) {
    console.error(error);
    throw new Error("Some Error");
  }
};

export const countMatchingElements = (
  arr1: string[],
  arr2: string[]
): number => {
  if (arr1.length !== arr2.length) throw new Error("Arrays are not equal");

  let matchedCount = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchedCount++;
  }

  return matchedCount;
};

export const fetchAudio = async (
  text: string,
  language: LangType
): Promise<string> => {
  const apikey = import.meta.env.TEXT_TO_SPEECH_API_KEY;
  const rapidKey = import.meta.env.TEXT_TO_SPEECH_RAPID_API_KEY;
  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });
  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const { data }: { data: string } = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key: "25e2f6be2ec44d4eaf7bd55516c422c9" },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "2dcd82506emsh3d446916255b8a8p1d5e01jsn61c3e440e740",
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  return data;
};
