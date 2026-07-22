import React, { useEffect, useState } from "react";
import "./App.css";

const keinsciUrl = "http://bbs.keinsci.com/thread-42564-1-1.html";
const frpReleasesUrl = "https://github.com/fatedier/frp/releases/download/";
const githubUrl = "https://github.com/Raining-Sunshine";
const ao3Url = "https://archiveofourown.org/users/Diotima_Chang";
const academicCvUrl = "https://academic.diotimachang.com";
const universalStudiosSourceUrl = "https://tima-chan.blogspot.com/2022/07/usb-universial-studio-beijing.html";
const contactEmail = "diotima@diotimachang.com";
const contactCooldownMs = 60_000;
const contactCooldownKey = "diotima-contact-last-sent";
const blockedMessageTerms = [
  "fuck",
  "shit",
  "bitch",
  "傻逼",
  "操你妈",
  "博彩",
  "赌场",
  "代开发票",
  "色情推广",
  "casino",
  "buy followers",
  "crypto giveaway",
];

const routes = {
  home: "home",
  blog: "blog",
  modelling: "modelling",
  computer: "computer",
  life: "life",
  universalStudios: "universal-studios-beijing",
  frpRdp: "frp-rdp",
  research: "research",
  links: "links",
  contact: "contact",
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
        <button onClick={() => navigate(routes.research)}>Research</button>
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
          <p>Modelling, computer, and life.</p>
          <button onClick={() => navigate(routes.blog)}>Open blogs</button>
        </article>
        <article className="section-card">
          <h2>Research</h2>
          <p>Academic CV and researchs.</p>
          <button onClick={() => navigate(routes.research)}>Open research</button>
        </article>
        <article className="section-card">
          <h2>Links</h2>
          <p>GitHub and AO3.</p>
          <button onClick={() => navigate(routes.links)}>Open links</button>
        </article>
        <article className="section-card">
          <h2>Contact me</h2>
          <p>Latest update: 2026-07-22 10:06 (UTC+8).</p>
          <button onClick={() => navigate(routes.contact)}>Leave a message</button>
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

function UniversalStudiosArticle({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;
  const imageBase = `${assetBase}life/universal-studios-beijing/`;

  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: "Life", route: routes.life },
          { label: "Universal Studios Beijing" },
        ]}
      />
      <article className="article-template">
        <div className="article-content">
          <p className="article-meta">July 27, 2022 / Life / Travel</p>
          <h1>闪闪亮亮环球攻略</h1>
          <p className="article-subtitle">Universal Studios Beijing</p>

          <h2>1. 行前订票 / 酒店 / 行李</h2>
          <p>
            根据我们的前期调查，可以不用订环球大酒店或者诺金！比较奢侈并且它所包含的所有特权好像都没什么用。选附近的酒店就完全 OK。具体选择酒店可以根据我们给出的 Excel 表，自主分析。
          </p>
          <figure>
            <img className="article-photo article-photo-wide" src={`${imageBase}hotel-comparison.png`} alt="环球影城附近酒店价格与交通对比表" />
            <figcaption>图表 1：价格以我们查询时为准。</figcaption>
          </figure>
          <p>
            订票不建议直接购买官网门票或者 1.5 日门票。大学生在大众点评和美团有优惠，单日门票 540 拿下。两天 1080 RMB。多出来的钱可以拿来买优速通。
          </p>
          <p>
            优速通实际上是可以买单项的，在小程序就能买。不要买那个 700 的优速通，那个每个项目只能玩一次，并且还包含很多本来不需要用优速通、排队也很快的项目，买那个血亏。建议买禁忌之旅、火种源争夺战、侏罗纪大冒险的单项优速通。当天早上买就可以了（注意会售罄哦，要抓紧呐）。
          </p>
          <p>
            巫师袍、领带建议走之前淘宝买好，会比园区内便宜很多；不过魔杖选择巫师嘛，我们是在奥利凡德买的：）并且一定要自带一件雨衣，为未来水世界的表演做准备。入园不要带大件行李，退房后在酒店寄存就好了。大部分酒店都会提供这项服务。
          </p>
          <p><strong>附：单项优速通购买方法。</strong></p>
          <div className="article-image-grid" aria-label="单项优速通购买步骤截图">
            <figure>
              <img className="article-photo article-photo-phone" src={`${imageBase}express-pass-entry.png`} alt="环球影城小程序首页的优速通入口" />
              <figcaption>在小程序首页向右划，找到“优速通”。</figcaption>
            </figure>
            <figure>
              <img className="article-photo article-photo-phone" src={`${imageBase}single-express-pass.png`} alt="环球影城小程序中的环球单项优速通" />
              <figcaption>选择“环球单项优速通”。</figcaption>
            </figure>
            <figure>
              <img className="article-photo article-photo-phone" src={`${imageBase}single-pass-options.png`} alt="环球单项优速通项目选择页面" />
              <figcaption>选择想购买的具体项目。</figcaption>
            </figure>
          </div>

          <h2>2. 入园游玩建议与用餐</h2>
          <p>
            园区是早上 10 点开门，但是尽量九点钟左右就要到城市大道门口的安检处（八点开门）安检。然后快速冲到大门口排队，并且在小程序首页预约入园。来得太晚可能不能在 10 点前进入园区。
          </p>
          <p>
            如果没有买单项优速通，那么建议直接赶去禁忌之旅、火种源争夺战、侏罗纪大冒险这三个项目，因为早上排队人是最少的。其次就是下午四五点左右，排队时间可能降到 60 分钟。晚上六点多后排队时长会降到 40 分钟。但是如果不能在七点前进入项目，项目就会关门。
          </p>
          <p>
            买了优速通的话，可以先去一些人不太多的项目，比如小黄人或者鹰马飞行这一类。等到中午人很多，每个项目都排很久，比如禁忌之旅排队要 100 分钟时，拿着优速通去玩那些大热项目就可以了。建议最后再去“灯光，摄影，开拍！”，这个项目全天排队时间不超过 20 分钟，出去路过时去玩就好。霸天虎过山车在下午四五点钟也会人比较少，可以考虑 3:30 排不可驯服演出，四点半左右出来就去霸天虎和火种源争夺战。
          </p>
          <p>
            环球会有一些演出，强烈推荐不可驯服和未来水世界。未来水世界不需要提早特别多去排队，因为拿着雨衣的话可以直接去第一排。我们进场时距离演出开始只有 3 分钟，一点队都没排就到了第一排看演出。不可驯服建议提前半小时去排队，以免座位没了。六点钟左右会有环球大巡游，主路会被封锁和占用。如果不想看的话，建议提前做好那时的路线规划，或者干脆就在一个园区里玩就好。
          </p>
          <p>
            不论如何，建议多刷小程序，它提供的时间是相对准确的。另外，禁忌之旅不需要存手机，可以在城堡里照照相。而霸天虎过山车除了眼镜都必须存到柜子里，不然工作人员会让你重新存。
          </p>

          <h2>3. 吃饭</h2>
          <p>
            吃饭的话我们去了三把扫帚和哈蒙德餐厅。三把扫帚相对便宜并且量大，但是需要排队。餐厅里可以直接点黄油啤酒，但是加菜的话要重新排队。哈蒙德餐厅量相对少一些也贵一些，但是餐厅极为“上流”，并且可以发短信叫号等位。两家餐厅菜品都很好吃。
          </p>
          <p>
            黄油啤酒可以在猪头酒吧购买，排队人少极了！小黄人雪糕可以在超萌漩漩涡那个大厅里的店购买。小黄人爆米花可以在好莱坞大道那里购买。小推车排队的人太多，极不推荐。
          </p>

          <h2>4. 拍照</h2>
          <p>
            如果要拍照，建议早上或者下午快闭园再拍。那时候街道上的人很少，非常适合拍照。好莱坞、哈利波特、小黄人这三个园区比较适合拍照，外景美极了！功夫熊猫理论上布景也很适合，但是灯光太暗了，拍照大佬可以考虑那里。努布拉岛在飞越侏罗纪那个大厅里，内景也很适合拍照！
          </p>

          <aside className="article-note">
            <p>
              放在最后的补充：以上的 bb 也全都是我们俩的个人体验啦，每个人进去玩的感受肯定都有所不同，我们的唠叨和小红书上的攻略也不大一样（比如鹰马飞行有些朋友觉得无聊但我们还是叫超大声），大家也不用拘泥于攻略，自己随心所欲玩得爽就好啦！祝朋友们都可以拥有独一无二的、最完美的环影之旅！！！
            </p>
            <p>以上就是我想到的所有啦，惠惠快来补充！bεOvO3d</p>
            <p>阳阳请作为体验师原地出道！惠惠也补完啦！:3</p>
          </aside>

          <p className="article-source">
            原文：<a href={universalStudiosSourceUrl} target="_blank" rel="noreferrer">Raining Sunshine / Blogger</a>
          </p>
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

