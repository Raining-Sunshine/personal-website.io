import { routes } from "./routes.js";

export const siteUrl = "https://diotimachang.com";
export const siteName = "Diotima’s blog";
export const routePath = (route) => route === routes.home ? "/" : `/${route}`;
const page = (title, description, language = "en") => ({ title: `${title} | ${siteName}`, description, language });
export const seoPages = {
  [routes.home]: page("Home", "Diotima Chang’s personal blog on computational materials science, modelling, computers, research and everyday life."),
  [routes.blog]: page("Blogs", "Explore Diotima’s articles on scientific modelling, computer tools and life, with Chinese and English versions."),
  [routes.modelling]: page("Modelling", "Notes on COMSOL, GPU computing, finite element geometry and neural networks by Diotima Chang."),
  [routes.computer]: page("Computer", "Personal tutorials and notes on WSL, Python environments, VPN deployment, frp and building websites."),
  [routes.life]: page("Life", "Travel experiences and everyday-life notes by Diotima Chang, including a Beijing Universal Studios guide."),
  [routes.research]: page("Research", "Explore Diotima Chang’s academic CV and research in materials science and mechanical engineering."),
  [routes.links]: page("Links", "Find Diotima Chang on GitHub and Archive of Our Own (AO3)."),
  [routes.contact]: page("Contact me", "Contact Diotima Chang through the website’s message form."),
  [routes.vramScientificComputation]: page("GPU显存大小在cuDSS求解过程中的重要性", "记录 cuDSS 科学计算中的显存占用、混合内存和硬件瓶颈，以及对计算资源配置的思考。附英文 AI 翻译。", "zh-CN"),
  [routes.comsol64Test]: page("简单对COMSOL6.4的GPU加速做一个测试", "COMSOL 6.4 GPU 加速的个人测试记录：cuDSS、求解设置、GPU 利用率与显存使用。附英文 AI 翻译。", "zh-CN"),
  [routes.neuralNetworkIntroduction]: page("How Does a Neural Network Work?", "Understand neural networks through curve fitting, least squares, residuals and training, validation and test sets. Includes a Chinese AI translation."),
  [routes.flaskGeometry]: page("不使用参数化曲线，对烧瓶模型的几何建模", "通过圆锥、倒圆角与几何并集构建烧瓶模型的个人建模记录，提供中英文版本。", "zh-CN"),
  [routes.environmentSetup]: page("环境配置：记录一次新电脑的环境配置过程", "Windows 新电脑的环境配置记录：Debian WSL、Python 虚拟环境、数据分析工具和 Node.js。附英文 AI 翻译。", "zh-CN"),
  [routes.vpnDeployment]: page("一个简单的VPN部署教程", "记录 OpenVPN、Cloudflare DNS 和 Stunnel 的部署过程，包含客户端配置模板与架构图。附英文 AI 翻译。", "zh-CN"),
  [routes.buildingPersonalWebsite]: page("Codex编写个人主页的记录", "使用 Codex、GitHub Pages 和 Cloudflare 搭建个人主页及学术简历网站的过程记录。附英文 AI 翻译。", "zh-CN"),
  [routes.frpRdp]: page("利用frp实现内网穿透的远程桌面配置记录", "通过 frp 和云服务器配置 Windows 远程桌面的个人记录，包含服务端、客户端与启动脚本。附英文 AI 翻译。", "zh-CN"),
  [routes.universalStudios]: page("闪闪亮亮环球攻略", "北京环球影城游玩记录：行前订票、酒店、优速通、游玩路线、餐饮与拍照建议。附英文 AI 翻译。", "zh-CN"),
};
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  alternateName: "Diotima Chang",
  url: `${siteUrl}/`,
  description: seoPages[routes.home].description,
  inLanguage: ["en", "zh-CN"],
};
