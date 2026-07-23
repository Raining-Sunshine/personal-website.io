import { routes } from "../config/routes";
import { keinsciUrl } from "../config/site";

export const blogEntries = {
  modelling: [{ title: "Computational Chemistry Forum Blog", label: "External link", href: keinsciUrl }],
  computer: [{ title: "利用 frp 实现内网穿透的远程桌面配置记录", label: "Remote desktop", route: routes.frpRdp }],
  life: [{ title: "闪闪亮亮环球攻略", label: "Travel / Beijing", route: routes.universalStudios }],
};
