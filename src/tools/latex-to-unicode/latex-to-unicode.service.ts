import { tex2unicode } from "tex2unicode";

export function latexToUnicode({ text }: { text: string }): string {
  try {
    return tex2unicode(text);
  } catch (err) {
    return text;
  }
}
