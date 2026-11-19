import { routePath } from "../../config/seo";

export default function SiteLink({ route, navigate, children, ...props }) {
  return <a {...props} href={routePath(route)} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(route);
  }}>{children}</a>;
}
