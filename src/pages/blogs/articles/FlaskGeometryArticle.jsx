import { useState } from "react";
import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import ArticleLanguage from "../../../components/ui/ArticleLanguage";
import { routes } from "../../../config/routes";

function ChineseArticle({ imageBase }) {
  return <>
    <p className="article-meta">September 5, 2026 / Modelling / Geometry</p>
    <h1>不使用参数化曲线，对烧瓶模型的几何建模</h1>
    <p className="article-subtitle">一种从基础圆锥、圆角和面调整出发的建模方法</p>
    <aside className="article-note"><p><strong>方法说明：</strong>以下是我的个人建模流程。它用于在缺少 3D 扫描数据时构造可编辑的近似几何，并不是对真实烧瓶尺寸或制造误差的测量重建。</p></aside>
    <p>通常来说，对于烧瓶建模，在没有 3D 扫描重建的情况下，大部分人会选择通过参数化曲线先描述边的形状，再进行三维旋转。对于普通烧瓶，也可以选择将一个圆锥去掉尖端后与球体连接起来。</p>
    <p>然而，对于茄形瓶或者其他类型的烧瓶来说，这种方式会丢掉几何中的一些不对称性。因此在尝试后，我想出了一种新的解决方案。</p>
    <p>首先建立瓶口圆锥。当然，如果不需要考虑瓶口的影响，也可以略过这个部分。然后根据瓶颈、高度以及最大半径倒推，建立一个高度与烧瓶一致的圆锥模型。</p>
    <figure><img className="article-photo" src={`${imageBase}initial-conical-geometry.png`} alt="根据瓶颈、高度和最大半径建立的基础圆锥模型" /><figcaption>根据控制尺寸建立瓶口与基础圆锥。</figcaption></figure>
    <p>建立后，对底边倒圆角。圆角半径需要根据目标几何进行计算和调整。通过倒圆角，可以获得如下图所示的几何。</p>
    <figure><img className="article-photo" src={`${imageBase}filleted-flask-geometry.png`} alt="底边倒圆角后的烧瓶几何" /><figcaption>对底边倒圆角后得到的瓶体形状。</figcaption></figure>
    <p>最后调整各个面，删掉内部面，再创建几何并集即可。形成并集后，还需要检查几何是否封闭，以及是否存在会影响后续网格划分的小面或短边。</p>
  </>;
}

function EnglishArticle({ imageBase }) {
  return <>
    <p className="article-meta">September 5, 2026 / Modelling / Geometry</p>
    <h1>Geometric Modelling of a Flask without Parametric Curves</h1>
    <p className="article-subtitle">A modelling method based on a conical primitive, fillets, and face adjustment</p>
    <aside className="article-note"><p><strong>Method note:</strong> This is my personal modelling workflow. It creates an editable approximation when 3D scan data are unavailable; it is not a measurement-based reconstruction of the dimensions or manufacturing deviations of a real flask.</p></aside>
    <p>Normally, when modelling a flask without a reconstructed 3D scan, most people first use a parametric curve to describe the edge profile and then revolve it into a three-dimensional shape. For an ordinary flask, another option is to remove the tip of a cone and connect the remaining cone to a sphere.</p>
    <p>For an eggplant-shaped flask or another type of flask, however, this approach can lose some of the asymmetry in the geometry. After experimenting with it, I came up with a different solution.</p>
    <p>First, create the conical neck. This part can of course be omitted if the influence of the opening does not need to be considered. Then work backwards from the neck, height, and maximum radius to create a cone whose height matches that of the flask.</p>
    <figure><img className="article-photo" src={`${imageBase}initial-conical-geometry.png`} alt="Initial conical model based on the neck, height, and maximum radius" /><figcaption>The neck and initial cone constructed from the control dimensions.</figcaption></figure>
    <p>After creating it, fillet the bottom edge. The fillet radius needs to be calculated and adjusted for the target geometry. Applying the fillet produces the geometry shown below.</p>
    <figure><img className="article-photo" src={`${imageBase}filleted-flask-geometry.png`} alt="Flask geometry after filleting the bottom edge" /><figcaption>The flask body obtained after filleting the bottom edge.</figcaption></figure>
    <p>Finally, adjust the individual faces, remove the internal faces, and form a geometric union. After the union is created, check that the geometry is closed and that it contains no small faces or short edges that could interfere with meshing.</p>
  </>;
}

function FlaskGeometryArticle({ navigate }) {
  const [language, setLanguage] = useState("zh");
  const imageBase = `${import.meta.env.BASE_URL}modelling/flask-geometry-without-parametric-curves/`;
  return <main className="sub-main">
    <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Blogs", route: routes.blog }, { label: "Modelling", route: routes.modelling }, { label: language === "zh" ? "烧瓶几何建模" : "Flask geometry" }]} />
    <article className="article-template" lang={language === "zh" ? "zh-CN" : "en"}><div className="article-content">
      <ArticleLanguage language={language} onChange={setLanguage} originalLanguage="zh" />
      {language === "zh" ? <ChineseArticle imageBase={imageBase} /> : <EnglishArticle imageBase={imageBase} />}
    </div></article>
  </main>;
}
export default FlaskGeometryArticle;
