import { useState } from "react";
import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import { routes } from "../../../config/routes";

function LanguageSwitch({ language, setLanguage }) {
  return (
    <div className="article-toolbar">
      <div className="language-switch" role="group" aria-label="Article language">
        <button type="button" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>中文</button>
        <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button>
      </div>
    </div>
  );
}

function ChineseArticle({ imageBase }) {
  return (
    <>
      <p className="article-meta">September 5, 2026 / Modelling / Geometry</p>
      <h1>不使用参数化曲线，对烧瓶模型的几何建模</h1>
      <p className="article-subtitle">从控制尺寸反推基础圆锥，再通过圆角和面编辑恢复瓶体形状</p>

      <p>通常来说，在没有 3D 扫描重建的情况下，大部分人会先用参数化曲线描述烧瓶轴向截面的边缘，再将曲线旋转成三维几何。对于普通烧瓶，也可以把圆锥截去尖端后与球体连接起来。</p>
      <p>这些方法很适合规则的轴对称外形。然而对于茄形瓶，或者其他带有局部偏心、不均匀曲率和轻微不对称的烧瓶来说，旋转曲线或简单的球锥拼接容易丢掉原几何中的一些特征。尝试之后，我想出了一种不从参数化边界曲线开始的解决方案。</p>

      <h2>先确定控制尺寸</h2>
      <p>建模前先确定瓶颈半径、瓶颈高度、瓶体总高度、最大半径及最大半径所在的高度。这些尺寸不是为了直接写出完整的瓶身函数，而是用来构造一个之后可以继续编辑的基础几何。这样既保留了尺寸约束，也避免一开始就被一条固定的旋转曲线限制住。</p>

      <h2>从瓶口和基础圆锥开始</h2>
      <p>首先建立瓶口圆柱或圆台。如果模型不需要考虑瓶口对物理场的影响，也可以略过这个部分。然后根据瓶颈半径、瓶体高度以及最大半径倒推，建立一个与烧瓶等高的圆锥或圆台模型。</p>
      <p>在轴向截面中，侧面的基础斜率可以写成：</p>
      <div className="math-block" role="img" aria-label="k equals R max minus R neck divided by delta z">
        <var>k</var> = (<var>R</var><sub>max</sub> - <var>R</var><sub>neck</sub>) / Δ<var>z</var>
      </div>
      <p>这里的斜率只用于确定基础圆锥的张开程度，并不是要用直线精确描述最终瓶身。此时得到的是一个几何骨架，后续的圆角和面编辑才负责恢复瓶底的曲率和不对称性。</p>
      <figure>
        <img className="article-photo" src={`${imageBase}initial-conical-geometry.png`} alt="由瓶颈尺寸、总高度和最大半径反推得到的基础圆锥几何" />
        <figcaption>瓶口与基础圆锥建立后的几何。</figcaption>
      </figure>

      <h2>对底边倒圆角</h2>
      <p>基础几何建立后，对底边进行倒圆角。圆角半径需要根据目标最低点、最大半径所在位置以及希望得到的切向过渡来计算或迭代调整。半径太小会留下明显折角，太大则可能与瓶颈或中心轴附近的几何相交。</p>
      <p>如果之后还要抽壳形成玻璃壁厚，也要在这一步检查内外轮廓是否仍然能够保持连续，并给后续的偏移操作留出足够空间。完成圆角后，瓶底已经得到连续的曲面，但整体仍然可以作为实体继续编辑。</p>
      <figure>
        <img className="article-photo" src={`${imageBase}filleted-flask-geometry.png`} alt="底边倒圆角后形成的烧瓶基础几何" />
        <figcaption>对底边倒圆角后得到的连续瓶底。</figcaption>
      </figure>

      <h2>调整面并形成最终几何</h2>
      <p>最后根据实际烧瓶的外形调整各个面。可以通过移动、旋转或局部偏移面来改变最大半径的位置，让某一侧更加饱满，或者引入茄形瓶常见的轻微偏心。与整条旋转曲线相比，这种方式可以只修改需要修改的区域，而不必重新定义完整截面。</p>
      <p>调整完成后，删去重叠产生的内部面，创建几何并集，并检查是否还存在细小面、短边、自相交或未封闭区域。若模型要继续用于网格划分，还应确认圆角与局部面编辑没有制造尺寸远小于目标网格的几何细节。</p>

      <h2>适用范围</h2>
      <p>这种方法并不是要完全替代参数化曲线。对于严格轴对称、轮廓函数已知的烧瓶，旋转参数曲线仍然最直接；如果需要复现真实制造误差，3D 扫描也会更加可靠。它更适合控制尺寸已知、外形存在一定不对称，同时又希望几何能够方便修改和重复生成的情况。</p>
    </>
  );
}

