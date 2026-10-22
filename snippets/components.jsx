// Shared page components. Import in a page with:
//   import { AGENT, PageMeta, LifecycleStepper } from "/snippets/components.jsx";
// Styles live in /style.css (classes prefixed `sk-`).

// The AI assistant's product name. Never hard-code it in a page (SPEC-documentation §3.4).
export const AGENT = "Skaletek Agent";

// Placeholder conversion links (SPEC-documentation §1.4). Replace when the real URLs exist.
// PreviewNotice and TryIt repeat them: Mintlify evaluates each export on its own.
export const LINKS = {
  trial: "https://app.skaletek.example/signup",
  trialRemittance: "https://app.skaletek.example/signup?pack=remittance",
  demo: "https://skaletek.example/book-a-demo",
};

// "Who is this for" badge row, reading time and availability (§2.2, §10.2).
// <PageMeta tracks={["operations"]} minutes={5} availability="preview" />
export const PageMeta = ({ tracks = [], minutes, availability }) => {
  const TRACKS = {
    operations: { label: "Compliance & Operations", href: "/get-started/tracks/operations" },
    configure: { label: "Configure", href: "/get-started/tracks/configure" },
    build: { label: "Build", href: "/get-started/tracks/build" },
  };
  const AVAILABILITY = { preview: "Preview", "coming-soon": "Coming soon" };
  return (
    <div className="sk-meta not-prose">
      {tracks.map((t) => (
        <a key={t} className={`sk-badge sk-track-${t}`} href={TRACKS[t].href}>
          {TRACKS[t].label}
        </a>
      ))}
      {AVAILABILITY[availability] && (
        <span className="sk-badge sk-availability">{AVAILABILITY[availability]}</span>
      )}
      {minutes && <span className="sk-reading-time">{minutes} min read</span>}
    </div>
  );
};

// "Where am I in the lifecycle" strip for Guides pages (§3.5).
// <LifecycleStepper current="monitor" />
export const LifecycleStepper = ({ current }) => {
  const STAGES = [
    { key: "onboard", label: "Onboard", href: "/guides/onboarding/overview" },
    { key: "screen", label: "Screen", href: "/guides/screening/overview" },
    { key: "monitor", label: "Monitor", href: "/guides/monitoring/overview" },
    { key: "investigate", label: "Investigate", href: "/guides/alerts/overview" },
    { key: "report", label: "Report", href: "/guides/reporting/overview" },
    { key: "comply", label: "Stay compliant", href: "/guides/regulatory-compliance/overview" },
  ];
  return (
    <nav className="sk-stepper not-prose" aria-label="Customer lifecycle">
      <ol>
        {STAGES.map((s, i) => (
          <li key={s.key} className={s.key === current ? "sk-step sk-step-current" : "sk-step"}>
            <a href={s.href} aria-current={s.key === current ? "step" : undefined}>
              <span className="sk-step-number">{i + 1}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// The once-per-page disclaimer on pages that use the remittance example (§4.2).
export const ExampleNote = () => {
  return (
    <p className="sk-example-note">
      Teranga Transfer and all people in this example are fictional. Regulatory thresholds are
      simplified for illustration; check the current texts.
    </p>
  );
};

// Shown on pages for features that are not generally available yet (§10.2).
export const PreviewNotice = ({ feature = "This feature" }) => {
  return (
    <div className="sk-callout sk-callout-preview" role="note">
      <p className="sk-callout-title">Preview</p>
      <p>
        {feature} is in preview and may change before general release. To request access for your
        organization, <a href="https://skaletek.example/book-a-demo">contact us</a>.
      </p>
    </div>
  );
};

// "Try it" box (§4.5, §5.3). Steps go in children.
export const TryIt = ({ children, pack = true }) => {
  return (
    <div className="sk-callout sk-callout-tryit" role="note">
      <p className="sk-callout-title">Try it</p>
      {children}
      <p className="sk-callout-cta">
        No account yet?{" "}
        <a href={pack ? "https://app.skaletek.example/signup?pack=remittance" : "https://app.skaletek.example/signup"}>
          Start free trial{pack ? " with this example" : ""}
        </a>
      </p>
    </div>
  );
};

// "Key takeaway" box at the end of a tutorial chapter (§4.5, §5.3).
export const KeyTakeaway = ({ children }) => {
  return (
    <div className="sk-callout sk-callout-takeaway" role="note">
      <p className="sk-callout-title">Key takeaway</p>
      {children}
    </div>
  );
};

// "Important" callout: a compliance consequence (§5.3).
export const Important = ({ children }) => {
  return (
    <div className="sk-callout sk-callout-important" role="note">
      <p className="sk-callout-title">Important</p>
      {children}
    </div>
  );
};

// A product screenshot (§8.1). Without `src` it renders a placeholder frame until the capture exists.
// <Screenshot name="alerts-explanation-open" alt="..." src="/images/screenshots/....png" />
export const Screenshot = ({ name, alt, src }) => {
  if (src) {
    return (
      <figure className="sk-screenshot not-prose">
        <img src={src} alt={alt} loading="lazy" />
      </figure>
    );
  }
  return (
    <figure className="sk-screenshot-placeholder not-prose" role="img" aria-label={alt}>
      <span className="sk-screenshot-label">Screenshot</span>
      <span>{alt}</span>
    </figure>
  );
};
