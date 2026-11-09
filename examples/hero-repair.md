# Example: Replace a generic AI landing-page hero

*Illustrative example. Not a screenshot, user study or measured outcome.*

## Before

A typical AI-generated landing page follows this structure:

```jsx
<section className="mx-auto max-w-5xl py-24 text-center">
  <h1 className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
    Build the future with AI
  </h1>
  <p>Unlock your potential with our innovative platform.</p>
  <div className="grid grid-cols-3 gap-6">
    <FeatureCard title="Fast" />
    <FeatureCard title="Powerful" />
    <FeatureCard title="Simple" />
  </div>
</section>
```

What's wrong? Not the existence of a gradient or cards. This hero could be for almost any product. It has no identifiable job, no actual evidence and no specific next action.

## Three genuinely different choices

**A. Product Evidence**

One readable, authentic product interface occupies most of the screen. To its side: a concrete task headline, a short explanation and one action. The next section walks through one real task using existing product states. This works when the interface itself is the proof.

**B. Editorial**

An unmistakable statement grounded in one specific user problem, balanced against a real example or carefully cropped photo. Fewer competing interface elements. This works when the audience needs confidence and context before a demo.

**C. Workflow Narrative**

The page opens with a real before-state, then progressively reveals a three-step transformation into the outcome. Motion exists to explain state changes, with a static fallback for reduced motion. This works when the differentiator is the process.

Each choice changes information hierarchy and the visual subject. Changing the gradient to orange does not constitute a fourth choice.

## After selecting A

Build with **actual product copy and screenshots**, not fabricated labels. The component structure may be:

```jsx
<main>
  <section aria-labelledby="product-title">
    <div className="hero-copy">
      <p className="eyebrow">Search · Pick · Ship</p>
      <h1 id="product-title">Find the right section. Keep the code.</h1>
      <p>Search ready-made React sections and adapt them to your project.</p>
      <a href="/sections">Explore sections</a>
    </div>
    <figure className="hero-product">
      {/* Use a verified real product preview from the project */}
    </figure>
  </section>
  <section aria-labelledby="workflow-title">
    <h2 id="workflow-title">One component, from search to shipping</h2>
    {/* Use real search/code/implementation states */}
  </section>
</main>
```

This is only a **structural illustration**, not finished production code. Real implementation must include appropriate CSS, image alternatives, correct routes and browser QA.
