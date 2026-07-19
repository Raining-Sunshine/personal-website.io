import React, { useEffect, useState } from "react";
import "./App.css";

const keinsciUrl = "http://bbs.keinsci.com/thread-42564-1-1.html";
const frpReleasesUrl = "https://github.com/fatedier/frp/releases/download/";
const githubUrl = "https://github.com/Raining-Sunshine";
const ao3Url = "https://archiveofourown.org/users/Diotima_Chang";

const routes = {
  home: "home",
  blog: "blog",
  modelling: "modelling",
  computer: "computer",
  life: "life",
  article: "article",
  frpRdp: "frp-rdp",
  fanfiction: "fanfiction",
  links: "links",
};

const serverConfig = `[root@host-cloud conf]                    # cat frps.toml
[common]
bindAddr = 0.0.0.0                        # 内网IP
bindPort = 7000                           # TCP 开放端口
bind_udp_port = 7000                      # UDP 开放端口
vhostHTTPPort = 80
vhostHTTPSPort = 443
dashboard_addr = 0.0.0.0                  # 内网IP
dashboard_port = 7500
dashboard_user = 【admin】                  # dashboard Username
dashboard_pwd = 【admin】                   # dashboard Password
enable_prometheus = true
log_file = ./logs/frps.log                # 日志地址
log_level = info
log_max_days = 1                          # 日志保留天数
disable_log_color = false
detailed_errors_to_client = true
authentication_method = token
authenticate_heartbeats = false
authenticate_new_work_conns = false
token = 【123456789】                       # 链接 token
oidc_skip_expiry_check = false
oidc_skip_issuer_check = false
allow_ports = 2000-3000,3001,3003,4000-50000
max_pool_count = 5
max_ports_per_client = 0
tls_only = false
tcp_mux = true
udp_packet_size = 1500`;

const clientConfig = `[common]
# 云服务器的 IP 地址及 frps 里面设置的通信端口
server_addr = 【**：**：**：**】
server_port = 7000

# token 与服务端设置一样
token = 【123456789】

# 设置日志文件记录路径
log_file = ./logs/frpc.log
# 设置日志记录级别，分别有 trace, debug, info, warn, error
log_level = info
# 设置日志记录最大天数
log_max_days = 1

# 设置本机面板
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = 【admin】
admin_pwd = 【admin】

# RDP，Windows 的 RDP 默认端口是 3389，协议为 TCP，转发到服务端【】中的端口
[rdp]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
remote_port = 【7100】`;

const batScript = `@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
REM
cd 【C:\\frp】 # frp 文件夹路径
frpc -c frpc.ini
exit`;

function Header({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <>
      <header className="hero-header">
        <img src={`${assetBase}header.png`} alt="Site header" className="hero-image" />
        <div className="hero-overlay">
          <div className="site-title">Diotima Chang</div>
        </div>
      </header>
      <div className="thin-strip" aria-hidden="true" />
      <nav className="main-nav" aria-label="Main navigation">
        <button onClick={() => navigate(routes.home)}>Home</button>
        <button onClick={() => navigate(routes.blog)}>Blogs</button>
        <button onClick={() => navigate(routes.fanfiction)}>Fanfictions</button>
        <button onClick={() => navigate(routes.links)}>Links</button>
      </nav>
    </>
  );
}

function Breadcrumbs({ items, navigate }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <i>/</i>}
          {item.route ? (
            <button onClick={() => navigate(item.route)}>{item.label}</button>
          ) : (
            <b>{item.label}</b>
          )}
        </span>
      ))}
    </nav>
  );
}

function DirectoryCard({ title, description, onClick }) {
  return (
    <button className="directory-card" onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Open directory</span>
    </button>
  );
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-block">
      <button type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
      <pre><code>{children}</code></pre>
    </div>
  );
}

function Home({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <main className="home-main">
      <section className="profile-card" aria-label="Profile">
        <div className="avatar-wrap">
          <img src={`${assetBase}avatar.jpg`} alt="Avatar" className="avatar" />
        </div>
        <div className="intro-panel">
          <p className="eyebrow">About me</p>
          <h1>Hi, this is Diotima</h1>
          <p>
            I enjoy materials science and am currently applying for PhD programs. My main focus is computational materials science, and I work with tools such as COMSOL and Gaussian. I also enjoy computer-related topics, including neural networks, cybersecurity, and algorithms.
          </p>
          <p>
            I also write fanfiction on AO3. Most of my works are in Chinese, and I am gradually bringing links and notes back into this site.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <article className="section-card">
          <h2>Blogs</h2>
          <p>Modelling, computer, and life notes.</p>
          <button onClick={() => navigate(routes.blog)}>Open blogs</button>
        </article>
        <article className="section-card">
          <h2>Fanfictions</h2>
          <p>A directory for fanfiction and fandom writing.</p>
          <button onClick={() => navigate(routes.fanfiction)}>Open fanfictions</button>
        </article>
        <article className="section-card">
          <h2>Links</h2>
          <p>GitHub and Archive of Our Own.</p>
          <button onClick={() => navigate(routes.links)}>Open links</button>
        </article>
        <article className="section-card">
          <h2>Others</h2>
          <p>Miscellaneous notes, announcements, contact details, and site updates.</p>
        </article>
      </section>
    </main>
  );
}

