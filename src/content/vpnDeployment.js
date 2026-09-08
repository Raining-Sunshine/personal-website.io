export const chinese = [
  "一个简单的VPN部署教程",
  "全部操作请在合规合法情况下进行。本文作者Diotima不对因本文内容所造成的任何实践和损失负责。请务必遵守当地法律法规，搭建之前完成报备，以防止有数据泄露，被盗的风险。",
  "本方案涉及三个服务器：公网服务器，域名服务器，客户端。Windows部署中，为了设备安全，额外引入了Stunnel进行代理和加密。本案例中，云服务器来自阿里云SAS，域名托管则为Cloudflare。其架构分为移动端和桌面端。架构图如下：",
  "操作过程：",
  "1. 登录SAS服务器，利用",
  "上的指南，安装开源版OpenVPN。注意这一版本不带控制台，但是对内存的占用显著小于OpenVPN付费版，并且对用户数没有限制。对于alibabacloud的服务器来说，这一版本的卡顿会更低，速度会更快。我使用了路由版本，这一版本对于绝大多数情况的使用已经足够了。",
  "2. 安装完开始创建Profile。这一步可以让Codex自动完成。可以将以下ovpn文件丢给Codex并告诉它按照这个模板，自己创建密钥对，申请CA证书以及绑定域名。然后将生成好的ovpn文件下载到本地。",
  "按照这个模板，理论上可以自动完成CA证书申请，加密，以及密钥对生成。我个人认为SHA 256生成的密钥就已经足够稳固，不需要特意选择其他的加密方式了。CA我似乎选择了Let's Encrypt来签发证书，可以使用Certbot来自动续签。TCP和UDP连接次数可以自己决定比例。不过次数不要太多。建议优先TCP，因为是双向的包。UDP作为单向的包，如果被劫持就问题很大了。但是UDP连接更加稳定一点。TCP连不上的时候可以试试UDP。",
  "3. 在完成域名设置（不想买域名就裸连IP地址）之后，需要对域名进行绑定。在Cloudflare的控制台中添加记录，指向云服务器的IP。注意此处一定要关掉橙云标识，不要使用Cloudflare提供的路由！那会让你的连接被拦截下来。",
  "4.配置Stunnel。如",
  "所示，可以轻松结合AI，如前面一样申请CA和创建密钥后，配置好服务器上的Stunnel。下载密钥，在客户端上下载好Stunnel后，客户端Stunnel加入以下字段：",
  "然后，电脑端启动OpenVPN connect ",
  "前，先打开Stunnel做加密，OpenVPN connect中导入ovpn文件，点击连接。即可使用服务器上网了。"
];
export const english = [
  "A Simple VPN Deployment Tutorial",
  "Carry out all operations legally and in compliance with applicable requirements. The author, Diotima, accepts no responsibility for any actions taken or losses incurred as a result of this article. Please comply with local laws and regulations and complete the required registration before deployment to guard against the risk of data leakage or theft.",
  "This setup involves three servers: a public server, a domain server, and a client. For the Windows deployment, Stunnel is additionally introduced for proxying and encryption to protect the device. In this example, the cloud server comes from Alibaba Cloud SAS, and the domain is hosted by Cloudflare. The architecture is divided into mobile and desktop configurations, as shown below:",
  "Procedure:",
  "1. Log in to the SAS server and follow the guide at ",
  " to install the open-source version of OpenVPN. This version does not include a console, but its memory usage is significantly lower than that of the paid version of OpenVPN, and it has no limit on the number of users. On Alibaba Cloud servers, this version has less lag and runs faster. I used the routed version, which is sufficient for most situations.",
  "2. After installation, start creating a profile. Codex can complete this step automatically. Give it the following ovpn file and ask it to follow this template, create the key pair, apply for a CA certificate, and bind the domain. Then download the generated ovpn file locally.",
  "In theory, following this template allows the CA certificate application, encryption, and key-pair generation to be completed automatically. Personally, I think keys generated with SHA 256 are already secure enough, so there is no need to specifically choose another encryption method. I seem to have chosen Let's Encrypt as the CA to issue the certificate, and Certbot can renew it automatically. You can choose the ratio of TCP and UDP connection attempts yourself, but do not include too many. I recommend prioritizing TCP because its packets are bidirectional. UDP packets are unidirectional, so hijacking them would be a serious problem. However, UDP connections are a little more stable. If TCP fails to connect, you can try UDP.",
  "3. After setting up the domain (or connecting directly to the IP address if you do not want to buy one), bind the domain by adding a record in the Cloudflare console that points to the cloud server's IP address. Be sure to turn off the orange cloud here and do not use the routing provided by Cloudflare! Otherwise, your connection will be blocked.",
  "4. Configure Stunnel. As shown at ",
  ", you can easily work with AI to apply for a CA certificate and create keys as above, then configure Stunnel on the server. Download the keys, install Stunnel on the client, and add the following to the client-side Stunnel configuration:",
  "Then, before starting OpenVPN Connect on the computer ",
  ", start Stunnel for encryption, import the ovpn file into OpenVPN Connect, and click Connect. You can then access the internet through the server."
];
export const profile = "# Automatically generated OpenVPN client config file\n# Generated on 【】 by 【】\n# Note: this config file contains inline private keys\n#       and therefore should be kept confidential!\n#       Certificate serial: 5650054883422968193, certificate common name:\n#       Expires 【】 【】\n# Note: this configuration is user-locked to the username below\n# OVPN_ACCESS_SERVER_USERNAME=【】\n# Define the profile name of this particular configuration file\n# OVPN_ACCESS_SERVER_PROFILE=\n# OVPN_ACCESS_SERVER_AUTOLOGIN=1\n\n# Default Cipher\ncipher AES-256-CBC\n# OVPN_ACCESS_SERVER_CLI_PREF_ALLOW_WEB_IMPORT=True\n# OVPN_ACCESS_SERVER_CLI_PREF_BASIC_CLIENT=False\n# OVPN_ACCESS_SERVER_CLI_PREF_ENABLE_CONNECT=False\n# OVPN_ACCESS_SERVER_CLI_PREF_ENABLE_XD_PROXY=True\n# OVPN_ACCESS_SERVER_WEB_CA_BUNDLE_START\n# -----BEGIN CERTIFICATE-----\n# 【】\n# -----END CERTIFICATE-----\n# OVPN_ACCESS_SERVER_WEB_CA_BUNDLE_STOP\n# OVPN_ACCESS_SERVER_IS_OPENVPN_WEB_CA=0\nclient\nproto tcp-client\nserver-poll-timeout 4\nnobind\nremote 【Saved address for Stunnel】 【Stunnel port】\nremote 【Linked domain name】 【TCP Port】 tcp\nremote 【Linked domain name】 【TCP Port】 tcp\nremote 【Linked domain name】 【UDP Port】 udp\nremote 【Linked domain name】 【UDP Port】 udp\nremote 【Linked domain name】 【UDP Port】 udp\nremote 【Linked domain name】 【UDP Port】 udp\nremote 【Linked domain name】 【UDP Port】 udp\nremote 【Linked domain name】 【UDP Port】 udp\nroute 【Linked domain name】 255.255.255.255 net_gateway\ndev tun\ndev-type tun\nremote-cert-tls server\ntls-version-min 1.2\nreneg-sec 604800\ntun-mtu 1420\nverb 3\npush-peer-info\n\n<ca>\n-----BEGIN CERTIFICATE-----\n【】\n-----END CERTIFICATE-----\n</ca>\n<cert>\n-----BEGIN CERTIFICATE-----\n【】\n-----END CERTIFICATE-----\n</cert>\n<key>\n-----BEGIN PRIVATE KEY-----\n【】\n-----END PRIVATE KEY-----\n</key>\n<tls-crypt-v2>\n-----BEGIN OpenVPN tls-crypt-v2 client key-----\n【】\n-----END OpenVPN tls-crypt-v2 client key-----\n</tls-crypt-v2>";
export const stunnel = "[openvpn]\nclient = yes\naccept = 127.0.0.1:【Stunnel Port】\nconnect = 【 domain name】：【TCP port】\nverifyChain = yes\nCAfile = 【Location of CA cert】";
