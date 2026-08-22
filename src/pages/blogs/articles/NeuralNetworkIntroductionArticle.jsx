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
            The point I want to emphasize is that training a neural network is still a kind of curve fitting. In the simple experiment above, we choose a function such as <em>ŷ = ax + b</em>, change <em>a</em> and <em>b</em>, and look for the line that stays closest to the observations. In a neural network, we again choose a function, adjust its parameters, and try to make its predictions stay close to the data. The basic task has not changed.
          </p>
          <p>
            What changes is the scale and the shape of the function. Real-world data may contain hundreds or millions of input features, several outputs, and strongly nonlinear relations. The “curve” is therefore no longer a line that we can draw on paper. It may be a surface in a high-dimensional space, or a decision boundary separating different classes. We cannot see that surface directly, but numerically we can fit it in much the same way.
          </p>
          <p>
            A neural network constructs this flexible fitting function by stacking layers. Each layer performs a weighted sum and then applies a nonlinear activation:
          </p>
          <div className="math-block" role="img" aria-label="h equals sigma of W x plus b">
            <var>h</var> = σ(<var>W</var><var>x</var> + <var>b</var>)
          </div>
          <p>
            The weights <var>W</var> and biases <var>b</var> play a role similar to the coefficients in an ordinary fitting equation. Once many layers are connected, these parameters describe curves and surfaces that would be difficult to write down by hand. A forward pass evaluates the current fitted function; the loss measures how far it is from the known data; backpropagation and the optimizer then move the parameters toward a better fit.
          </p>
          <p>
            Even classification can be understood through this picture. Instead of fitting a line directly to a measured value, the network fits class scores or probabilities and places a boundary between groups of samples. Neural-network training is therefore not a completely different idea from curve fitting. It is curve fitting with a much more expressive function, many more parameters, and geometry that is usually too high-dimensional for us to draw.
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
            If we judge the model only by the points used to fit it, the blue curve appears excellent: every training residual is almost zero. The new green point tells a different story. It represents data that the fitting process has not seen, and it exposes whether the learned rule can extend beyond the examples it has memorized. This is why one dataset must play several different roles rather than being used as one undivided collection.
          </p>
          <figure>
            <img className="article-photo article-photo-wide" src={`${imageBase}train-validation-test-split.png`} alt="Data split into red training, green validation, and cyan test points" />
            <figcaption>Red points are training data, green points are validation data, and cyan points are test data.</figcaption>
          </figure>
          <p>
            The <strong>training set</strong> is the part repeatedly shown to the optimizer. Predictions and residuals are calculated on these samples, and backpropagation uses them to update the weights and biases. A model can always report an impressive training error if it is sufficiently flexible, so training performance alone cannot tell us whether the model has learned a transferable rule.
          </p>
          <p>
            The <strong>validation set</strong> is not normally used to update the weights. Instead, we evaluate it during model development and use it to choose decisions outside the fitted parameters: the number of layers, the number of neurons, learning rate, regularization strength, training duration, or the point at which early stopping should occur. If training loss keeps decreasing while validation loss starts increasing, the model is probably beginning to overfit.
          </p>
          <p>
            The <strong>test set</strong> is the final examination. It should remain untouched while we design the model and should ideally be evaluated only after the model and training procedure have been fixed. If we repeatedly inspect the test result and modify the model in response, the test set quietly becomes another validation set, and its reported performance becomes optimistic.
          </p>
          <p>
            All three sets should represent the problem we actually want to solve. Their distributions should be comparable, while duplicated or strongly related samples must not leak across the split. For time-dependent experiments, repeated measurements, or data collected from several specimens, a random point-by-point split may be misleading; splitting by time, specimen, batch, or experimental condition can provide a more honest test of generalization.
          </p>

          <h2>Residuals and the loss function</h2>
          <p>
            Before returning to neural networks, let us first look at the least-squares method in the two-dimensional example. Suppose the measured points are (<var>x</var><sub>i</sub>, <var>y</var><sub>i</sub>) and we want to fit a straight line <em>ŷ = ax + b</em>. For each point, the fitted line gives a prediction <em>ŷ</em><sub>i</sub>. The difference between the observation and prediction is the residual:
          </p>
          <div className="math-block" role="img" aria-label="Residual r i equals y i minus a x i plus b">
            <var>r</var><sub>i</sub> = <var>y</var><sub>i</sub> − ŷ<sub>i</sub> = <var>y</var><sub>i</sub> − (<var>a</var><var>x</var><sub>i</sub> + <var>b</var>)
          </div>
          <p>
            On the plot, this residual is the vertical distance from a point to the line, with a positive or negative sign. Simply adding residuals is not useful because positive and negative errors may cancel each other. Least squares therefore squares every residual and adds them together:
          </p>
          <div className="math-block" role="img" aria-label="Sum of squared errors equals the sum of squared residuals">
            <var>S</var>(<var>a</var>, <var>b</var>) = Σ<sub>i=1</sub><sup>N</sup> <var>r</var><sub>i</sub><sup>2</sup> = Σ<sub>i=1</sub><sup>N</sup> [<var>y</var><sub>i</sub> − (<var>a</var><var>x</var><sub>i</sub> + <var>b</var>)]<sup>2</sup>
          </div>
          <p>
            The best-fit line is the pair of <var>a</var> and <var>b</var> that minimizes <var>S</var>. Squaring prevents cancellation and makes a large error more expensive than several small errors. It is not the only possible definition of error, but it gives us a clear numerical target that can replace visual judgment.
          </p>
          <p>
            We can extend the line to a polynomial and write the same fitting problem in matrix form. Each row of the design matrix contains the chosen basis functions evaluated at one data point:
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
            In this expression, β contains the coefficients we want to fit and ε contains the residuals. A Taylor or polynomial basis is suitable only for a limited range and situation. For periodic or angular problems, we may instead use Fourier series, spherical harmonics, or other basis functions. The fitting principle remains the same even when the basis changes.
          </p>
          <p>
            Now return to a neural network. We replace the visible line or polynomial with a multilayer function <var>f</var>(<var>x</var>; θ), where θ collects all weights and biases. For one output, the residual is still “measurement minus prediction.” For many outputs, it becomes a vector. A common neural-network loss is the mean squared residual:
          </p>
          <div className="math-block" role="img" aria-label="Mean squared error loss equals one over N times the sum of squared residuals">
            <var>L</var>(θ) = <span>1 / <var>N</var></span> Σ<sub>i=1</sub><sup>N</sup> ‖<var>y</var><sub>i</sub> − <var>f</var>(<var>x</var><sub>i</sub>; θ)‖<sub>2</sub><sup>2</sup>
            <span className="math-label">the same least-squares idea, applied to a much more complicated fitting function</span>
          </div>
          <p>
            This is the bridge from ordinary curve fitting to neural-network training. In two dimensions we move a line until its residuals are small. In a neural network we move millions or billions of parameters until a high-dimensional function produces small residuals. We need numerical optimization because we can no longer draw the fitted object or solve every model analytically, but the quantity being minimized comes from the same idea.
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
