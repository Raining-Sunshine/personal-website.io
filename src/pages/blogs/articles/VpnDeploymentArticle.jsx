import { useState } from "react";
import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import CodeBlock from "../../../components/ui/CodeBlock";
import { routes } from "../../../config/routes";
import { chinese, english, profile, stunnel } from "../../../content/vpnDeployment";

const openvpnUrl = "https://github.com/openvpn/openvpn";
const stunnelUrl = "https://woshub.com/encrypt-client-server-traffic-windows-stunnel/";
const connectUrl = "https://openvpn.net/connect-docs/user-guide.html#openvpn-connect-for-your-os";

function ExternalLink({ href }) {
  return <a href={href} target="_blank" rel="noreferrer">{href}</a>;
}

export default function VpnDeploymentArticle({ navigate }) {
  const [language, setLanguage] = useState("zh");
  const text = language === "zh" ? chinese : english;
  const imageBase = `${import.meta.env.BASE_URL}computer/simple-vpn-deployment/`;
  return <main className="sub-main">
    <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Blogs", route: routes.blog }, { label: "Computer", route: routes.computer }, { label: text[0] }]} />
    <article className="article-template" lang={language === "zh" ? "zh-CN" : "en"}>
      <div className="article-content">
        <div className="article-language-header">
          <div className="language-switch" role="group" aria-label="Article language">
            <button type="button" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>中文</button>
            <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button>
          </div>
          <p className="article-language-note">{language === "zh" ? "原文语种：中文。英文版本由 AI 翻译。" : "Original language: Chinese. This English version is an AI translation of the author's text."}</p>
        </div>
        <p className="article-meta">September 8, 2026 / Computer / VPN</p>
        <h1>{text[0]}</h1>
        <aside className="article-note"><p>{text[1]}</p></aside>
        <p>{text[2]}</p>
        {["mobile", "desktop"].map((device) => <figure key={device}>
          <img className="article-photo" style={{ width: "auto", maxWidth: "100%", height: "auto" }} src={`${imageBase}${device}-${language}.png`} alt={language === "zh" ? (device === "mobile" ? "移动端架构图" : "桌面端架构图") : (device === "mobile" ? "Mobile architecture" : "Desktop architecture")} />
        </figure>)}
        <h2>{text[3]}</h2>
        <p>{text[4]}<ExternalLink href={openvpnUrl} />{text[5]}</p>
        <p>{text[6]}</p>
        <CodeBlock>{profile}</CodeBlock>
        <p>{text[7]}</p>
        <p>{text[8]}</p>
        <p>{text[9]}<ExternalLink href={stunnelUrl} />{text[10]}</p>
        <CodeBlock>{stunnel}</CodeBlock>
        <p>{text[11]}<ExternalLink href={connectUrl} />{text[12]}</p>
      </div>
    </article>
  </main>;
}
