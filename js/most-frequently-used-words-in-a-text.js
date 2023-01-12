/**
 * Assumptions:
 *   A word is a string of letters (A to Z) optionally containing one or more apostrophes (') in ASCII.
 *   Apostrophes can appear at the start, middle or end of a word ('abc, abc', 'abc', ab'c are all valid)
 *   Any other characters (e.g. #, \, / , . ...) are not part of a word and should be treated as whitespace.
 *   Matches should be case-insensitive, and the words in the result should be lowercased.
 *   Ties may be broken arbitrarily.
 *   If a text contains fewer than three unique words, then either the top-2 or top-1 words should be returned, or an empty array if a text contains no words.
 */

/**
 * Examples:
 *
 *   top_3_words("In a village of La Mancha, the name of which I have no desire to call to
 *   mind, there lived not long since one of those gentlemen that keep a lance
 *   in the lance-rack, an old buckler, a lean hack, and a greyhound for
 *   coursing. An olla of rather more beef than mutton, a salad on most
 *   nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
 *   on Sundays, made away with three-quarters of his income.")
 *   # => ["a", "of", "on"]
 *
 *   top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
 *   # => ["e", "ddd", "aa"]
 *
 *   top_3_words("  //wont won't won't")
 *   # => ["won't", "wont"]
 *
 */

function topThreeWords(text) {
  const arr = text
    .replace(/[&#,+()$~%.":*?<>{}/]|'(?=[^a-zA-Z])/g, "")
    .split(" ")
    .filter((i) => i)
    .map((i) => i.toLowerCase());
  const obj = {};
  for (const iterator of arr) {
    obj[iterator] = (obj[iterator] || 0) + 1;
  }
  keysSorted = Object.keys(obj).sort(function (a, b) {
    return obj[b] - obj[a];
  });
  return keysSorted.slice(0, 3);
}

// ------------------------------- Testing -------------------------------------------
const generateHistogram = (s) => {
  const histogram = {};
  s.forEach((wd) => (histogram[wd] ? histogram[wd]++ : (histogram[wd] = 1)));
  return histogram;
};

const sol = (s) => {
  const originalText = s
    .toLowerCase()
    .replace(/[\/,\.]| ' /g, "")
    .split(" ");
  const histo = generateHistogram(originalText);

  return [
    Object.keys(histo)
      .sort((a, b) => histo[b] - histo[a])
      .filter((n) => n)
      .slice(0, 3),
    histo,
  ];
};

const rand = () => Math.random() > 0.5;

const preps = [
    "with",
    "at",
    "from",
    "into",
    "of",
    "among",
    "against",
    "above",
    "for",
    "on",
    "by",
    "to",
    "in",
  ],
  arts = ["a", "the"],
  nouns = [
    "cat",
    "rat",
    "doll",
    "monster",
    "jedi",
    "frog",
    "toad",
    "dresser",
    "CD",
    "blanket",
    "poster",
  ],
  verbs = [
    "ran",
    "ate",
    "saw",
    "spoke",
    "bolted",
    "jumped",
    "dove",
    "yelled",
    "caved",
    "exploded",
  ],
  seq = [arts, nouns, verbs, preps, arts, nouns, preps, arts, nouns];

describe("Should pass fixed tests", () => {
  Test.assertDeepEquals(topThreeWords("a a a  b  c c  d d d d  e e e e e"), [
    "e",
    "d",
    "a",
  ]);
  Test.assertDeepEquals(topThreeWords("a a c b b"), ["a", "b", "c"]);
  Test.assertDeepEquals(
    topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e"),
    ["e", "ddd", "aa"]
  );
  Test.assertDeepEquals(topThreeWords("  //wont won't won't "), [
    "won't",
    "wont",
  ]);
  Test.assertDeepEquals(topThreeWords("  , e   .. "), ["e"]);
  Test.assertDeepEquals(topThreeWords("  ...  "), []);
  Test.assertDeepEquals(topThreeWords("  '  "), []);
  Test.assertDeepEquals(
    topThreeWords(`In a village of La Mancha, the name of which I have no desire to call to
    mind, there lived not long since one of those gentlemen that keep a lance
    in the lance-rack, an old buckler, a lean hack, and a greyhound for
    coursing. An olla of rather more beef than mutton, a salad on most
    nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
    on Sundays, made away with three-quarters of his income.`),
    ["a", "of", "on"]
  );
});

describe("Random tests", () => {
  it("short", () => {
    for (let i = 0; i < 50; i++) {
      let text = "";
      seq.forEach((arr) => (text += arr[~~(Math.random() * arr.length)] + " "));
      text = rand()
        ? text
            .replace(/[a-z]+/i, "")
            .trim()
            .replace(/[a-z]+/i, (f) => f + "s")
        : text;
      text = text.replace(/[a-z]/i, (f) => f.toUpperCase());

      const ans = sol(text);
      const user = topThreeWords(text);
      console.log(text);
      if (ans[0] === user) {
        Test.assertDeepEquals(user, ans[0]);
      } else {
        if (
          ans[0].map((word) => ans[1][word]).toString() ===
          user.map((word) => ans[1][word]).toString()
        ) {
          Test.assertDeepEquals(user, user);
        } else {
          Test.assertDeepEquals(user, ans[0]);
        }
      }
    }
  });

  it("longer", () => {
    for (let i = 0; i < 50; i++) {
      let text = "";
      seq
        .slice(0, 3)
        .forEach((arr) => (text += arr[~~(Math.random() * arr.length)] + " "));

      for (let j = 0; j < 2; j++) {
        seq
          .slice(3, seq.length)
          .forEach(
            (arr) => (text += arr[~~(Math.random() * arr.length)] + " ")
          );
      }

      text = rand()
        ? text
            .replace(/[a-z]+/i, "")
            .trim()
            .replace(/[a-z]+/i, (f) => f + "s")
        : text;
      text = text.replace(/[a-z]/i, (f) => f.toUpperCase());

      const ans = sol(text);
      const user = topThreeWords(text);
      console.log(text);
      if (ans[0] === user) {
        Test.assertDeepEquals(user, ans[0]);
      } else {
        if (
          ans[0].map((word) => ans[1][word]).toString() ===
          user.map((word) => ans[1][word]).toString()
        ) {
          Test.assertDeepEquals(user, user);
        } else {
          Test.assertDeepEquals(user, ans[0]);
        }
      }
    }
  });
});

// ---------------------------------------------Other Solution----------------------------------------------
const topThreeWords = (text) => {
  let total = (text.toLowerCase().match(/\b[a-z']+\b/g) || []).reduce(
    (acc, cur) => ((acc[cur] = (acc[cur] || 0) + 1), acc),
    {}
  );
  return Object.keys(total)
    .sort((a, b) => total[b] - total[a])
    .slice(0, 3);
};
