import "./App.css";
import Header from "./components/layout/Header";
import { useSiteRouter } from "./hooks/useSiteRouter";
import RouteContent from "./routing/RouteContent";

export default function App() {
  const { route, navigate } = useSiteRouter();

  return (
    <>
      <Header navigate={navigate} />
      <RouteContent route={route} navigate={navigate} />
    </>
  );
}
