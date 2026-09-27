import { useState } from "react";
import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import ArticleLanguage from "../../../components/ui/ArticleLanguage";
import { routes } from "../../../config/routes";

const chinese = {
  title: "GPU显存大小在cuDSS求解过程中的重要性",
  subtitle: "一次关于显存、混合内存与科学计算硬件配置的观察",
  paragraphs: [
    "去年对一些官方算例做了测试，发现自己的电脑怎么也跑不满。一开始以为是我的电脑CPU，GPU的配置搭配有问题，CPU组装和分解矩阵的速度太慢，跟不上GPU处理速度。",
    "但今天又因为一些原因，跑一个超高计算量的东西。鉴于又有点卡，我于是仔细研究了一下GPU占用情况，发现如图所示，显存利用其实是满了的——显存满了，导致求解器不得不切混合内存。即使我只选了FP64计算单元进行计算，GPU的矩阵处理速度和显存大小也可能是不匹配的。",
    "初步推测是可能矩阵刚进入显存，就被计算完了，但是显存和内存，硬盘的交换读写需要时间。因此成为了瓶颈，导致计算单元没有得到充分利用。这个案例也体现了现代科学计算的硬件利用其实存在极大的可优化空间。对于不同问题，网格。正确配置CPU，GPU以及分配合理的内存变成一个需要根据研究人员经验综合研究的问题。",
    "目前比较简单的解决方案可能是魔改增大显存或者通过魔改加统一内存。抑或者是上HPC，通过直接分配足够多的资源，力大砖飞，来解决问题。最近也读了近些年一些关于动态分配计算资源的工作。但是我想，在加入GPU计算，增加了GPU和显存大小两个额外变量后的现在，这个分配问题也比过去更加复杂了。"
  ]
};
const english = {
  title: "The Importance of GPU VRAM Size in the cuDSS Solving Process",
  subtitle: "An observation about VRAM, hybrid memory, and hardware configuration for scientific computation",
  paragraphs: [
    "Last year, I tested several official examples and found that my computer could never fully utilize its resources. At first, I thought there was a problem with the balance between my CPU and GPU: the CPU assembled and decomposed the matrices too slowly to keep up with the GPU.",
    "Today, for another reason, I ran a problem with a very high computational load. Since it was a little laggy again, I studied the GPU usage carefully and found that, as shown in the figure, the VRAM usage was actually full. Once the VRAM was full, the solver had to switch to hybrid memory. Even when I selected only the FP64 computing unit, the GPU's matrix-processing speed and its available VRAM could still be mismatched.",
    "My preliminary guess is that a matrix may be computed almost immediately after entering VRAM, while exchanging data between VRAM, system memory, and the hard drive takes time. This therefore becomes the bottleneck, leaving the computing units underutilized. This case also shows that there is considerable room to optimize hardware utilization in modern scientific computing. For different problems and meshes, configuring the CPU and GPU correctly and allocating a reasonable amount of memory becomes a question that requires researchers to combine experience with analysis.",
    "A relatively simple solution may be to modify the hardware to increase VRAM or add unified memory. Alternatively, one can use an HPC system and solve the problem by directly allocating enough resources. I have also recently read several works on dynamically allocating computational resources. However, after GPU computing adds two extra variables, GPU capability and VRAM size, I think this allocation problem has become more complicated than before."
  ]
};

export default function VramScientificComputationArticle({ navigate }) {
  const [language, setLanguage] = useState("zh");
  const content = language === "zh" ? chinese : english;
  const imageBase = `${import.meta.env.BASE_URL}modelling/vram-in-scientific-computation/`;
  return <main className="sub-main">
    <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Blogs", route: routes.blog }, { label: "Modelling", route: routes.modelling }, { label: content.title }]} />
    <article className="article-template" lang={language === "zh" ? "zh-CN" : "en"}><div className="article-content">
      <ArticleLanguage language={language} onChange={setLanguage} originalLanguage="zh" />
      <p className="article-meta">September 28, 2026 / Modelling / COMSOL</p>
      <h1>{content.title}</h1>
      <p className="article-subtitle">{content.subtitle}</p>
      {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      <figure><img className="article-photo article-photo-wide" src={`${imageBase}gpu-vram-usage.png`} alt={language === "zh" ? "GPU显存利用率截图" : "GPU VRAM usage screenshot"} /><figcaption>{language === "zh" ? "GPU 专用显存接近满载时的资源使用情况。" : "Resource usage when dedicated GPU memory is nearly full."}</figcaption></figure>
    </div></article>
  </main>;
}
