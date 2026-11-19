import { renderToString } from "react-dom/server";
import Header from "./components/layout/Header";
import RouteContent from "./routing/RouteContent";

export function render(route) {
  const navigate = () => {};
  return renderToString(<><Header navigate={navigate} /><RouteContent route={route} navigate={navigate} /></>);
}