function Research({ navigate }) {
  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Research" }]} />
      <header className="sub-heading">
        <h1>Research</h1>
      </header>
      <section className="directory-grid single">
        <a className="directory-card compact" href={academicCvUrl} target="_blank" rel="noreferrer">
          <h2>Academic CV</h2>
          <span>Open page</span>
        </a>
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

function Contact({ navigate }) {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("sent") !== "1") return;

    setStatus("success");
    setFeedback("Message sent. Thank you.");
    params.delete("sent");
    const query = params.toString();
    history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }, []);

  const validateContent = (subject, message) => {
    const combined = `${subject} ${message}`.trim().toLowerCase();
    const compact = combined.replace(/\s/g, "");
    const uniqueCharacters = new Set(compact).size;
    const linkCount = (combined.match(/https?:\/\/|www\./g) || []).length;

    if (compact.length < 20) {
      return "Please write a little more so the message has enough context.";
    }
    if (/(.)\1{7,}/u.test(compact) || uniqueCharacters / compact.length < 0.12) {
      return "The message looks repetitive. Please add meaningful details.";
    }
    if (linkCount > 2) {
      return "Please include no more than two links.";
    }
    if (blockedMessageTerms.some((term) => combined.includes(term))) {
      return "The message contains blocked language.";
    }
    return "";
  };

  const submit = (event) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const now = Date.now();
    let lastSent = 0;
    try {
      lastSent = Number(localStorage.getItem(contactCooldownKey) || 0);
    } catch {
      // Storage can be unavailable in strict privacy modes.
    }
    const remainingSeconds = Math.ceil((contactCooldownMs - (now - lastSent)) / 1000);

    if (remainingSeconds > 0) {
      event.preventDefault();
      setStatus("error");
      setFeedback(`Please wait ${remainingSeconds} seconds before sending another message.`);
      return;
    }

    const validationError = validateContent(
      String(formData.get("subject") || ""),
      String(formData.get("message") || ""),
    );
    if (validationError) {
      event.preventDefault();
      setStatus("error");
      setFeedback(validationError);
      return;
    }

    setStatus("sending");
    setFeedback("Complete the CAPTCHA to send your message.");
    try {
      localStorage.setItem(contactCooldownKey, String(Date.now()));
    } catch {
      // Submission can continue when storage is unavailable.
    }
  };

  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Contact" }]} />
      <article className="contact-panel">
        <header className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h1>Leave a message</h1>
        </header>

        <form className="contact-form" action={`https://formsubmit.co/${contactEmail}`} method="POST" onSubmit={submit}>
          <input type="hidden" name="_subject" value="New message from diotimachang.com" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_blacklist" value={blockedMessageTerms.join(", ")} />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_next" value={`${location.origin}${location.pathname}?sent=1#/contact`} />
          <div className="contact-honey" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" type="text" name="_honey" tabIndex="-1" autoComplete="off" />
          </div>

          <div className="contact-field-row">
            <label>
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required maxLength="80" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required maxLength="160" />
            </label>
          </div>

          <label>
            <span>Subject</span>
            <input type="text" name="subject" required maxLength="120" />
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" rows="8" required maxLength="5000" />
          </label>

          <div className="contact-actions">
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            <p className={`contact-status ${status}`} role="status" aria-live="polite">
              {feedback}
            </p>
          </div>
        </form>
      </article>
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
      const next = location.pathname.replace(/^\/+|\/+$/g, "") || routes.home;
      setRoute(Object.values(routes).includes(next) ? next : routes.home);
    };

    sync();
    addEventListener("popstate", sync);
    return () => removeEventListener("popstate", sync);
  }, []);

  const navigate = (next) => {
    const path = next === routes.home ? "/" : `/${next}`;
    history.pushState(null, "", path);
    setRoute(next);
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
        <Entry title="闪闪亮亮环球攻略" label="Travel / Beijing" onClick={() => navigate(routes.universalStudios)} />
      </CategoryPage>
    );
  } else if (route === routes.universalStudios) {
    content = <UniversalStudiosArticle navigate={navigate} />;
  } else if (route === routes.frpRdp) {
    content = <FrpRdpArticle navigate={navigate} />;
  } else if (route === routes.research) {
    content = <Research navigate={navigate} />;
  } else if (route === routes.links) {
    content = <Links navigate={navigate} openAo3={() => setMask({ title: "AO3 / Diotima_Chang", url: ao3Url, embedded: true })} />;
  } else if (route === routes.contact) {
    content = <Contact navigate={navigate} />;
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