function BlogDirectory({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Blogs" }]} />
      <header className="sub-heading">
        <h1>Blogs</h1>
      </header>
      <section className="directory-grid">
        <DirectoryCard title="Modelling" description="Computational materials, modelling, and simulation notes." onClick={() => navigate(routes.modelling)} />
        <DirectoryCard title="Computer" description="Computer science, security, algorithms, tools, and remote access notes." onClick={() => navigate(routes.computer)} />
        <DirectoryCard title="Life" description="Personal and everyday-life notes." onClick={() => navigate(routes.life)} />
      </section>
    </main>
  );
}

function CategoryPage({ category, navigate, children }) {
  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: category },
        ]}
      />
      <header className="sub-heading">
        <h1>{category}</h1>
      </header>
      <section className="entry-list">{children}</section>
    </main>
  );
}

function Entry({ title, label, onClick }) {
  return (
    <article className="entry-card">
      <div>
        <span>{label}</span>
        <h2>{title}</h2>
      </div>
      {onClick ? <button onClick={onClick}>Open</button> : <span className="pending">To be filled</span>}
    </article>
  );
}

function ArticleTemplate({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: "Life", route: routes.life },
          { label: "Article draft" },
        ]}
      />
      <article className="article-template">
        <div className="article-cover">Image placeholder</div>
        <div className="article-content">
          <p className="article-meta">Date / Category</p>
          <h1>Article title</h1>
          <p className="article-subtitle">Article subtitle</p>
          <h2>Section heading</h2>
          <p>Write the article body here.</p>
          <figure>
            <div className="article-image">Image placeholder</div>
            <figcaption>Image caption</figcaption>
          </figure>
          <h2>Section heading</h2>
          <p>Write the article body here.</p>
        </div>
      </article>
    </main>
  );
}

function FrpRdpArticle({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: "Computer", route: routes.computer },
          { label: "FRP remote desktop" },
        ]}
      />
      <article className="article-template">
        <div className="article-content">
          <p className="article-meta">Computer / Remote access</p>
          <h1>利用 frp 实现内网穿透的远程桌面配置记录</h1>
          <p>
            最近对于海外 IP，我常用的远程控制软件开始收费了。而且还挺贵。那这必然不能忍。于是果断卸载远控软件，决定用 frp 和新用户白嫖的谷歌云服务器搞一个内网穿透。
          </p>

          <h2>需要的设备</h2>
          <ol>
            <li>一台有公网 IP 的云服务器</li>
            <li>需要控制的远程计算机</li>
            <li>随便来的一台访问端</li>
          </ol>
          <p>
            frp 项目的网址：<a href={frpReleasesUrl} target="_blank" rel="noreferrer">{frpReleasesUrl}</a>
          </p>

          <h2>服务器端配置</h2>
          <p>打开云服务器 SSH。首先运行 wget 命令下载安装包，所有全角方括号内都需要替换。</p>
          <CodeBlock>{"wget 【云服务器对应架构的对应安装包地址，x86 用 amd64，例如：https://github.com/fatedier/frp/..._linux_amd64.tar.gz】"}</CodeBlock>
          <p>然后解压：</p>
          <CodeBlock>{"tar -zxvf 【frp_0.53.2_linux_amd64.tar.gz】"}</CodeBlock>
          <p>可以对文件夹改名：</p>
          <CodeBlock>{"cp -r 【frp_0.53.2_linux_amd64】 【frp】"}</CodeBlock>
          <p>进入文件夹：</p>
          <CodeBlock>{"cd frp"}</CodeBlock>
          <p>查看所有文件：</p>
          <CodeBlock>{"ls -a"}</CodeBlock>
          <p>去掉客户端配置文件：</p>
          <CodeBlock>{`rm frpc
rm frpc.toml`}</CodeBlock>
          <p>修改 frps.toml 配置文件：</p>
          <CodeBlock>{"vim frps.toml"}</CodeBlock>
          <p>服务端的配置文件：</p>
          <CodeBlock>{serverConfig}</CodeBlock>
          <p>将上面的配置修改好后粘到 frps.toml，Esc 退出编辑并用 :wq! 保存。</p>
          <p>让程序在后台运行：</p>
          <CodeBlock>{"nohup ./frps -c frps.toml &"}</CodeBlock>
          <p>
            服务端配置结束，可以登录【公网 IP:7500】查看面板。密码是配置中的字段，之后退出 SSH。
          </p>

          <h2>客户端配置</h2>
          <p>打开客户端电脑，我使用的是 Windows 11。同样下载 frp 安装包，可以删掉服务端文件 frps 和 frps.toml，具体操作不再赘述。</p>
          <p>修改 toml 文件，将后缀名改成 ini 格式。ini 文件用文本编辑器打开，编辑配置为：</p>
          <CodeBlock>{clientConfig}</CodeBlock>
          <p>然后保存。新建一个文本，写入：</p>
          <CodeBlock>{batScript}</CodeBlock>
          <p>保存后将后缀名改为 bat，双击运行脚本。</p>
          <p>此时服务端与客户端都配置完成。需要的话可以把这个 bat 挪到开机启动里面。</p>
          <p>可以访问 127.0.0.1:7400 查看面板。</p>
          <p>远程访问时，机器直接填【公网 IP:RDP 端口】即可。比如本例中就是【公网 IP:7100】。</p>
          <p>目前我这里面防护还是比较薄弱，后面可以做一个访问前的验证。看到某些帖子说 STCP 比较稳，准备看看。</p>
        </div>
      </article>
    </main>
  );
}

