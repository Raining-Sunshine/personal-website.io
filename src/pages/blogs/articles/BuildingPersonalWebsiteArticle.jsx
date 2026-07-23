import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import CodeBlock from "../../../components/ui/CodeBlock";
import { routes } from "../../../config/routes";

const githubPagesDocumentUrl =
  "https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site";

function BuildingPersonalWebsiteArticle({ navigate }) {
  const imageBase = `${import.meta.env.BASE_URL}computer/building-personal-website/`;

  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: "Computer", route: routes.computer },
          { label: "Building a personal website" },
        ]}
      />
      <article className="article-template">
        <div className="article-content">
          <p className="article-meta">July 23, 2026 / Computer / Website</p>
          <h1>Codex编写个人主页的记录</h1>
          <p className="article-subtitle">GitHub Pages、Cloudflare 与 Codex 的个人主页部署记录</p>

          <p>
            前段时间在另外的帖子里提到买了一个域名，找了个服务器编写个人主页。这两天我又细化了一下，把主页这个东西丰富了一些。开帖分享记录一下自己的部署流程。全程基本没有碰代码，全靠 Codex 狠狠拉磨。模型混用了 GPT-5.5 和 GPT-5.6-sol，所有额度都由 Plus 套餐 cover。
          </p>
          <p>
            思路是 GitHub Pages 托管静态网页，Cloudflare 托管域名，用子域名来分割不同的用途。我专门添加了 academic 的 DNS 记录来 host 我的简历，从而与同人文、博客所在的主页面分开。
          </p>

          <h2>第一步：连接 GitHub</h2>
          <p>
            第一步是将 Codex 连接到 GitHub。这一步可以直接在插件和应用里面自己设置，也可以让 Codex 给你拉请求设置。不论如何，经过 2FA 验证后我连接上了 GitHub。
          </p>

          <h2>第二步：在本地创建网站</h2>
          <p>
            第二步是利用本地 Git 创建一个仓库，这一步 Codex 可以自己完成。我简单描述了一下想要的页面布局，并上传了头像和背景图（实则从 B 站前端扒下来的）。这一步需要寻找一些其他的参考，我大体参考了一些其他的个人网站，定下了自己的布局。
          </p>
          <p>
            这其中 Codex 很聪明，知道为不同屏幕布局调整 CSS 格式来做适配。我自己一开始都没想到，各种居中写得也很好。
          </p>

          <h2>第三步：确定网站架构</h2>
          <p>第三步是我手动喂给它了我想要的网站架构，大概是：</p>
          <CodeBlock>{`Home
├─ Research
├─ Blogs
├─ Links
└─ Contact me`}</CodeBlock>
          <p>
            Codex 精准理解了我的想法。可惜它不知为何把所有子页面写成了 /#/blogs 的形式，于是又让它修改。
          </p>

          <h2>第四步：添加子页面</h2>
          <p>
            第四步是添加子页面。我的要求是代码由代码框展示，并且可以复制。我将过去一些散落在各个网站的博文复制回来，喂给 GPT 并附上原网页作为排版参考，得到了很不错的子页面。
          </p>
          <figure>
            <img
              className="article-photo article-photo-wide"
              src={`${imageBase}copyable-code-block.png`}
              alt="个人主页博文中的一键复制代码框"
            />
            <figcaption>博文中的代码框和一键复制按钮。</figcaption>
          </figure>

          <h2>第五步：完善目录和链接</h2>
          <p>
            第五步就是给博文添加目录，给 Links 添加超链接什么的……把需求喂进去后都展现得很不错。到这一步还是可以不推送到云端的。
          </p>

          <h2>第六步：使用 GitHub Actions 部署</h2>
          <p>
            第六步是在 GitHub 创建项目并推送到云端。Codex 可以自己创建一个 Action 来部署和推送网页。你把要绑定的域名告诉它，Action 生成后会自动指向要使用的域名。
          </p>

          <h2>第七步：绑定域名</h2>
          <p>
            第七步就是绑定域名。GitHub Pages 有四个 IPv4 地址，还有四个 IPv6 地址。IP 段可以在 GitHub 的{" "}
            <a href={githubPagesDocumentUrl} target="_blank" rel="noreferrer">document</a>
            {" "}里面找到。
          </p>
          <figure>
            <img
              className="article-photo article-photo-wide"
              src={`${imageBase}github-pages-ip-addresses.png`}
              alt="GitHub Pages 文档中的 IPv4 和 IPv6 地址"
            />
            <figcaption>GitHub Pages 文档列出的 A 与 AAAA 记录地址。</figcaption>
          </figure>
          <p>
            在域名托管平台添加对应的 record。我全部添加的是 A 或者 AAAA（IPv6）记录，没有使用 ALIAS 记录，并开启 Proxy 作为增强保护。
          </p>
          <figure>
            <img
              className="article-photo article-photo-wide"
              src={`${imageBase}cloudflare-dns-records.png`}
              alt="Cloudflare 中配置的 GitHub Pages DNS 记录"
            />
            <figcaption>Cloudflare 中的 DNS 记录与代理状态。</figcaption>
          </figure>
          <p>这样网页就可以使用了。</p>

          <h2>Academic 子域名</h2>
          <p>
            对于 academic 子域名，我直接上传了我的简历到 Codex，并提出风格要求后让它直接部署。它直接部署的成果就可以接受了，后面又制作了网页的分享页和 favicon，让网站显得更加炫酷一点。
          </p>
          <p>
            直接用子域名，是因为我认为将学术简历与日常博客、ACGN 生活内容隔开一点会显得更专业。如果我不写博客，那我可能只是加一个子页面来 host 简历了。
          </p>
          <figure>
            <img
              className="article-photo article-photo-wide"
              src={`${imageBase}academic-cv-codex-chat.png`}
              alt="使用 Codex 部署 Academic CV 网站的对话记录"
            />
            <figcaption>将 Academic CV 作为独立子域名项目部署。</figcaption>
          </figure>

          <h2>联系表单与反垃圾措施</h2>
          <p>
            最后，出于个人爱好，我让 Codex 加上了一个 FormSubmit 的“联系我”功能。拥有域名后，Cloudflare 可以 host 一个邮箱中转，果断使用这个中转邮箱加强了一些隐私保护。同时让 Codex 启用了一些反垃圾措施，还添加了 robots.txt 规定一下反爬虫（虽然 GitHub 可以直接扒）。
          </p>
          <p>
            再次推送，发过启用 FormSubmit 的验证邮件后，网页就做好啦。
          </p>
        </div>
      </article>
    </main>
  );
}

export default BuildingPersonalWebsiteArticle;
