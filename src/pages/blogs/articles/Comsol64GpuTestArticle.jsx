import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import { routes } from "../../../config/routes";

function Comsol64GpuTestArticle({ navigate }) {
  const imageBase = `${import.meta.env.BASE_URL}modelling/comsol64-test/`;

  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: "Modelling", route: routes.modelling },
          { label: "COMSOL 6.4 GPU test" },
        ]}
      />
      <article className="article-template">
        <div className="article-content">
          <p className="article-meta">July 23, 2026 / Modelling / COMSOL</p>
          <h1>简单对COMSOL6.4的GPU加速做一个测试</h1>
          <p className="article-subtitle">COMSOL 6.4、cuDSS 与消费级 GPU 的简单测试记录</p>

          <aside className="article-note">
            <p>
              <strong>二编：</strong>我朋友圈一位来自 IC 的老师分享，他的 COMSOL 在 GPU 上可以跑满。差异原因仍在探索中。根据我们的配置，初步猜测是因为在这种计算过程中，CPU 与 GPU 是串行计算关系，CPU 组装完总刚矩阵再由 GPU 来求解稀疏矩阵，因此我的 CPU 很不幸构成了计算瓶颈。
            </p>
            <p>
              这也说明在这一个新的版本中，我们不再能像过去一样，CPU 和内存尽量拉高即可，而是要充分考虑模型复杂度、CPU 与 GPU 计算效率配比以及显存与内存关系才行。同时这也说明，消费级显卡的潜力还是有很大挖掘空间的。
            </p>
          </aside>

          <h2>测试背景</h2>
          <p>
            最近 COMSOL 发布了新的 6.4 版本，本人很有幸拿到了试用码，于是决定在我的个人电脑上跑几个算例，看看资源使用情况。由于水装机板块的时候经常看见有人配置的机器需要运行 COMSOL，这一新版本中对计算的改进很多，所以打算发一个个人的简单测试来给大家参考一下。
          </p>

          <h2>COMSOL 6.4 的主要改进</h2>
          <p>首先，我们回顾一下新版本的主要改进：</p>
          <ul>
            <li>增加了 cuDSS 求解器。</li>
            <li>添加了显式动力学以及颗粒流模块。</li>
            <li>Chatbot 支持 Qwen 和 DeepSeek 这类兼容 OpenAI 接口的大模型。</li>
            <li>支持多 GPU 并行以及 CUDA。</li>
          </ul>
          <p>这里面，多 GPU 并行的效果来自官方。发布的数据是：</p>
          <p>
            使用频率相关阻抗数据的办公室声学模型，以空间高斯脉冲（500 Hz）求解 20 个周期，共 5000 万自由度：
          </p>
          <ul>
            <li>1 × GPU（NVIDIA RTX 6000 Ada）：29 分钟，92.3 ms/ts。</li>
            <li>2 × GPU（NVIDIA RTX 6000 Ada）：18 分钟，53.0 ms/ts。</li>
            <li>纯 CPU（Xeon w5-2445X，12 内核）：14 小时。</li>
          </ul>
          <p>
            基于这一组数据，我们已经可以断定，目前的 COMSOL 不再是只占用 CPU 资源的软件，一块有力的 GPU 对计算起到的帮助也极为重要。
          </p>

          <h2>什么情况下需要考虑 GPU 资源？</h2>
          <p>我们回到有限元的求解器计算过程中去。</p>
          <p>
            在划分好网格后，求解器要先求出每个单元的刚度矩阵，然后通过总刚集成的方式生成总刚矩阵。而目前 COMSOL 使用的 cuDSS 只能加速总刚矩阵的计算。因此，对于很多隐式瞬态的模型来说，GPU 的加成可能比较有限，显式模型的求解效率提升会更高。
          </p>
          <p>
            同时，COMSOL 自己的工程师也指出，在现有的计算过程中，显存需要准备充足。在 @Entropy.S.I 的测试中，COMSOL 对于内存资源的占用可以用可怕来形容。因为它的大量中间数据和矩阵不写入硬盘，而是在内存中计算，最后直接释放掉。
          </p>
          <p>
            GPU 计算也是同理。虽然 COMSOL 推出了混合模式，可以在需要的时候利用内存来救急，但是显存的效率显然会比混合模式下使用内存更高。
          </p>

          <h2>个人电脑测试</h2>
          <p>
            最后，说回来我的测试结果。在没有其他优化的情况下，我在自己的 3070 Ti（Laptop）上面用 Windows 版 COMSOL 6.4 进行了电池碰撞的显式动力学仿真，采用 cuDSS 求解器，其他设置如下图。
          </p>
          <figure>
            <img
              className="article-photo article-photo-wide"
              src={`${imageBase}cudss-solver-settings.png`}
              alt="COMSOL 6.4 中的 cuDSS 求解器与混合计算设置"
            />
            <figcaption>cuDSS 求解器、单精度与混合计算设置。</figcaption>
          </figure>
          <p>
            在全程计算过程中，平均 GPU 使用率不足 13%。显存占用大概 1 GB 左右，距离我设置的最大占用有一定距离。由于我用的是消费级显卡，双精度单元有限，所以我的求解精度选择了单精度。
          </p>
          <figure>
            <img
              className="article-photo"
              src={`${imageBase}gpu-usage-test-1.png`}
              alt="第一次 COMSOL 6.4 测试中的 GPU 使用率"
            />
            <figcaption>第一次测试中的 GPU 与专用显存占用情况。</figcaption>
          </figure>
          <figure>
            <img
              className="article-photo"
              src={`${imageBase}gpu-usage-test-2.png`}
              alt="COMSOL 6.4 显式动力学计算中的另一段 GPU 使用率"
            />
            <figcaption>同一测试过程中记录的另一段 GPU 使用情况。</figcaption>
          </figure>
          <p>在另一个算例中，平均使用率也是不足 13%，专用显存也只使用了 1 GB 左右。</p>
          <figure>
            <img
              className="article-photo"
              src={`${imageBase}gpu-usage-test-3.png`}
              alt="另一个 COMSOL 6.4 算例中的 GPU 使用率"
            />
            <figcaption>另一个算例中的 GPU 和显存占用。</figcaption>
          </figure>

          <h2>结论</h2>
          <p>
            综合来看，虽然现在 COMSOL 支持了 cuDSS，但是对于系统 GPU 资源的使用无疑还是保守的。单个任务并不足以占满 GPU 的运行效率，这可能和这两个模型的划分也有关系。
          </p>
          <p>
            但是无疑，现有阶段，非特殊情况下用户不必着急升级 GPU 加速求解。COMSOL 的占用仍然是以内存为优先。
          </p>
        </div>
      </article>
    </main>
  );
}

export default Comsol64GpuTestArticle;
