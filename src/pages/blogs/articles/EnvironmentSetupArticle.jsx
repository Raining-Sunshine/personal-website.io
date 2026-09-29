import { useState } from "react";
import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import ArticleLanguage from "../../../components/ui/ArticleLanguage";
import CodeBlock from "../../../components/ui/CodeBlock";
import { routes } from "../../../config/routes";

const chinese = {
  title: "环境配置：记录一次新电脑的环境配置过程",
  paragraphs: [
    "学校IT终于给组里的新服务器配好了域名RDP，于是我结合一些过去的经验，在可以用后给电脑配置了一遍新的环境。记录一下来作为日后的参考。",
    "由于我们的工作还是以有限元为主，因此系统还是只能选择了Windows。但是我的日常数据处理已经习惯Debian，并且Windows上调用Python实在是手感有点奇怪。因此我做的第一件事是安装了一个WSL。",
    "win+R打开运行窗口后输入cmd,回车。",
    "由于这个服务器没有分盘，只有C盘一个盘。因此不需要指定安装位置。有D盘的朋友们还是建议安装到D盘。",
    "系统会自己拉取镜像，快速安装好wsl。这时需要重启一次系统，完成硬件虚拟化写入。restart似乎不好用，还是断电重启才完成写入的。",
    "再次打开，会要求设置Unix用户名和密码，合理设置后，开始配置环境。",
    "我的习惯是利用.bashrc来激活不同的环境和组件。因此：",
    "后续的环境管理就将通过这个Python3来继续管理。",
    "进入虚拟环境文件夹",
    "为数据分析任务创建第一个虚拟环境",
    "修改bashrc，加入alias简化路径",
    "文件末尾加入",
    "激活虚拟环境",
    "安装必要的包",
    "最后就是一些dsh框架/codex框架的安装了。",
    "然后"
  ]
};
const english = {
  title: "Environment Setup: Recording the Configuration of a New Computer",
  paragraphs: [
    "The university IT team finally configured a domain-based RDP service for the new server in our group. Drawing on some of my previous experience, I configured a new environment for the computer once it became available. I am recording the process here as a reference for the future.",
    "Since our work is still mainly based on finite-element analysis, the system had to be Windows. However, I have become used to Debian for daily data processing, and calling Python on Windows feels rather awkward. Therefore, the first thing I did was install WSL.",
    "Press Win+R to open the Run window, type cmd, and press Enter.",
    "This server has only one partition, the C drive, so there is no need to specify an installation location. If you have a D drive, I still recommend installing it there.",
    "The system will download the image and quickly install WSL. The system then needs to be restarted once so that hardware virtualization can be written. Restart did not seem to work properly; a full power cycle was what finally completed the write.",
    "When you open it again, you will be asked to set a Unix username and password. After setting them reasonably, begin configuring the environment.",
    "I usually use .bashrc to activate different environments and components. Therefore:",
    "I will use this Python 3 installation to manage the environment from this point onward.",
    "Enter the virtual-environment directory.",
    "Create the first virtual environment for data-analysis tasks.",
    "Edit bashrc and add an alias to simplify the path.",
    "Add the following at the end of the file.",
    "Activate the virtual environment.",
    "Install the necessary packages.",
    "Finally, install some dsh/Codex frameworks.",
    "Then"
  ]
};
const blocks = {
  wsl: "wsl --install -d Debian",
  packages: "sudo apt update && sudo apt upgrade -y\nsudo apt install python3 python3-pip python3-venv build-essential -y",
  venv: "mkdir .venv\ncd .venv\npython3 -m venv data_analysis",
  aliasZh: "nano ~/.bashrc\nalias activate_da=\"source ~/.venv/data_analysis/bin/activate\"",
  aliasEn: "nano ~/.bashrc\nalias activate_da=\"source ~/.venv/data_analysis/bin/activate\"",
  activate: "source ~/.bashrc\nactivate_da\npip install numpy scipy matplotlib pandas\ndeactivate",
  dsh: "sudo apt install git\nmkdir -p ~/.venv/dsh\nwget https://nodejs.org/dist/latest-v22.x/node-v22.20.0-linux-x64.tar.xz\ntar -xJf node-v22.20.0-linux-x64.tar.xz --strip-components=1 -C ~/.venv/dsh\nexport PATH=\"$HOME/.venv/dsh/bin:$PATH\"\nnode --version\nnpm --version\nnpx --yes @deepseek-ai/dsh web"
};

function ExternalLink({ href }) {
  return <a href={href} target="_blank" rel="noreferrer">{href}</a>;
}

export default function EnvironmentSetupArticle({ navigate }) {
  const [language, setLanguage] = useState("zh");
  const t = language === "zh" ? chinese : english;
  const line = (i) => t.paragraphs[i];
  return <main className="sub-main">
    <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Blogs", route: routes.blog }, { label: "Computer", route: routes.computer }, { label: t.title }]} />
    <article className="article-template" lang={language === "zh" ? "zh-CN" : "en"}><div className="article-content">
      <ArticleLanguage language={language} onChange={setLanguage} originalLanguage="zh" />
      <p className="article-meta">September 29, 2026 / Computer / Environment</p>
      <h1>{t.title}</h1>
      <p>{line(0)}</p>
      <p>{line(1)}</p>
      <p>{line(2)}</p>
      <CodeBlock>{blocks.wsl}</CodeBlock>
      <p>{line(3)}</p>
      <p>{line(4)}</p>
      <p>{line(5)}</p>
      <p>{line(6)}</p>
      <CodeBlock>{blocks.packages}</CodeBlock>
      <p>{line(7)}</p>
      <p>{line(8)}</p>
      <CodeBlock>{blocks.venv}</CodeBlock>
      <p>{line(9)}</p>
      <p>{line(10)}</p>
      <p>{line(11)}</p>
      <CodeBlock>{blocks.aliasZh}</CodeBlock>
      <p>{line(12)}</p>
      <CodeBlock>{blocks.activate}</CodeBlock>
      <p>{line(13)}</p>
      <p>{line(14)}</p>
      <CodeBlock>{blocks.dsh}</CodeBlock>
      <p>{line(15)}</p>
    </div></article>
  </main>;
}
