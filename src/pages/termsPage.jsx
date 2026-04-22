export default function TermsPage() {
  return (
    <div className="section-shell py-10">
      <div className="mx-auto max-w-4xl rounded-[36px] glass p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-secondary/45">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-5 leading-8 text-secondary/70">
          These terms and conditions define how customers may use the Isuri
          Computer website and purchase products through it.
        </p>

        <div className="mt-10 space-y-5">
          <Block
            number="01"
            title="Website usage"
            text="Users should provide accurate information and must not misuse the website, user accounts, or order process."
          />
          <Block
            number="02"
            title="Products and pricing"
            text="Prices, descriptions, availability, and product images may be updated at any time. The store may correct errors when needed."
          />
          <Block
            number="03"
            title="Orders"
            text="Orders are subject to confirmation. The store may contact customers regarding availability, verification, or delivery details before final processing."
          />
          <Block
            number="04"
            title="Returns and support"
            text="Return, exchange, warranty, and support decisions may depend on product condition, supplier terms, and store policy."
          />
          <Block
            number="05"
            title="Changes to terms"
            text="These terms may be revised over time. Continued use of the website means the user accepts the current version."
          />
        </div>
      </div>
    </div>
  );
}

function Block({ number, title, text }) {
  return (
    <section className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent/90">
        {number}
      </p>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-3 leading-8 text-secondary/70">{text}</p>
    </section>
  );
}