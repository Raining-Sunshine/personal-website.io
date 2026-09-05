function ArticleLanguage({ language, onChange, originalLanguage }) {
  const isOriginal = language === originalLanguage;
  const notice = language === "zh"
    ? isOriginal
      ? "原文语种：中文。以下保留作者原文，仅修正明显语病、术语和必要衔接。"
      : "AI 翻译说明：以下中文由 AI 从英文原文翻译，并经过语义与术语检查。"
    : isOriginal
      ? "Original language: English. The author's wording is retained, with corrections limited to grammar, terminology, and necessary transitions."
      : "AI translation: This English version was translated from the Chinese original and checked for meaning and terminology.";

  return (
    <div className="article-language-header">
      <div className="language-switch" role="group" aria-label="Article language">
        <button type="button" aria-pressed={language === "zh"} onClick={() => onChange("zh")}>中文</button>
        <button type="button" aria-pressed={language === "en"} onClick={() => onChange("en")}>English</button>
      </div>
      <p className="article-language-note">{notice}</p>
    </div>
  );
}
export default ArticleLanguage;