function Fanfiction({ navigate, openEmbed }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Fanfictions" }]} />
      <header className="sub-heading">
        <h1>Fanfictions</h1>
      </header>
      <section className="directory-grid single">
        <button className="directory-card" onClick={openEmbed}>
          <h2>Archive of Our Own</h2>
          <p>Diotima_Chang</p>
          <span>Open embedded view</span>
        </button>
      </section>
    </main>
  );
}

function Links({ navigate, openAo3 }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Links" }]} />
      <header className="sub-heading">
        <h1>Links</h1>
      </header>
      <section className="directory-grid links-directory">
        <a className="directory-card" href={githubUrl} target="_blank" rel="noreferrer">
          <h2>GitHub</h2>
          <p>Raining-Sunshine</p>
          <span>Open page</span>
        </a>
        <button className="directory-card" onClick={openAo3}>
          <h2>Archive of Our Own</h2>
          <p>Diotima_Chang</p>
          <span>Open embedded view</span>
        </button>
      </section>
    </main>
  );
}

function ExternalMask({ title, url, embedded, close }) {
  useEffect(() => {
    const handler = (event) => event.key === "Escape" && close();
    addEventListener("keydown", handler);
    return () => removeEventListener("keydown", handler);
  }, [close]);

  return (
    <div
      className="mask-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <div className="mask-panel">
        <header>
          <strong>{title}</strong>
          <div>
            <a href={url} target="_blank" rel="noreferrer">Open original page</a>
            <button onClick={close} aria-label="Close">x</button>
          </div>
        </header>
        {embedded ? (
          <div className="iframe-wrap">
            <iframe src={url} title={title} />
            <p>If the page blocks embedding, use "Open original page".</p>
          </div>
        ) : (
          <div className="link-mask">
            <h2>{title}</h2>
            <p>This external link uses HTTP, so it cannot be safely embedded inside an HTTPS page.</p>
            <a href={url} target="_blank" rel="noreferrer">Go to original page</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(routes.home);
  const [mask, setMask] = useState(null);

  useEffect(() => {
    const sync = () => {
      const next = location.hash.replace("#/", "") || routes.home;
      setRoute(Object.values(routes).includes(next) ? next : routes.home);
    };

    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);

  const navigate = (next) => {
    location.hash = `#/${next}`;
    scrollTo({ top: 0, behavior: "smooth" });
  };

  let content;
  if (route === routes.blog) {
    content = <BlogDirectory navigate={navigate} />;
  } else if (route === routes.modelling) {
    content = (
      <CategoryPage category="Modelling" navigate={navigate}>
        <Entry title="Computational Chemistry Forum Blog" label="External link" onClick={() => setMask({ title: "Computational Chemistry Forum Blog", url: keinsciUrl, embedded: false })} />
      </CategoryPage>
    );
  } else if (route === routes.computer) {
    content = (
      <CategoryPage category="Computer" navigate={navigate}>
        <Entry title="利用 frp 实现内网穿透的远程桌面配置记录" label="Remote desktop" onClick={() => navigate(routes.frpRdp)} />
      </CategoryPage>
    );
  } else if (route === routes.life) {
    content = (
      <CategoryPage category="Life" navigate={navigate}>
        <Entry title="Article draft" label="Site article" onClick={() => navigate(routes.article)} />
      </CategoryPage>
    );
  } else if (route === routes.article) {
    content = <ArticleTemplate navigate={navigate} />;
  } else if (route === routes.frpRdp) {
    content = <FrpRdpArticle navigate={navigate} />;
  } else if (route === routes.fanfiction) {
    content = <Fanfiction navigate={navigate} openEmbed={() => setMask({ title: "AO3 / Diotima_Chang", url: ao3Url, embedded: true })} />;
  } else if (route === routes.links) {
    content = <Links navigate={navigate} openAo3={() => setMask({ title: "AO3 / Diotima_Chang", url: ao3Url, embedded: true })} />;
  } else {
    content = <Home navigate={navigate} />;
  }

  return (
    <>
      <Header navigate={navigate} />
      {content}
      {mask && <ExternalMask {...mask} close={() => setMask(null)} />}
    </>
  );
}
