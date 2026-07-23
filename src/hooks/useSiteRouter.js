import { useEffect, useState } from "react";
import { routes } from "../config/routes";

export function useSiteRouter() {
  const [route, setRoute] = useState(routes.home);
  useEffect(() => {
    const sync = () => {
      const next = location.pathname.replace(/^\/+|\/+$/g, "") || routes.home;
      setRoute(Object.values(routes).includes(next) ? next : routes.home);
    };
    sync();
    addEventListener("popstate", sync);
    return () => removeEventListener("popstate", sync);
  }, []);
  const navigate = (next) => {
    const path = next === routes.home ? "/" : `/${next}`;
    history.pushState(null, "", path);
    setRoute(next);
    scrollTo({ top: 0, behavior: "smooth" });
  };
  return { route, navigate };
}
