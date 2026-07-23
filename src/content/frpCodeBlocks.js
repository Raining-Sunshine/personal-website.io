export const serverConfig = `[root@host-cloud conf]                    # cat frps.toml
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

export const clientConfig = `[common]
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

export const batScript = `@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
REM
cd 【C:\\frp】 # frp 文件夹路径
frpc -c frpc.ini
exit`;
