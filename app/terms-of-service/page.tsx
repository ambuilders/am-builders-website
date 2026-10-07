import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "AM Builders Terms of Service: the rules that govern your use of ambuilders.ca, including how our quotes and estimates work and how these terms relate to your construction contract.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <div className="terms-wrap">
      <header className="site">
        <div className="inner">
          <p className="eyebrow">AM Builders</p>
          <h1>Terms of Service</h1>
          <p className="lede">
            These terms govern your use of ambuilders.ca. Please read them before browsing our
            site, requesting a quote, or submitting your information to us.
          </p>
          <div className="meta-row">
            <span>
              <strong>Effective date:</strong> August 27, 2026
            </span>
            <span>
              <strong>Applies to:</strong> ambuilders.ca and our online quote and consultation
              requests
            </span>
            <span>
              <strong>Governed by:</strong> the laws of Alberta, Canada
            </span>
          </div>
        </div>
      </header>

      <main>
        <nav className="toc" aria-label="Table of contents">
          <h2>On this page</h2>
          <ol>
            <li>
              <a href="#agreement">Agreement to these terms</a>
            </li>
            <li>
              <a href="#who-we-are">Who we are</a>
            </li>
            <li>
              <a href="#eligibility">Eligibility and permitted use</a>
            </li>
            <li>
              <a href="#prohibited">Prohibited uses</a>
            </li>
            <li>
              <a href="#quotes">Quotes, estimates &amp; consultations</a>
            </li>
            <li>
              <a href="#contract">Relationship to your construction contract</a>
            </li>
            <li>
              <a href="#content">Website content &amp; intellectual property</a>
            </li>
            <li>
              <a href="#submissions">Information you submit to us</a>
            </li>
            <li>
              <a href="#third-party">Third-party links &amp; services</a>
            </li>
            <li>
              <a href="#no-advice">No professional advice</a>
            </li>
            <li>
              <a href="#warranties">Disclaimer of warranties</a>
            </li>
            <li>
              <a href="#liability">Limitation of liability</a>
            </li>
            <li>
              <a href="#indemnity">Indemnification</a>
            </li>
            <li>
              <a href="#law">Governing law &amp; disputes</a>
            </li>
            <li>
              <a href="#changes">Changes to these terms</a>
            </li>
            <li>
              <a href="#general">General terms</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
          </ol>
        </nav>

        <section id="agreement">
          <h2>
            <span className="num">01</span> Agreement to these terms
          </h2>
          <p>
            By visiting or using ambuilders.ca (the &quot;Website&quot;), submitting a quote
            request, or otherwise interacting with our online forms, you agree to be bound by
            these Terms of Service (&quot;Terms&quot;). If you don&apos;t agree with these Terms,
            please don&apos;t use the Website.
          </p>
          <p>
            These Terms govern your use of the Website only. They are separate from, and
            don&apos;t replace, any written contract you sign with us for actual construction,
            renovation, or development work — see{" "}
            <a href="#contract">Relationship to your construction contract</a> below for how the
            two fit together.
          </p>
        </section>

        <section id="who-we-are">
          <h2>
            <span className="num">02</span> Who we are
          </h2>
          <p>
            AM Builders (&quot;AM Builders,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) is a licensed general contractor based in Airdrie, Alberta, providing
            basement development, home renovations, new home construction, and commercial
            construction services to homeowners and businesses in Calgary, Airdrie, Chestermere,
            Cochrane, and the surrounding communities. Details on how we handle personal
            information are set out in our <Link href="/privacy-policy">Privacy Policy</Link>,
            which forms part of your agreement with us alongside these Terms.
          </p>
        </section>

        <section id="eligibility">
          <h2>
            <span className="num">03</span> Eligibility and permitted use
          </h2>
          <p>
            You may use the Website to learn about our services, browse our completed projects,
            and submit an inquiry or request for a free quote or consultation. You must be at
            least 18 years old, or have the involvement of a parent or guardian, to submit a quote
            request or enter into any agreement with us, since our services relate to property you
            must have the legal authority to have work performed on.
          </p>
          <p>
            You agree to provide accurate, current, and complete information when you contact us
            or request a quote, and to update that information if it changes while we&apos;re in
            touch about your project.
          </p>
        </section>

        <section id="prohibited">
          <h2>
            <span className="num">04</span> Prohibited uses
          </h2>
          <p>When using the Website, you agree not to:</p>
          <ul>
            <li>
              Use the Website for any unlawful purpose, or in a way that violates any applicable
              federal, provincial, or municipal law or regulation;
            </li>
            <li>Submit false, misleading, or fraudulent information through our contact or quote forms;</li>
            <li>
              Attempt to gain unauthorized access to the Website, our servers, or any systems or
              networks connected to the Website;
            </li>
            <li>
              Introduce viruses, malware, or any other code intended to damage or disrupt the
              Website or its underlying systems;
            </li>
            <li>
              Scrape, harvest, or systematically extract content or data from the Website using
              automated means, without our prior written permission;
            </li>
            <li>
              Copy, reproduce, republish, or create derivative works from Website content for
              commercial purposes without our written consent; or
            </li>
            <li>
              Impersonate any person or entity, or misrepresent your affiliation with any person or
              entity, when contacting us through the Website.
            </li>
          </ul>
        </section>

        <section id="quotes">
          <h2>
            <span className="num">05</span> Quotes, estimates &amp; consultations
          </h2>
          <p>
            We provide free, no-obligation estimates as described on the Website. Please keep the
            following in mind when you request one:
          </p>
          <ul>
            <li>
              <strong>Initial estimates are non-binding.</strong> Any pricing, timeline, or scope
              information provided through the Website, over the phone, or by email before a
              formal site assessment is a preliminary, good-faith estimate only. It is not a
              binding offer or a quote you can rely on for budgeting purposes until confirmed in
              writing after we&apos;ve assessed your property in person.
            </li>
            <li>
              <strong>Final pricing depends on a site visit.</strong> Actual costs depend on
              factors we can only properly assess on site — including existing conditions,
              moisture, ceiling height, mechanical and electrical systems, permit requirements, and
              the finishing level you choose. A detailed, itemized estimate is provided before any
              work begins, as described on our Contact page.
            </li>
            <li>
              <strong>Timelines are estimates, not guarantees.</strong> Project timelines
              referenced on the Website (for example, typical basement development timelines) are
              general estimates based on past projects. Actual timelines vary by project scope and
              municipal inspection scheduling, and will be addressed specifically in your project
              agreement.
            </li>
            <li>
              <strong>Submitting a quote request doesn&apos;t create a contract.</strong>{" "}
              Requesting a quote, consultation, or estimate through the Website doesn&apos;t
              obligate either you or AM Builders to proceed with a project. A binding agreement is
              only formed when both parties sign a separate written construction contract.
            </li>
          </ul>
        </section>

        <section id="contract">
          <h2>
            <span className="num">06</span> Relationship to your construction contract
          </h2>
          <div className="callout">
            <strong>These Terms govern the Website. They do not govern your construction project.</strong>{" "}
            If you engage AM Builders for basement development, renovation, new home construction,
            or commercial construction work, that work will be governed by a separate written
            contract signed by both parties, which will set out the agreed scope, price, schedule,
            payment terms, warranty, and other project-specific terms.
          </div>
          <p>
            If anything in these Terms conflicts with a signed construction contract between you
            and AM Builders, the construction contract controls for matters relating to the actual
            project work. These Terms continue to govern your use of the Website itself.
          </p>
        </section>

        <section id="content">
          <h2>
            <span className="num">07</span> Website content &amp; intellectual property
          </h2>
          <p>
            All content on the Website — including text, project photographs, logos, graphics,
            page layouts, and the overall look and feel of the site — is owned by AM Builders or
            used with permission, and is protected by Canadian and international copyright and
            trademark law.
          </p>
          <p>
            Project photographs featured on the Website are shown with the permission of the
            relevant homeowners or, where a project has not yet been fully completed or permission
            has not been obtained, may be edited or omitted at our discretion. You may view and
            share pages of the Website for personal, non-commercial purposes, but you may not
            reproduce, redistribute, or use our photographs, text, or branding for commercial
            purposes without our prior written consent.
          </p>
        </section>

        <section id="submissions">
          <h2>
            <span className="num">08</span> Information you submit to us
          </h2>
          <p>
            When you submit information through our quote request or contact forms — including
            project descriptions, photos, or sketches — you confirm that you have the right to
            share that information and any accompanying images (for example, that you own or have
            permission to make changes to the property described).
          </p>
          <p>
            You grant us a limited license to use the information and materials you submit for the
            purpose of responding to your inquiry, preparing an estimate, and, if you become a
            client, delivering your project. We handle this information in accordance with our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>. Please don&apos;t submit sensitive
            personal information (such as financial account numbers or government identification)
            through our website forms; our team will request anything sensitive we genuinely need
            through a more secure channel once you&apos;re a client.
          </p>
        </section>

        <section id="third-party">
          <h2>
            <span className="num">09</span> Third-party links &amp; services
          </h2>
          <p>
            The Website may link to third-party websites, and our quote request form is processed
            using a third-party platform (GoHighLevel, operated by HighLevel Inc.). We don&apos;t
            control these third parties and aren&apos;t responsible for their content,
            availability, or practices. Your use of any third-party website or service is subject
            to that party&apos;s own terms and privacy policy.
          </p>
        </section>

        <section id="no-advice">
          <h2>
            <span className="num">10</span> No professional advice
          </h2>
          <p>
            General information on the Website about topics such as permitting, the Alberta
            Building Code, egress requirements, or typical project costs and timelines is provided
            for general informational purposes only. It is not a substitute for a site-specific
            assessment by our team, and it should not be relied on as construction, engineering,
            legal, or permitting advice for your specific property. Requirements can vary by
            property, municipality, and current code, so please confirm specifics with us directly
            before making decisions based on Website content.
          </p>
        </section>

        <section id="warranties">
          <h2>
            <span className="num">11</span> Disclaimer of warranties
          </h2>
          <p>
            The Website and its content are provided &quot;as is&quot; and &quot;as
            available,&quot; without warranties of any kind, whether express or implied,
            including, to the extent permitted by law, implied warranties of merchantability,
            fitness for a particular purpose, and non-infringement. We do our best to keep Website
            information accurate and current, but we don&apos;t warrant that the Website will be
            uninterrupted, error-free, or completely free of viruses or other harmful components.
          </p>
          <p>
            This section does not affect any warranty we provide on completed construction work
            under a signed project contract, which is addressed separately in that contract.
          </p>
        </section>

        <section id="liability">
          <h2>
            <span className="num">12</span> Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by law, AM Builders will not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of
            profits, data, or business opportunity, arising out of or related to your use of, or
            inability to use, the Website, even if we&apos;ve been advised of the possibility of
            such damages.
          </p>
          <p>
            Nothing in these Terms limits our liability in ways not permitted by applicable
            Alberta or Canadian law, or affects any liability we may have under a separate signed
            construction contract for completed project work.
          </p>
        </section>

        <section id="indemnity">
          <h2>
            <span className="num">13</span> Indemnification
          </h2>
          <p>
            You agree to indemnify and hold AM Builders, its owners, employees, and trade partners
            harmless from any claim, loss, liability, or expense (including reasonable legal fees)
            arising from your misuse of the Website, your violation of these Terms, or your
            violation of any law or the rights of a third party.
          </p>
        </section>

        <section id="law">
          <h2>
            <span className="num">14</span> Governing law &amp; disputes
          </h2>
          <p>
            These Terms are governed by the laws of the Province of Alberta and the federal laws
            of Canada applicable in Alberta, without regard to conflict-of-law principles. You
            agree that any dispute arising out of or relating to these Terms or your use of the
            Website will be subject to the exclusive jurisdiction of the courts located in
            Calgary, Alberta.
          </p>
          <p>
            Disputes relating to a completed or in-progress construction project are governed by
            the dispute resolution terms in your signed construction contract, not by this
            section.
          </p>
        </section>

        <section id="changes">
          <h2>
            <span className="num">15</span> Changes to these terms
          </h2>
          <p>
            We may update these Terms from time to time to reflect changes in our services, our
            website, or the law. When we do, we&apos;ll update the effective date at the top of
            this page. Continuing to use the Website after an update means you accept the revised
            Terms. We encourage you to review this page occasionally.
          </p>
        </section>

        <section id="general">
          <h2>
            <span className="num">16</span> General terms
          </h2>
          <ul>
            <li>
              <strong>Entire agreement.</strong> These Terms, together with our Privacy Policy,
              make up the entire agreement between you and AM Builders regarding your use of the
              Website, and supersede any prior understanding about that subject.
            </li>
            <li>
              <strong>Severability.</strong> If any provision of these Terms is found to be
              unenforceable, that provision will be limited or removed to the minimum extent
              necessary, and the remaining provisions will stay in full effect.
            </li>
            <li>
              <strong>No waiver.</strong> Our failure to enforce any part of these Terms is not a
              waiver of our right to enforce it later.
            </li>
            <li>
              <strong>Assignment.</strong> You may not assign or transfer your rights under these
              Terms without our written consent. We may assign these Terms in connection with a
              merger, acquisition, or sale of assets.
            </li>
          </ul>
        </section>

        <section id="contact">
          <h2>
            <span className="num">17</span> Contact us
          </h2>
          <div className="contact-card">
            <h3>AM Builders</h3>
            <p style={{ marginBottom: "6px" }}>Questions about these Terms? Reach us at:</p>
            <p style={{ marginBottom: "2px" }}>
              Email: <a href="mailto:info@ambuilders.ca">info@ambuilders.ca</a>
            </p>
            <p style={{ marginBottom: 0 }}>
              Website:{" "}
              <a href="https://www.ambuilders.ca" target="_blank" rel="noopener">
                ambuilders.ca
              </a>
            </p>
          </div>
          <a className="back-top" href="#agreement">
            &uarr; Back to top of page
          </a>
        </section>
      </main>

      <footer className="site">
        <p>
          &copy; 2026 AM Builders. Licensed General Contractor — Alberta. These Terms of Service
          are provided for informational purposes and do not constitute legal advice. See also our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </footer>

      <style>{`
        .terms-wrap {
          --navy: #152238;
          --navy-2: #1f3350;
          --amber: #b5652a;
          --amber-2: #8f4f20;
          --paper: #fbfaf8;
          --ink: #1c1f24;
          --ink-soft: #4a5160;
          --line: #e4e0d8;
          --card: #ffffff;
          --radius: 10px;

          background: var(--paper);
          color: var(--ink);
          font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial,
            sans-serif;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
        }
        .terms-wrap * {
          box-sizing: border-box;
        }
        .terms-wrap a {
          color: var(--amber-2);
          text-decoration: underline;
        }
        .terms-wrap a:hover {
          color: var(--amber);
        }
        .terms-wrap a:focus-visible {
          outline: 3px solid var(--amber);
          outline-offset: 2px;
        }

        .terms-wrap header.site {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%);
          color: #fff;
          padding: 56px 24px 64px;
        }
        .terms-wrap header.site .inner {
          max-width: 820px;
          margin: 0 auto;
        }
        .terms-wrap .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 12.5px;
          font-weight: 600;
          color: #d9ad82;
          margin: 0 0 14px;
        }
        .terms-wrap header.site h1 {
          font-size: clamp(30px, 4vw, 42px);
          line-height: 1.15;
          margin: 0 0 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .terms-wrap header.site p.lede {
          font-size: 16.5px;
          color: #cfd6e2;
          max-width: 640px;
          margin: 0 0 6px;
        }
        .terms-wrap .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 22px;
          margin-top: 22px;
          font-size: 13.5px;
          color: #b9c2d4;
        }
        .terms-wrap .meta-row strong {
          color: #fff;
          font-weight: 600;
        }

        .terms-wrap main {
          max-width: 820px;
          margin: 0 auto;
          padding: 0 24px 100px;
        }

        .terms-wrap nav.toc {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 22px 26px;
          margin: -32px 0 44px;
          box-shadow: 0 8px 24px rgba(21, 34, 56, 0.08);
        }
        .terms-wrap nav.toc h2 {
          font-size: 12.5px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--amber-2);
          margin: 0 0 12px;
          font-weight: 700;
        }
        .terms-wrap nav.toc ol {
          margin: 0;
          padding-left: 20px;
          columns: 2;
          column-gap: 28px;
          font-size: 14.5px;
          list-style: decimal;
        }
        .terms-wrap nav.toc li {
          margin-bottom: 8px;
          break-inside: avoid;
        }
        .terms-wrap nav.toc a {
          text-decoration: none;
          color: var(--ink);
        }
        .terms-wrap nav.toc a:hover {
          color: var(--amber-2);
          text-decoration: underline;
        }

        .terms-wrap section {
          margin-bottom: 44px;
          scroll-margin-top: 20px;
        }
        .terms-wrap section h2 {
          font-size: 21px;
          font-weight: 700;
          color: var(--navy);
          border-bottom: 2px solid var(--line);
          padding-bottom: 10px;
          margin: 0 0 16px;
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .terms-wrap section h2 .num {
          color: var(--amber-2);
          font-variant-numeric: tabular-nums;
          font-size: 15px;
          font-weight: 700;
        }
        .terms-wrap section h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          margin: 22px 0 8px;
        }
        .terms-wrap p {
          margin: 0 0 14px;
          color: var(--ink-soft);
          font-size: 15.5px;
        }
        .terms-wrap strong {
          color: var(--ink);
        }
        .terms-wrap ul,
        .terms-wrap ol.plain {
          margin: 0 0 14px;
          padding-left: 22px;
          color: var(--ink-soft);
          font-size: 15.5px;
        }
        .terms-wrap ul {
          list-style: disc;
        }
        .terms-wrap li {
          margin-bottom: 7px;
        }

        .terms-wrap .callout {
          background: #fbf3ea;
          border: 1px solid #edd9bf;
          border-left: 4px solid var(--amber-2);
          border-radius: 8px;
          padding: 16px 18px;
          margin: 18px 0;
          font-size: 14.5px;
          color: #5a4326;
        }
        .terms-wrap .callout strong {
          color: #3f2f18;
        }

        .terms-wrap .contact-card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px 26px;
          box-shadow: 0 4px 14px rgba(21, 34, 56, 0.05);
        }
        .terms-wrap .contact-card h3 {
          margin-top: 0;
        }
        .terms-wrap .contact-card a {
          font-weight: 600;
          text-decoration: none;
        }
        .terms-wrap .contact-card a:hover {
          text-decoration: underline;
        }

        .terms-wrap footer.site {
          border-top: 1px solid var(--line);
          padding: 28px 24px 40px;
          text-align: center;
          color: #8a8f99;
          font-size: 13px;
        }
        .terms-wrap footer.site a {
          color: #8a8f99;
          text-decoration: underline;
        }

        .terms-wrap .back-top {
          display: inline-block;
          margin-top: 8px;
          font-size: 13px;
          color: var(--amber-2);
          text-decoration: none;
        }

        @media (max-width: 600px) {
          .terms-wrap nav.toc ol {
            columns: 1;
          }
          .terms-wrap nav.toc {
            margin-top: -20px;
          }
          .terms-wrap header.site {
            padding: 44px 20px 56px;
          }
        }
      `}</style>
    </div>
  );
}
