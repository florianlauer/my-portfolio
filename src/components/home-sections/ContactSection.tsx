import type { SocialLink } from "@/types/socialLinks";

type ContactSectionProps = {
  socialLinks: SocialLink[];
  primaryContactLink: SocialLink | undefined;
};

export const ContactSection = ({
  socialLinks,
  primaryContactLink,
}: ContactSectionProps): React.JSX.Element => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="rounded-2xl border border-border p-6 md:p-8"
    >
      <h2 id="contact-title" className="text-2xl font-semibold tracking-tight">
        Contact
      </h2>

      {primaryContactLink ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Canal principal:{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4"
            href={primaryContactLink.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {primaryContactLink.label}
          </a>
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Aucun lien de contact principal n&apos;est configure pour le moment.
        </p>
      )}

      <ul className="mt-6 flex flex-wrap gap-3" aria-label="Reseaux sociaux">
        {socialLinks.map((link) => (
          <li key={link.id}>
            <a
              className="text-sm text-foreground underline underline-offset-4"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
