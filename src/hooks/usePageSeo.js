import { useEffect } from "react";
import { routePath, seoPages, siteUrl } from "../config/seo";

export function usePageSeo(route) {
  useEffect(() => {
    const page = seoPages[route];
    document.title = page.title;
    document.documentElement.lang = page.language;
    const setMeta = (key, value, attribute = "name") => {
      let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!node) { node = document.createElement("meta"); node.setAttribute(attribute, key); document.head.append(node); }
      node.content = value;
    };
    setMeta("description", page.description);
    setMeta("robots", "index, follow");
    setMeta("og:title", page.title, "property");
    setMeta("og:description", page.description, "property");
    setMeta("og:url", siteUrl + routePath(route), "property");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.append(canonical); }
    canonical.href = siteUrl + routePath(route);
  }, [route]);
}