function EnglishArticle({ imageBase }) {
  return (
    <>
      <p className="article-meta">September 5, 2026 / Modelling / Geometry</p>
      <h1>Geometric Modelling of a Flask without Parametric Curves</h1>
      <p className="article-subtitle">Building a conical scaffold from control dimensions, then recovering the flask shape through fillets and face editing</p>

      <p>When no 3D scan is available, a flask is usually modelled by defining its axial profile with a parametric curve and revolving that curve into a three-dimensional geometry. A conventional flask can also be approximated by joining a sphere to a cone with its tip removed.</p>
      <p>These methods work well for regular axisymmetric shapes. For an eggplant-shaped flask, or another vessel with local eccentricity, uneven curvature, and slight asymmetry, however, a revolved profile or a simple sphere-and-cone construction can lose part of the original geometry. After some experiments, I found an alternative that does not begin with a parametric boundary curve.</p>

      <h2>Define the control dimensions</h2>
      <p>I first determine the neck radius, neck height, total body height, maximum radius, and the height at which that maximum radius occurs. These dimensions are not used to write a complete function for the body. Instead, they define an editable geometric scaffold. This keeps the important dimensional constraints without locking the entire model to one revolved curve from the beginning.</p>

      <h2>Start from the neck and a conical scaffold</h2>
      <p>I first create the neck as a cylinder or truncated cone. This step can be omitted if the neck has no relevant influence on the physics being modelled. I then work backwards from the neck radius, body height, and maximum radius to create a cone or frustum with the same height as the flask.</p>
      <p>In an axial section, the initial side slope can be written as:</p>
      <div className="math-block" role="img" aria-label="k equals R max minus R neck divided by delta z">
        <var>k</var> = (<var>R</var><sub>max</sub> - <var>R</var><sub>neck</sub>) / Δ<var>z</var>
      </div>
      <p>This slope only sets the opening of the initial cone; the straight side is not intended to describe the final flask exactly. At this stage the model is a scaffold. Filleting and face editing will recover the curvature of the base and introduce the required asymmetry.</p>
      <figure>
        <img className="article-photo" src={`${imageBase}initial-conical-geometry.png`} alt="Initial conical geometry reconstructed from the neck dimensions, total height, and maximum radius" />
        <figcaption>The neck and initial conical scaffold.</figcaption>
      </figure>

      <h2>Fillet the bottom edge</h2>
      <p>After creating the scaffold, I apply a fillet to its bottom edge. The fillet radius must be calculated or adjusted iteratively from the intended lowest point, the location of the maximum radius, and the desired tangential transition. A radius that is too small leaves a visible corner, while one that is too large may intersect the neck or geometry near the central axis.</p>
      <p>If the solid will later be shelled to form a glass wall, I also check that the inner and outer profiles remain continuous and leave enough room for the offset operation. The fillet produces a continuous rounded base while keeping the result available for further solid editing.</p>
      <figure>
        <img className="article-photo" src={`${imageBase}filleted-flask-geometry.png`} alt="Flask scaffold after applying a fillet to the bottom edge" />
        <figcaption>The continuous flask base produced by the bottom fillet.</figcaption>
      </figure>

      <h2>Edit the faces and form the final geometry</h2>
      <p>I then adjust individual faces to match the real flask. Faces can be moved, rotated, or offset locally to shift the location of the maximum radius, make one side fuller, or introduce the slight eccentricity of an eggplant-shaped flask. Unlike editing a complete revolved profile, this approach changes only the regions that need adjustment.</p>
      <p>Finally, I remove internal faces created by overlapping bodies, form a geometric union, and check for small faces, short edges, self-intersections, and open regions. If the geometry will be meshed, I also make sure that the fillets and local edits have not introduced features much smaller than the intended element size.</p>

      <h2>Where this method is useful</h2>
      <p>This method is not intended to replace parametric curves in every case. A revolved profile remains the most direct option for a strictly axisymmetric flask with a known profile, while 3D scanning is more reliable when actual manufacturing deviations must be reproduced. This construction is most useful when the main dimensions are known, some asymmetry must be retained, and the geometry needs to remain easy to edit and regenerate.</p>
    </>
  );
}

function FlaskGeometryArticle({ navigate }) {
  const [language, setLanguage] = useState("zh");
  const imageBase = `${import.meta.env.BASE_URL}modelling/flask-geometry-without-parametric-curves/`;

  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[
        { label: "Home", route: routes.home },
        { label: "Blogs", route: routes.blog },
        { label: "Modelling", route: routes.modelling },
        { label: language === "zh" ? "烧瓶几何建模" : "Flask geometry" },
      ]} />
      <article className="article-template" lang={language === "zh" ? "zh-CN" : "en"}>
        <div className="article-content">
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          {language === "zh" ? <ChineseArticle imageBase={imageBase} /> : <EnglishArticle imageBase={imageBase} />}
        </div>
      </article>
    </main>
  );
}

export default FlaskGeometryArticle;