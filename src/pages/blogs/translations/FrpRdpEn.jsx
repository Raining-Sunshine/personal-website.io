import CodeBlock from "../../../components/ui/CodeBlock";
import { batScript, clientConfig, serverConfig } from "../../../content/frpCodeBlocks";

const serverConfigEn = serverConfig
  .replaceAll("内网IP", "private IP")
  .replace("TCP 开放端口", "open TCP port")
  .replace("UDP 开放端口", "open UDP port")
  .replace("日志地址", "log path")
  .replace("日志保留天数", "log retention in days")
  .replace("链接 token", "connection token");
const clientConfigEn = clientConfig
  .replace("云服务器的 IP 地址及 frps 里面设置的通信端口", "Cloud-server IP and the communication port configured in frps")
  .replace("token 与服务端设置一样", "Use the same token as the server")
  .replace("设置日志文件记录路径", "Log file path")
  .replace("设置日志记录级别，分别有 trace, debug, info, warn, error", "Log level: trace, debug, info, warn, or error")
  .replace("设置日志记录最大天数", "Maximum log retention in days")
  .replace("设置本机面板", "Local dashboard")
  .replace("RDP，Windows 的 RDP 默认端口是 3389，协议为 TCP，转发到服务端【】中的端口", "RDP uses TCP port 3389 by default on Windows; forward it to the chosen server port");
const batScriptEn = batScript.replace("frp 文件夹路径", "path to the frp folder");

function FrpRdpEn({ frpReleasesUrl }) {
  return <>
    <p className="article-meta">Computer / Remote access</p>
    <h1>Configuring Remote Desktop through frp Intranet Penetration</h1>
    <p>Recently, the remote-control software I normally use started charging for overseas IP addresses, and it was rather expensive. That was obviously unacceptable. I uninstalled it and decided to use frp together with the Google Cloud free offer for new users to build an intranet-penetration setup.</p>
    <h2>Required devices</h2><ol><li>A cloud server with a public IP address</li><li>The remote computer to be controlled</li><li>Any computer used as the access client</li></ol><p>frp releases: <a href={frpReleasesUrl} target="_blank" rel="noreferrer">{frpReleasesUrl}</a></p>
    <h2>Server configuration</h2><p>Open SSH on the cloud server. First run wget to download the package. Replace every item inside full-width brackets.</p><CodeBlock>{"wget 【package URL matching the server architecture; use amd64 for x86, for example https://github.com/fatedier/frp/..._linux_amd64.tar.gz】"}</CodeBlock>
    <p>Extract it:</p><CodeBlock>{"tar -zxvf 【frp_0.53.2_linux_amd64.tar.gz】"}</CodeBlock><p>You can rename the folder:</p><CodeBlock>{"cp -r 【frp_0.53.2_linux_amd64】 【frp】"}</CodeBlock><p>Enter the folder:</p><CodeBlock>{"cd frp"}</CodeBlock><p>List all files:</p><CodeBlock>{"ls -a"}</CodeBlock><p>Remove the client files:</p><CodeBlock>{`rm frpc
rm frpc.toml`}</CodeBlock><p>Edit frps.toml:</p><CodeBlock>{"vim frps.toml"}</CodeBlock><p>Server configuration:</p><CodeBlock>{serverConfigEn}</CodeBlock><p>After replacing the required fields, paste the configuration into frps.toml. Press Esc and save with :wq!.</p><p>Run the program in the background:</p><CodeBlock>{"nohup ./frps -c frps.toml &"}</CodeBlock><p>The server is now configured. Open 【public IP:7500】 to view the dashboard, using the credentials from the configuration, and then exit SSH.</p>
    <h2>Client configuration</h2><p>Open the client computer; I used Windows 11. Download the same frp package and remove the server files frps and frps.toml. The details are omitted here.</p><p>Change the configuration file extension to ini, open it in a text editor, and use:</p><CodeBlock>{clientConfigEn}</CodeBlock><p>Save it, create a new text file, and enter:</p><CodeBlock>{batScriptEn}</CodeBlock><p>Save it with a .bat extension and double-click the script.</p><p>The server and client are now configured. If necessary, place the bat file in the startup folder.</p><p>Open 127.0.0.1:7400 to view the local dashboard.</p><p>For remote access, enter 【public IP:RDP port】 as the target machine. In this example, that is 【public IP:7100】.</p><p>Protection in this setup is still fairly thin. I may add authentication before access later. I have also seen posts saying STCP is more stable, so I plan to investigate it.</p>
  </>;
}
export default FrpRdpEn;
