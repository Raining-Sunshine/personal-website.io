function NeuralNetworkIntroductionZh({ imageBase }) {
  return <>
    <p className="article-meta">August 23, 2026 / Modelling / Neural Network</p>
    <h1>神经网络是如何工作的？</h1>
    <p className="article-subtitle">从曲线拟合、残差和一个简单的物理实验开始</p>
    <p>神经网络（NN）现在吸引了所有人的目光。作为计算机视觉、大语言模型以及如今所谓 AI 产业的基础，神经网络已经在技术领域乃至科学研究中扮演了重要角色。但神经网络究竟是怎样工作的？</p>
    <p>很多课程从概率论讲起。概率论当然重要，但它距离“模型实际上在做什么”这种直观理解有些远。我想用更简单的方式说明神经网络，所以先从一个简单实验开始。</p>
    <h2>从一条直线开始</h2>
    <p>做物理实验时，我们会记录数据：改变一个参数，得到一个结果，再把两者画在一张简单的图里。</p>
    <figure><img className="article-photo article-photo-wide" src={`${imageBase}experimental-data.png`} alt="大致沿线性趋势分布的红色实验数据点" /><figcaption>一组简单的实验观测数据。</figcaption></figure>
    <p>接下来，你大概会画一条线，尝试让每个点都落在线上；如果做不到，就让这些点尽量均匀地分布在线的两侧。对于这张图，我们可能会认为数据分布在 <em>y = x</em> 附近。</p>
    <p>到这里，你已经完成了第一次预测：从数据集中找到数据遵循的规律，再用定量方式描述它。神经网络在概念上做的是类似的事情，只是它学习的函数可能比一条直线复杂得多。</p>
    <h2>从曲线拟合到神经网络</h2>
    <p>我想强调的是，训练神经网络仍然可以理解成一种曲线拟合。在上面的实验中，我们选定 <em>ŷ = ax + b</em> 这样的函数，改变 <em>a</em> 和 <em>b</em>，寻找最贴近观测值的直线。在神经网络中，我们同样选择一个函数、调整它的参数，并让预测尽量接近数据。基本任务并没有改变。</p>
    <p>变化的是函数的规模和形状。真实数据可能包含许多输入特征、多个输出和强烈的非线性关系。因此这里的“曲线”不再是能画在纸上的线，而可能是高维空间中的曲面，或者区分不同类别的决策边界。我们无法直接看见它，但仍能用数值方法以相似的思路完成拟合。</p>
    <p>神经网络通过堆叠多层来构造这种灵活的拟合函数。每一层先做加权求和，再施加非线性激活：</p>
    <div className="math-block" role="img" aria-label="h equals sigma of W x plus b"><var>h</var> = σ(<var>W</var><var>x</var> + <var>b</var>)</div>
    <p>权重 <var>W</var> 和偏置 <var>b</var> 的作用类似普通拟合方程中的系数。许多层连接后，这些参数可以描述难以手写的曲线或曲面。前向传播计算当前函数的输出，损失函数衡量它与已知数据相差多远，反向传播和优化器再把参数推向更好的拟合结果。</p>
    <p>分类问题也能从这个角度理解。网络拟合的是类别得分或概率，并在不同样本组之间形成决策边界。因此，“曲线拟合”在这里是一种帮助理解的类比：监督学习仍是在参数化函数族中寻找能够减小损失的函数，但并非所有神经网络任务都等同于传统二维回归。</p>
    <p>现代模型可以有数十亿参数。参数数量不等于输入数据的维数，而更接近模型容量的粗略描述。更多参数带来更多自由度，同时也让训练、验证和计算成本变得更加重要。</p>
    <h2>训练集、验证集和测试集</h2>
    <p>拟合曲线时，参数数量非常重要。以多项式为例，最高次项为 <var>x</var><sup>n</sup> 时，模型有 <var>n</var> + 1 个系数。我们不希望结果过于粗糙，但过多的自由度又可能导致过拟合。</p>
    <figure><img className="article-photo article-photo-wide" src={`${imageBase}overfitted-curve.png`} alt="穿过全部红色训练点且剧烈振荡的蓝色曲线" /><figcaption>蓝线几乎完美拟合了已知点，但这些振荡并不符合数据的整体趋势。</figcaption></figure>
    <p>蓝线描述了图中所有点，但面对新数据时可能表现很差。在神经网络中，这叫作过拟合：模型记住了训练数据中的细节和噪声，而没有学到可以推广的规律。</p>
    <figure><img className="article-photo article-photo-wide" src={`${imageBase}overfitting-with-validation-point.png`} alt="过拟合曲线与一个新的绿色验证点" /><figcaption>一个新数据点暴露了“记住训练数据”和“学到一般规律”的区别。</figcaption></figure>
    <p>如果只用参加拟合的数据评价模型，蓝线看起来非常优秀，因为训练残差几乎为零。新的绿色点没有参与拟合，它检验模型能否把规律推广到未见数据。这就是不能把一份数据不加区分地用于整个训练流程的原因。</p>
    <figure><img className="article-photo article-photo-wide" src={`${imageBase}train-validation-test-split.png`} alt="划分为红色训练点、绿色验证点和青色测试点的数据" /><figcaption>红色为训练数据，绿色为验证数据，青色为测试数据。</figcaption></figure>
    <p><strong>训练集</strong>被反复提供给优化器。模型在这些样本上计算预测和残差，反向传播据此更新权重与偏置。足够灵活的模型总能得到很低的训练误差，所以训练表现本身不能证明模型学到了可迁移的规律。</p>
    <p><strong>验证集</strong>通常不直接更新权重，而是帮助选择层数、神经元数量、学习率、正则化强度、训练时长和提前停止时机。若训练损失持续下降而验证损失开始上升，模型很可能正在过拟合。</p>
    <p><strong>测试集</strong>是最终考试。设计模型期间应保持它不被使用，并在模型与训练流程确定后再评估。如果反复查看测试结果并据此修改模型，测试集就会变成另一个验证集，报告的性能也会偏乐观。</p>
    <p>三类数据都应代表真正需要解决的问题，同时避免重复或强相关样本跨集合泄漏。对于时间序列、重复实验或来自多个试样的数据，按时间、试样、批次或实验条件划分通常比逐点随机划分更能诚实地检验泛化能力。</p>
    <h2>残差与损失函数</h2>
    <p>回到神经网络之前，先看二维案例中的最小二乘法。假设测量点为 (<var>x</var><sub>i</sub>, <var>y</var><sub>i</sub>)，要拟合直线 <em>ŷ = ax + b</em>。直线对每个点给出预测 <em>ŷ</em><sub>i</sub>，观测值与预测值之差就是残差：</p>
    <div className="math-block" role="img" aria-label="Residual equation"><var>r</var><sub>i</sub> = <var>y</var><sub>i</sub> − ŷ<sub>i</sub> = <var>y</var><sub>i</sub> − (<var>a</var><var>x</var><sub>i</sub> + <var>b</var>)</div>
    <p>在图上，残差是数据点到直线的带符号竖直距离。直接相加会让正负误差彼此抵消，所以最小二乘法把每个残差平方后求和：</p>
    <div className="math-block" role="img" aria-label="Sum of squared errors"><var>S</var>(<var>a</var>, <var>b</var>) = Σ<sub>i=1</sub><sup>N</sup> [<var>y</var><sub>i</sub> − (<var>a</var><var>x</var><sub>i</sub> + <var>b</var>)]<sup>2</sup></div>
    <p>最佳拟合线对应使 <var>S</var> 最小的 <var>a</var> 与 <var>b</var>。平方既避免正负抵消，也会让大误差受到更强惩罚。它不是唯一的误差定义，但提供了可以代替肉眼判断的数值目标。</p>
    <p>把直线扩展为多项式后，同一问题可写成 <var>y</var> = <var>X</var>β + ε，其中 β 是待拟合系数，ε 是残差。多项式只适用于有限情况；周期或角向问题也可以使用 Fourier 级数、球谐函数或其他基函数，而拟合原则不变。</p>
    <p>回到神经网络，我们用多层函数 <var>f</var>(<var>x</var>; θ) 替代直线或多项式，θ 包含全部权重和偏置。常见的均方误差损失为：</p>
    <div className="math-block" role="img" aria-label="Mean squared error"><var>L</var>(θ) = <span>1 / <var>N</var></span> Σ<sub>i=1</sub><sup>N</sup> ‖<var>y</var><sub>i</sub> − <var>f</var>(<var>x</var><sub>i</sub>; θ)‖<sub>2</sub><sup>2</sup><span className="math-label">把同一个最小二乘思想用于复杂得多的拟合函数</span></div>
    <p>这就是普通曲线拟合与神经网络训练之间的桥梁：二维情形中，我们移动一条直线让残差变小；神经网络中，我们调整大量参数，让高维函数的损失变小。只是因为拟合对象已无法画出或解析求解，我们才需要数值优化。</p>
    <h2>训练如何改变模型</h2>
    <p>定义损失后，剩下的工作就是优化。反向传播计算损失对每个权重的梯度，优化器沿减小损失的方向更新参数。最简单的梯度下降形式为：</p>
    <div className="math-block" role="img" aria-label="Gradient descent update">θ<sub>k+1</sub> = θ<sub>k</sub> − η∇<sub>θ</sub><var>L</var>(θ<sub>k</sub>)</div>
    <p>网络在许多批训练数据上重复预测、计算损失、反向传播和更新参数。数学和规模可能令人望而生畏，但核心依然熟悉：写下模型、量化误差、优化它，同时不能失去预测新数据的能力。</p>
  </>;
}
export default NeuralNetworkIntroductionZh;
