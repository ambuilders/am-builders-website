import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "AM Builders privacy policy: how we collect, use, share, and protect your personal information under Alberta's Personal Information Protection Act and Canada's PIPEDA.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-wrap">
      <header className="site">
        <div className="inner">
          <p className="eyebrow">AM Builders</p>
          <h1>Privacy Policy</h1>
          <p className="lede">
            This policy explains what personal information AM Builders collects through
            ambuilders.ca and our project work, why we collect it, and the choices and rights you
            have over it.
          </p>
          <div className="meta-row">
            <span>
              <strong>Effective date:</strong> August 27, 2026
            </span>
            <span>
              <strong>Applies to:</strong> ambuilders.ca and our project inquiry, quote, and
              consultation process
            </span>
            <span>
              <strong>Governed by:</strong> Alberta&apos;s Personal Information Protection Act
              (PIPA) and, where applicable, Canada&apos;s PIPEDA
            </span>
          </div>
        </div>
      </header>

      <main>
        <nav className="toc" aria-label="Table of contents">
          <h2>On this page</h2>
          <ol>
            <li>
              <a href="#who-we-are">Who we are</a>
            </li>
            <li>
              <a href="#info-we-collect">Information we collect</a>
            </li>
            <li>
              <a href="#how-we-collect">How we collect it</a>
            </li>
            <li>
              <a href="#how-we-use">How we use your information</a>
            </li>
            <li>
              <a href="#cookies">Cookies and similar technologies</a>
            </li>
            <li>
              <a href="#sharing">How we share your information</a>
            </li>
            <li>
              <a href="#cross-border">Cross-border data transfer</a>
            </li>
            <li>
              <a href="#retention">How long we keep it</a>
            </li>
            <li>
              <a href="#your-rights">Your rights and choices</a>
            </li>
            <li>
              <a href="#security">How we protect your information</a>
            </li>
            <li>
              <a href="#children">Children&apos;s privacy</a>
            </li>
            <li>
              <a href="#other-sites">Links to other websites</a>
            </li>
            <li>
              <a href="#changes">Changes to this policy</a>
            </li>
            <li>
              <a href="#complaints">How to file a complaint</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
          </ol>
        </nav>

        <section id="who-we-are">
          <h2>
            <span className="num">01</span> Who we are
          </h2>
          <p>
            AM Builders (&quot;AM Builders,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) is a licensed general contractor based in Airdrie, Alberta, providing
            basement development, home renovations, new home construction, and commercial
            construction services to homeowners and businesses in Calgary, Airdrie, Chestermere,
            Cochrane, and the surrounding communities.
          </p>
          <p>
            This policy covers personal information we collect through our website,
            ambuilders.ca, as well as information we collect when you call, email, or meet with us
            about a potential or active construction project. It does not cover information
            collected by third-party websites we may link to, which are governed by their own
            privacy policies.
          </p>
        </section>

        <section id="info-we-collect">
          <h2>
            <span className="num">02</span> Information we collect
          </h2>
          <p>
            We collect only the information reasonably needed to respond to your inquiry, prepare
            an estimate, deliver a project, and run our business responsibly. The categories below
            cover what we may collect, depending on how you interact with us.
          </p>

          <h3>Information you give us directly</h3>
          <ul>
            <li>
              <strong>Contact details</strong> — your name, phone number, and email address.
            </li>
            <li>
              <strong>Project information</strong> — your property address or project location, a
              description of the work you&apos;re considering, your rough budget or timeline, and
              any photos, sketches, or documents you choose to share with us.
            </li>
            <li>
              <strong>Communications</strong> — the content of emails, phone calls, texts, and
              in-person conversations you have with our team, including notes taken during a site
              visit or consultation.
            </li>
            <li>
              <strong>Contract and billing information</strong> — if you become a client, this may
              include your mailing address, payment and invoicing details, and permit-related
              information required by your municipality.
            </li>
          </ul>

          <h3>Information collected automatically</h3>
          <p>
            When you browse ambuilders.ca, our website and our analytics providers automatically
            collect some technical information, including your IP address, general geographic
            location derived from that IP address, browser and device type, the pages you view,
            how long you spend on them, and the site that referred you to us. We use this
            information in aggregate to understand how people use our site — we don&apos;t use it
            to identify you personally.
          </p>

          <h3>Information from other sources</h3>
          <p>
            Occasionally we receive your contact information from a third party — for example, a
            friend, family member, or trade partner who refers you to us, or a community event
            where you provide your details for a follow-up (such as a raffle or sign-up sheet). We
            treat this information the same way as information you give us directly.
          </p>
        </section>

        <section id="how-we-collect">
          <h2>
            <span className="num">03</span> How we collect your information
          </h2>
          <ul>
            <li>
              Through the quote request and contact forms on ambuilders.ca, which are processed
              using our customer relationship management platform, GoHighLevel (operated by
              HighLevel Inc.).
            </li>
            <li>When you call our office, send us an email, or message us directly.</li>
            <li>During in-person consultations, site visits, and walkthroughs.</li>
            <li>
              Through cookies and similar tracking technologies while you browse our website (see{" "}
              <a href="#cookies">Cookies and similar technologies</a>).
            </li>
            <li>
              Through referrals from past clients, trade partners, or community events we
              participate in.
            </li>
          </ul>
        </section>

        <section id="how-we-use">
          <h2>
            <span className="num">04</span> How we use your information
          </h2>
          <p>We use the personal information we collect to:</p>
          <ul>
            <li>Respond to your quote request or inquiry and follow up to schedule a consultation;</li>
            <li>Prepare estimates, proposals, and itemized quotes for your project;</li>
            <li>
              Communicate with you throughout a project, including scheduling, permitting, and
              progress updates;
            </li>
            <li>
              Prepare and submit permit drawings and applications to your municipality where
              required;
            </li>
            <li>Invoice you and process payments for completed work;</li>
            <li>Maintain accurate business, tax, and warranty records as required by law;</li>
            <li>
              Send you marketing communications about our services, where you&apos;ve given us
              consent to do so, and always with an easy way to opt out;
            </li>
            <li>
              Understand how visitors use our website so we can improve its content and
              performance; and
            </li>
            <li>
              Meet our legal, regulatory, licensing, and insurance obligations as an Alberta
              general contractor.
            </li>
          </ul>
          <p>
            We do not sell your personal information, and we do not use it for any purpose beyond
            what&apos;s described in this policy without asking for your consent first.
          </p>
        </section>

        <section id="cookies">
          <h2>
            <span className="num">05</span> Cookies and similar technologies
          </h2>
          <p>
            Our website uses cookies and similar technologies — small text files stored on your
            device — to help the site function properly, remember your preferences, and measure
            how our site and advertising are performing.
          </p>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential</td>
                <td>
                  Required for the website and quote-request form to function correctly. These
                  can&apos;t be switched off.
                </td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>
                  Help us understand how visitors find and use ambuilders.ca (for example, which
                  pages are viewed most and how visitors arrived at our site) so we can improve it.
                </td>
              </tr>
              <tr>
                <td>Advertising</td>
                <td>
                  Used if you interact with our ads on platforms such as Google or Meta
                  (Facebook/Instagram), to help us measure and improve the relevance of that
                  advertising.
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            You can control or delete cookies through your browser settings at any time. Most
            browsers let you block cookies entirely or clear existing ones, though doing so may
            affect how parts of our website function, including the quote request form.
          </p>
        </section>

        <section id="sharing">
          <h2>
            <span className="num">06</span> How we share your information
          </h2>
          <p>
            We share personal information only with the parties described below, and only as
            needed to run our business and deliver your project.
          </p>
          <ul>
            <li>
              <strong>Service providers.</strong> We use trusted third-party providers to help
              operate our business, including our customer relationship management and
              form-processing platform (GoHighLevel / HighLevel Inc.), website hosting provider,
              and website analytics tools. These providers are only permitted to use your
              information to provide services to us, not for their own purposes.
            </li>
            <li>
              <strong>Trade partners and subcontractors.</strong> If your project involves
              specialized trades (such as electrical, plumbing, or HVAC), we may share the project
              details necessary for them to quote or complete their portion of the work.
            </li>
            <li>
              <strong>Municipal and regulatory authorities.</strong> Where a project requires a
              building permit, we share the necessary project and property information with the
              relevant municipality (Calgary, Airdrie, Chestermere, or Cochrane) as part of the
              permit application process.
            </li>
            <li>
              <strong>Legal and safety requirements.</strong> We may disclose information where
              required by law, to comply with a court order or regulatory request, or to protect
              the safety, rights, or property of AM Builders, our clients, or the public.
            </li>
            <li>
              <strong>Business transitions.</strong> If AM Builders were ever to merge with, be
              acquired by, or transfer assets to another business, client information may be
              transferred as part of that transaction, subject to the same privacy protections
              described here.
            </li>
          </ul>
          <p>
            We do not share your personal information with third parties for their own independent
            marketing purposes.
          </p>
        </section>

        <section id="cross-border">
          <h2>
            <span className="num">07</span> Cross-border data transfer
          </h2>
          <p>
            Some of the service providers we rely on, including our GoHighLevel/HighLevel CRM
            platform, store and process data on servers located in the United States. This means
            personal information you submit through our website forms may be transferred to, and
            stored in, a jurisdiction outside Canada.
          </p>
          <div className="callout">
            <strong>What this means for you:</strong> while your information is outside Canada, it
            may be accessible to courts, law enforcement, and national security authorities in
            that jurisdiction under their local laws. We select service providers who maintain
            strong contractual and technical safeguards, and we only share the minimum information
            necessary for them to perform their function for us.
          </div>
        </section>

        <section id="retention">
          <h2>
            <span className="num">08</span> How long we keep your information
          </h2>
          <p>
            We keep personal information only as long as necessary to fulfill the purposes
            described in this policy, unless a longer retention period is required or permitted by
            law.
          </p>
          <ul>
            <li>
              <strong>Quote requests and inquiries that don&apos;t become a project</strong> are
              generally retained for up to 24 months from your last contact with us, so we can
              follow up or respond if you return with questions, after which they are deleted or
              de-identified.
            </li>
            <li>
              <strong>Client and project records</strong> — including contracts, invoices, and
              permit-related documents — are retained for at least seven years after project
              completion, in line with standard Canadian tax and accounting record-keeping
              requirements and our warranty obligations.
            </li>
            <li>
              <strong>Marketing communications</strong> are retained until you unsubscribe or
              withdraw your consent, after which we stop sending them and remove you from active
              marketing lists within a reasonable time.
            </li>
          </ul>
        </section>

        <section id="your-rights">
          <h2>
            <span className="num">09</span> Your rights and choices
          </h2>
          <p>Under Alberta&apos;s Personal Information Protection Act, you have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> the personal information we hold about you;
            </li>
            <li>
              <strong>Correct</strong> information that is inaccurate or incomplete;
            </li>
            <li>
              <strong>Withdraw your consent</strong> to our collection, use, or disclosure of your
              information at any time, subject to legal or contractual restrictions (for example,
              we can&apos;t delete records we&apos;re legally required to keep, like permit
              documents for a completed project); and
            </li>
            <li>
              <strong>Ask questions</strong> about how your information has been collected, used,
              or shared.
            </li>
          </ul>
          <h3>Marketing opt-out</h3>
          <p>
            If you receive marketing emails or text messages from us, every message includes a
            simple way to unsubscribe. You can also opt out at any time by emailing us at{" "}
            <a href="mailto:info@ambuilders.ca">info@ambuilders.ca</a> with &quot;unsubscribe&quot;
            in the subject line. Opting out of marketing won&apos;t affect service-related
            communications about an active project.
          </p>
          <p>
            To exercise any of these rights, contact us using the details in the{" "}
            <a href="#contact">Contact us</a> section below. We&apos;ll respond within a reasonable
            time and in accordance with Alberta law.
          </p>
        </section>

        <section id="security">
          <h2>
            <span className="num">10</span> How we protect your information
          </h2>
          <p>
            We use reasonable administrative, technical, and physical safeguards to protect the
            personal information in our care against loss, theft, and unauthorized access, use,
            disclosure, or modification. This includes restricting access to personal information
            to team members who need it to do their jobs, and relying on reputable service
            providers who maintain their own security standards.
          </p>
          <p>
            No method of storing or transmitting information online is completely secure. If we
            ever become aware of a breach that creates a real risk of significant harm to you, we
            will notify you and the Office of the Information and Privacy Commissioner of Alberta
            as required by law.
          </p>
        </section>

        <section id="children">
          <h2>
            <span className="num">11</span> Children&apos;s privacy
          </h2>
          <p>
            Our website and services are directed at adults seeking construction and renovation
            services and are not intended for, or directed at, children. We do not knowingly
            collect personal information from children. If you believe a child has provided us
            with personal information, please contact us and we will delete it.
          </p>
        </section>

        <section id="other-sites">
          <h2>
            <span className="num">12</span> Links to other websites
          </h2>
          <p>
            Our website may contain links to third-party websites, such as social media platforms
            or partner organizations. This policy only applies to ambuilders.ca. We aren&apos;t
            responsible for the privacy practices of other websites, and we encourage you to
            review their privacy policies before providing any personal information.
          </p>
        </section>

        <section id="changes">
          <h2>
            <span className="num">13</span> Changes to this policy
          </h2>
          <p>
            We may update this policy from time to time to reflect changes in our practices, our
            service providers, or the law. When we do, we&apos;ll update the effective date at the
            top of this page. We encourage you to review this page periodically. If we make a
            material change to how we handle your personal information, we&apos;ll take reasonable
            steps to let you know.
          </p>
        </section>

        <section id="complaints">
          <h2>
            <span className="num">14</span> How to file a complaint
          </h2>
          <p>
            If you have a concern about how we&apos;ve handled your personal information,
            we&apos;d like the chance to address it directly first — please contact us using the
            details below. If you&apos;re not satisfied with our response, you have the right to
            file a complaint with Alberta&apos;s independent privacy regulator:
          </p>
          <div className="callout">
            <strong>Office of the Information and Privacy Commissioner of Alberta (OIPC)</strong>
            <br />
            410, 9925 – 109 Street NW, Edmonton, AB T5K 2J8
            <br />
            Phone: 780-422-6860 &nbsp;|&nbsp; Toll-free: 1-888-878-4044 &nbsp;|&nbsp; Fax:
            780-422-5682
            <br />
            Website:{" "}
            <a href="https://oipc.ab.ca" target="_blank" rel="noopener">
              oipc.ab.ca
            </a>
          </div>
        </section>

        <section id="contact">
          <h2>
            <span className="num">15</span> Contact us
          </h2>
          <div className="contact-card">
            <h3>AM Builders</h3>
            <p style={{ marginBottom: "6px" }}>
              For any question about this policy or about your personal information, reach us at:
            </p>
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
          <a className="back-top" href="#who-we-are">
            &uarr; Back to top of policy
          </a>
        </section>
      </main>

      <footer className="site">
        <p>
          &copy; 2026 AM Builders. Licensed General Contractor — Alberta. This Privacy Policy is
          provided for informational purposes and does not constitute legal advice.
        </p>
      </footer>

      <style>{`
        .privacy-wrap {
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
        .privacy-wrap * {
          box-sizing: border-box;
        }
        .privacy-wrap a {
          color: var(--amber-2);
          text-decoration: underline;
        }
        .privacy-wrap a:hover {
          color: var(--amber);
        }
        .privacy-wrap a:focus-visible {
          outline: 3px solid var(--amber);
          outline-offset: 2px;
        }

        .privacy-wrap header.site {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-2) 100%);
          color: #fff;
          padding: 56px 24px 64px;
        }
        .privacy-wrap header.site .inner {
          max-width: 820px;
          margin: 0 auto;
        }
        .privacy-wrap .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 12.5px;
          font-weight: 600;
          color: #d9ad82;
          margin: 0 0 14px;
        }
        .privacy-wrap header.site h1 {
          font-size: clamp(30px, 4vw, 42px);
          line-height: 1.15;
          margin: 0 0 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .privacy-wrap header.site p.lede {
          font-size: 16.5px;
          color: #cfd6e2;
          max-width: 640px;
          margin: 0 0 6px;
        }
        .privacy-wrap .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 22px;
          margin-top: 22px;
          font-size: 13.5px;
          color: #b9c2d4;
        }
        .privacy-wrap .meta-row strong {
          color: #fff;
          font-weight: 600;
        }

        .privacy-wrap main {
          max-width: 820px;
          margin: 0 auto;
          padding: 0 24px 100px;
        }

        .privacy-wrap nav.toc {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 22px 26px;
          margin: -32px 0 44px;
          box-shadow: 0 8px 24px rgba(21, 34, 56, 0.08);
        }
        .privacy-wrap nav.toc h2 {
          font-size: 12.5px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--amber-2);
          margin: 0 0 12px;
          font-weight: 700;
        }
        .privacy-wrap nav.toc ol {
          margin: 0;
          padding-left: 20px;
          columns: 2;
          column-gap: 28px;
          font-size: 14.5px;
          list-style: decimal;
        }
        .privacy-wrap nav.toc li {
          margin-bottom: 8px;
          break-inside: avoid;
        }
        .privacy-wrap nav.toc a {
          text-decoration: none;
          color: var(--ink);
        }
        .privacy-wrap nav.toc a:hover {
          color: var(--amber-2);
          text-decoration: underline;
        }

        .privacy-wrap section {
          margin-bottom: 44px;
          scroll-margin-top: 20px;
        }
        .privacy-wrap section h2 {
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
        .privacy-wrap section h2 .num {
          color: var(--amber-2);
          font-variant-numeric: tabular-nums;
          font-size: 15px;
          font-weight: 700;
        }
        .privacy-wrap section h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          margin: 22px 0 8px;
        }
        .privacy-wrap p {
          margin: 0 0 14px;
          color: var(--ink-soft);
          font-size: 15.5px;
        }
        .privacy-wrap strong {
          color: var(--ink);
        }
        .privacy-wrap ul,
        .privacy-wrap ol.plain {
          margin: 0 0 14px;
          padding-left: 22px;
          color: var(--ink-soft);
          font-size: 15.5px;
        }
        .privacy-wrap ul {
          list-style: disc;
        }
        .privacy-wrap li {
          margin-bottom: 7px;
        }

        .privacy-wrap .callout {
          background: #fbf3ea;
          border: 1px solid #edd9bf;
          border-left: 4px solid var(--amber-2);
          border-radius: 8px;
          padding: 16px 18px;
          margin: 18px 0;
          font-size: 14.5px;
          color: #5a4326;
        }
        .privacy-wrap .callout strong {
          color: #3f2f18;
        }

        .privacy-wrap table {
          width: 100%;
          border-collapse: collapse;
          margin: 14px 0 20px;
          font-size: 14.5px;
        }
        .privacy-wrap th,
        .privacy-wrap td {
          text-align: left;
          padding: 10px 12px;
          border: 1px solid var(--line);
          vertical-align: top;
        }
        .privacy-wrap th {
          background: #f2efe9;
          color: var(--navy);
          font-weight: 700;
        }
        .privacy-wrap tr:nth-child(even) td {
          background: #fbfaf7;
        }

        .privacy-wrap .contact-card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 24px 26px;
          box-shadow: 0 4px 14px rgba(21, 34, 56, 0.05);
        }
        .privacy-wrap .contact-card h3 {
          margin-top: 0;
        }
        .privacy-wrap .contact-card a {
          font-weight: 600;
          text-decoration: none;
        }
        .privacy-wrap .contact-card a:hover {
          text-decoration: underline;
        }

        .privacy-wrap footer.site {
          border-top: 1px solid var(--line);
          padding: 28px 24px 40px;
          text-align: center;
          color: #8a8f99;
          font-size: 13px;
        }
        .privacy-wrap footer.site a {
          color: #8a8f99;
          text-decoration: underline;
        }

        .privacy-wrap .back-top {
          display: inline-block;
          margin-top: 8px;
          font-size: 13px;
          color: var(--amber-2);
          text-decoration: none;
        }

        @media (max-width: 600px) {
          .privacy-wrap nav.toc ol {
            columns: 1;
          }
          .privacy-wrap nav.toc {
            margin-top: -20px;
          }
          .privacy-wrap header.site {
            padding: 44px 20px 56px;
          }
        }
      `}</style>
    </div>
  );
}
