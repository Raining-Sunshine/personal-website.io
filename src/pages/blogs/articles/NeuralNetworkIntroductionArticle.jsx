import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import { routes } from "../../../config/routes";

function NeuralNetworkIntroductionArticle({ navigate }) {
  const imageBase = `${import.meta.env.BASE_URL}modelling/neural-network-introduction/`;

  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: "Modelling", route: routes.modelling },
          { label: "Neural network introduction" },
        ]}
      />
      <article className="article-template">
        <div className="article-content">
          <p className="article-meta">August 23, 2026 / Modelling / Neural Network</p>
          <h1>How Does a Neural Network Work?</h1>
          <p className="article-subtitle">Starting from curve fitting, residuals, and a simple physics experiment</p>

          <p>
            Neural networks (NNs) are now taking everyone&apos;s attention. As a foundation of computer vision, large language models, and what we now call the AI industry, neural networks have played an important role in the technology field and even in scientific research. But how does a neural network actually function?
          </p>
          <p>
            Many lectures start from probability theory. That is important, but it can feel too far away from an actual understanding of what the model is doing. I am trying to illustrate neural networks in a simpler way, so let&apos;s start with a small experiment.
          </p>

          <h2>Start with a line</h2>
          <p>
            When you are doing some kind of physics experiment, you write down data. You change one parameter, obtain a result, and plot the two quantities in a simple figure.
          </p>
          <figure>
            <img className="article-photo article-photo-wide" src={`${imageBase}experimental-data.png`} alt="Red experimental data points following an approximately linear trend" />
            <figcaption>A simple set of experimental observations.</figcaption>
          </figure>
          <p>
            You will probably draw a line and try to put every point on it. If that is impossible, you let the points distribute as evenly as possible around the line. For this figure, you may conclude that the points are distributed around <em>y = x</em>.
          </p>
          <p>
            There, you have finished your first prediction. From a dataset, you found a rule followed by the data and then described that rule quantitatively. A neural network does something conceptually similar, although the function it learns can be vastly more complicated than a straight line.
          </p>

          <h2>From curve fitting to a neural network</h2>
          <p>
            Real-world data are usually not this simple. One sample may contain hundreds or millions of features, and the relation between input and output may be highly nonlinear. A neural network builds a flexible function by stacking layers. Each layer first performs a weighted sum and then applies a nonlinear activation:
          </p>
          <div className="math-block" role="img" aria-label="h equals sigma of W x plus b">
            <var>h</var> = σ(<var>W</var><var>x</var> + <var>b</var>)
          </div>
          <p>
            The weights <var>W</var> and biases <var>b</var> are the parameters adjusted during training. Once many layers are connected, the network can represent curves and surfaces that would be difficult to write down by hand.
          </p>
          <p>
            This is also where we often call a model large or small. Modern models can contain billions of parameters. Parameter count is not literally the dimensionality of the input data; instead, it is a rough description of the model&apos;s capacity. More parameters give the model more freedom, but they also make training, validation, and computational cost more important.
          </p>

          <h2>Training, validation, and test sets</h2>
          <p>
            When fitting a curve, the number of parameters matters. Take a polynomial related to a truncated Taylor expansion as a simple example: if the highest power is <var>x</var><sup>n</sup>, the model has <var>n</var> + 1 coefficients. We do not want the result to be too rough, but too much flexibility may lead to overfitting.
          </p>
          <figure>
            <img className="article-photo article-photo-wide" src={`${imageBase}overfitted-curve.png`} alt="A highly oscillating blue curve passing through every red training point" />
            <figcaption>The blue curve fits the known points almost perfectly, but its oscillations are not physically convincing.</figcaption>
          </figure>
          <p>
            The blue line describes all the shown dots, but it may fail badly when I generate another point. In neural networks, we call this overfitting. The model has remembered details and noise in the training data instead of learning a rule that generalizes.
          </p>
          <figure>
            <img className="article-photo article-photo-wide" src={`${imageBase}overfitting-with-validation-point.png`} alt="Overfitted curve shown together with a new green validation point" />
            <figcaption>A new point exposes the difference between fitting the training data and learning a general rule.</figcaption>
          </figure>
          <p>
            This is why we split data into three sets for the whole training process. The training set adjusts the model parameters. The validation set helps us choose model size, regularization, and other settings while watching for overfitting. The test set is kept aside until the end and is used to estimate the final performance of the selected model.
          </p>
          <figure>
            <img className="article-photo article-photo-wide" src={`${imageBase}train-validation-test-split.png`} alt="Data split into red training, green validation, and cyan test points" />
            <figcaption>Red points are training data, green points are validation data, and cyan points are test data.</figcaption>
          </figure>
          <p>
            The validation set does not directly correct the weights in the usual workflow. Instead, it guides decisions about the model and training process. Keeping the test set untouched is equally important; otherwise, we may unknowingly tune the model to the test itself.
          </p>

          <h2>Residuals and the loss function</h2>
          <p>
            For simple two-dimensional data, we can use our eyes and physical insight to judge whether the fit looks reasonable. For a high-dimensional model, we cannot inspect every direction or manually adjust millions of parameters. We need a number that quantifies how well the model fits.
          </p>
          <p>
            As many readers know, in physics and statistics we often use the least-squares method. The same idea can be used as a loss function in neural-network training. Imagine a curved surface in a high-dimensional space, with most data points lying near it. We calculate the difference between each prediction and the corresponding observation, then minimize the sum of the squared differences:
          </p>
          <div className="math-block" role="img" aria-label="Mean squared error loss equals one over N times the sum of squared residuals">
            <var>L</var>(θ) = <span>1 / <var>N</var></span> Σ<sub>i=1</sub><sup>N</sup> ‖<var>y</var><sub>i</sub> − <var>f</var>(<var>x</var><sub>i</sub>; θ)‖<sub>2</sub><sup>2</sup>
            <span className="math-label">prediction error → residual → squared loss</span>
          </div>
          <p>
            For an ordinary polynomial fit, the same relation can be written in matrix form. Each row of the design matrix contains the basis functions evaluated at one data point:
          </p>
          <div className="math-block" role="img" aria-label="y equals X beta plus epsilon, with a polynomial design matrix">
            <var>y</var> = <var>X</var>β + ε, &nbsp;
            <var>X</var> =
            <span className="matrix" aria-hidden="true">
              <span>1</span><span><var>x</var><sub>1</sub></span><span><var>x</var><sub>1</sub><sup>2</sup></span><span>…</span>
              <span>1</span><span><var>x</var><sub>2</sub></span><span><var>x</var><sub>2</sub><sup>2</sup></span><span>…</span>
              <span>⋮</span><span>⋮</span><span>⋮</span><span>⋱</span>
              <span>1</span><span><var>x</var><sub>N</sub></span><span><var>x</var><sub>N</sub><sup>2</sup></span><span>…</span>
            </span>
          </div>
          <p>
            A Taylor series is suitable only for a limited range and situation. For wider ranges or different physical properties, we may use Fourier series, spherical harmonics, or other basis functions. A neural network goes one step further: instead of fixing every basis function in advance, it learns a hierarchy of useful representations from the data.
          </p>

          <h2>How training changes the model</h2>
          <p>
            After defining a loss, the remaining job is optimization. Backpropagation calculates how sensitive the loss is to each weight, and an optimizer updates the parameters in the direction that reduces the loss. In the simplest gradient-descent form:
          </p>
          <div className="math-block" role="img" aria-label="theta at the next step equals theta minus learning rate times the gradient of the loss">
            θ<sub>k+1</sub> = θ<sub>k</sub> − η∇<sub>θ</sub><var>L</var>(θ<sub>k</sub>)
          </div>
          <p>
            The network repeats this process over many batches of training data. It predicts, measures the residual, propagates the error backward, and updates its parameters. The mathematics and scale can become intimidating, but the core idea remains familiar: write down a model, quantify its error, and optimize it without losing the ability to predict new data.
          </p>
          <p>
            That is the simple picture I use to understand a neural network. It is not magic, and it is not merely a huge lookup table. It is a flexible numerical model whose parameters are learned from data and whose credibility still depends on validation, testing, and physical insight.
          </p>
        </div>
      </article>
    </main>
  );
}

export default NeuralNetworkIntroductionArticle;
