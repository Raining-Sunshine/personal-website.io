import { routes } from "../config/routes";
import { blogEntries } from "../content/blogEntries";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Links from "../pages/Links";
import Research from "../pages/Research";
import BlogCategory from "../pages/blogs/BlogCategory";
import BlogDirectory from "../pages/blogs/BlogDirectory";
import BuildingPersonalWebsiteArticle from "../pages/blogs/articles/BuildingPersonalWebsiteArticle";
import Comsol64GpuTestArticle from "../pages/blogs/articles/Comsol64GpuTestArticle";
import FrpRdpArticle from "../pages/blogs/articles/FrpRdpArticle";
import UniversalStudiosArticle from "../pages/blogs/articles/UniversalStudiosArticle";

function RouteContent({ route, navigate }) {
  switch (route) {
    case routes.blog:
      return <BlogDirectory navigate={navigate} />;
    case routes.modelling:
      return <BlogCategory category="Modelling" entries={blogEntries.modelling} navigate={navigate} />;
    case routes.comsol64Test:
      return <Comsol64GpuTestArticle navigate={navigate} />;
    case routes.computer:
      return <BlogCategory category="Computer" entries={blogEntries.computer} navigate={navigate} />;
    case routes.life:
      return <BlogCategory category="Life" entries={blogEntries.life} navigate={navigate} />;
    case routes.universalStudios:
      return <UniversalStudiosArticle navigate={navigate} />;
    case routes.frpRdp:
      return <FrpRdpArticle navigate={navigate} />;
    case routes.buildingPersonalWebsite:
      return <BuildingPersonalWebsiteArticle navigate={navigate} />;
    case routes.research:
      return <Research navigate={navigate} />;
    case routes.links:
      return <Links navigate={navigate} />;
    case routes.contact:
      return <Contact navigate={navigate} />;
    default:
      return <Home navigate={navigate} />;
  }
}

export default RouteContent;
