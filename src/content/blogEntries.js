import { routes } from "../config/routes";
import { keinsciUrl } from "../config/site";

export const blogEntries = {
  modelling: [
    { title: "简单对COMSOL6.4的GPU加速做一个测试", label: "COMSOL / GPU", route: routes.comsol64Test },
    { title: "Computational Chemistry Forum Blog", label: "External link", href: keinsciUrl },
  ],
  computer: [
    { title: "Codex编写个人主页的记录", label: "Website / Deployment", route: routes.buildingPersonalWebsite },
    { title: "利用 frp 实现内网穿透的远程桌面配置记录", label: "Remote desktop", route: routes.frpRdp },
  ],
  life: [{ title: "闪闪亮亮环球攻略", label: "Travel / Beijing", route: routes.universalStudios }],
};
