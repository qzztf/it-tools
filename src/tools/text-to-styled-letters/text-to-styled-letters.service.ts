import type { StyleType } from './text-to-styled-letters.constants';
import { DIGIT_STYLE_MAP, GREEK_STYLE_MAP, STYLE_INDEX, styledDigits, styledGreek, styledLetters } from './text-to-styled-letters.constants';

export { textToStyledLetters };
export type { StyleType };

function textToStyledLetters({
  text,
  style,
}: {
  text: string
  style: StyleType
}): string {
  const latinIndex = STYLE_INDEX[style];
  const digitIndex = DIGIT_STYLE_MAP[style];
  const greekIndex = GREEK_STYLE_MAP[style];

  const converters = [
    { map: styledLetters, index: latinIndex },
    { map: styledDigits, index: digitIndex },
    { map: styledGreek, index: greekIndex },
  ];

  let result = '';

  for (const char of text) {
    let styled: string | undefined;

    for (const { map, index } of converters) {
      if (index !== null) {
        styled = map[char]?.[index];
        if (styled) {
          break;
        }
      }
    }

    result += styled || char;
  }

  return result;
}
