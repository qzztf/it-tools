import { styledDigits, styledGreek, styledLetters } from './text-to-styled-letters.constants';

export { textToStyledLetters };
export type { StyleType };

// 样式类型定义
type StyleType =
    | 'bold' // 粗体
    | 'italic' // 斜体
    | 'boldItalic' // 粗斜体
    | 'script' // 手写体
    | 'boldScript' // 粗手写体
    | 'fraktur' // 哥特体/Fraktur
    | 'doubleStruck' // 双线体/黑板粗体
    | 'sansSerif' // 无衬线
    | 'sansSerifBold' // 无衬线粗体
    | 'sansSerifItalic'// 无衬线斜体
    | 'sansSerifBoldItalic' // 无衬线粗斜体
    | 'monospace'; // 等宽

// 样式索引映射
const STYLE_INDEX: Record<StyleType, number> = {
  bold: 0,
  italic: 1,
  boldItalic: 2,
  script: 3,
  boldScript: 4,
  fraktur: 5,
  doubleStruck: 6,
  sansSerif: 7,
  sansSerifBold: 8,
  sansSerifItalic: 9,
  sansSerifBoldItalic: 10,
  monospace: 11,
};

// 希腊字母只有5种样式，需要特殊处理
const GREEK_STYLE_MAP: Record<StyleType, number | null> = {
  bold: 0,
  italic: 1,
  boldItalic: 2,
  script: null, // 希腊字母无此样式
  boldScript: null, // 希腊字母无此样式
  fraktur: null, // 希腊字母无此样式
  doubleStruck: null, // 希腊字母无此样式
  sansSerifBold: 3, // 映射到 sans-serif bold
  sansSerifBoldItalic: 4, // 映射到 sans-serif bold italic
  // 以下映射到最接近的可用样式
  sansSerif: 3, // 无 sans-serif regular，用 bold 代替
  sansSerifItalic: 4, // 无 sans-serif italic，用 bold italic 代替
  monospace: null, // 希腊字母无等宽
};

function textToStyledLetters({
  text,
  style,
}: {
  text: string
  style: StyleType
}): string {
  const latinIndex = STYLE_INDEX[style];
  const greekIndex = GREEK_STYLE_MAP[style];

  let result = '';

  for (const char of text) {
    let converted = false;

    // 尝试匹配拉丁字母（大写或小写）
    if (styledLetters[char]) {
      const styled = styledLetters[char][latinIndex];
      if (styled) {
        result += styled;
        converted = true;
      }
    }
    // 尝试匹配数字
    else if (styledDigits[char]) {
      // 数字只有7种样式（索引0-6），超出范围需要处理
      const digitIndex = latinIndex <= 6 ? latinIndex : null;
      if (digitIndex !== null && styledDigits[char][digitIndex]) {
        result += styledDigits[char][digitIndex];
        converted = true;
      }
    }
    // 尝试匹配希腊字母
    else if (styledGreek[char] && greekIndex !== null) {
      const styled = styledGreek[char][greekIndex];
      if (styled) {
        result += styled;
        converted = true;
      }
    }

    // 无法转换，照抄原字符
    if (!converted) {
      result += char;
    }
  }

  return result;
}
