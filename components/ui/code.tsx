import type { ReactNode } from "react";

export type Lang = "ts" | "py" | "bash" | "json";

const KEYWORDS: Record<Lang, string[]> = {
  ts: [
    "import", "from", "export", "const", "let", "var", "await", "async",
    "function", "return", "new", "for", "of", "if", "else", "type", "interface",
    "class", "extends", "default",
  ],
  py: [
    "import", "from", "def", "class", "return", "await", "async", "for", "in",
    "if", "else", "with", "as", "None", "True", "False", "print",
  ],
  bash: ["npm", "pnpm", "pip", "npx", "uv", "curl", "volt", "export", "cd", "git"],
  json: ["true", "false", "null"],
};

// One pass, longest-match-first: comments, strings, numbers, calls, words.
const PATTERN =
  /(?<com>#[^\n]*|\/\/[^\n]*)|(?<str>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(?<num>\b\d+(?:\.\d+)?\b)|(?<fn>\b[A-Za-z_$][\w$]*(?=\s*\())|(?<word>\b[A-Za-z_$][\w$]*\b)|(?<punc>[{}()[\].,:;=<>+\-*/|&!?]+)/g;

/** A deliberately small highlighter — enough tint for a marketing code sample. */
export function highlight(code: string, lang: Lang): ReactNode[] {
  const keywords = new Set(KEYWORDS[lang]);
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of code.matchAll(PATTERN)) {
    const groups = match.groups!;
    const at = match.index!;
    if (at > last) out.push(code.slice(last, at));
    last = at + match[0].length;

    const cls = groups.com
      ? "tok-com"
      : groups.str
        ? "tok-str"
        : groups.num
          ? "tok-num"
          : groups.fn
            ? keywords.has(match[0])
              ? "tok-key"
              : "tok-fn"
            : groups.word
              ? keywords.has(match[0])
                ? "tok-key"
                : ""
              : "tok-punc";

    out.push(
      cls ? (
        <span key={key++} className={cls}>
          {match[0]}
        </span>
      ) : (
        match[0]
      ),
    );
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function Code({
  code,
  lang,
  className = "",
}: {
  code: string;
  lang: Lang;
  className?: string;
}) {
  return (
    <pre
      className={`overflow-x-auto font-mono text-[0.78rem] leading-[1.72] text-fg-muted ${className}`}
    >
      <code>{highlight(code, lang)}</code>
    </pre>
  );
}
