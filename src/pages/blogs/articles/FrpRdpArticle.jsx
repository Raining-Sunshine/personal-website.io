import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import CodeBlock from "../../../components/ui/CodeBlock";
import { routes } from "../../../config/routes";
import { frpReleasesUrl } from "../../../config/site";
import { batScript, clientConfig, serverConfig } from "../../../content/frpCodeBlocks";

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

export default FrpRdpArticle;
