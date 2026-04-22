export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This privacy policy explains how Isuri Computer may collect, use, and protect customer information when using this website."
      sections={[
        [
          "Information we collect",
          "We may collect your name, email address, phone number, delivery address, and account details when you register, place orders, or contact the store.",
        ],
        [
          "How we use information",
          "Your data may be used to process orders, provide support, improve the website experience, and send important updates related to your purchases.",
        ],
        [
          "Data protection",
          "We take reasonable steps to protect user data, but users should also keep their login credentials secure and private.",
        ],
        [
          "Third-party services",
          "Some website functions may use third-party services such as payment, storage, analytics, or email tools.",
        ],
        [
          "Policy updates",
          "This page may be updated in the future when business needs or legal requirements change.",
        ],
      ]}
    />
  );
}

function LegalPage({ title, intro, sections }) {
  return (
    <div className="section-shell py-10">
      <div className="mx-auto max-w-4xl rounded-[36px] glass p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">{title}</h1>
        <p className="mt-5 leading-8 text-secondary/70">{intro}</p>

        <div className="mt-10 space-y-5">
          {sections.map(([heading, text], index) => (
            <section
              key={heading}
              className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0"
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent/90">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-xl font-bold">{heading}</h2>
              <p className="mt-3 leading-8 text-secondary/70">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}