import { routes } from "../config/routes";
import { keinsciUrl } from "../config/site";
export const blogEntries = {
  modelling: [
    { title: "GPU显存大小在cuDSS求解过程中的重要性", label: "COMSOL/VRAM-in-scientific-computation", route: routes.vramScientificComputation },
    { title: "不使用参数化曲线，对烧瓶模型的几何建模", label: "Geometry/Flask", route: routes.flaskGeometry },
    { title: "How Does a Neural Network Work?", label: "Neural network / Basics", route: routes.neuralNetworkIntroduction },
    { title: "简单对COMSOL6.4的GPU加速做一个测试", label: "COMSOL/GPU-test", route: routes.comsol64Test },
    { title: "Computational Chemistry Forum Blog", label: "External link", href: keinsciUrl },
  ],
  computer: [
    { title: "环境配置：记录一次新电脑的环境配置过程", label: "Environment / WSL", route: routes.environmentSetup },
    { title: "一个简单的VPN部署教程", label: "VPN / deployment", route: routes.vpnDeployment },
    { title: "Codex编写个人主页的记录", label: "Website / Codex", route: routes.buildingPersonalWebsite },
    { title: "利用 frp 实现内网穿透的远程桌面配置记录", label: "Intranet penetration/frp", route: routes.frpRdp },
  ],
  life: [{ title: "闪闪亮亮环球攻略", label: "Travel / Beijing", route: routes.universalStudios }],
};