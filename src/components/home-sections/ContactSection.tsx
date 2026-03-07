import type { SocialLink } from "@/types/socialLinks";

type ContactSectionProps = {
  socialLinks: SocialLink[];
  primaryContactLink: SocialLink | undefined;
  contactEmail?: string;
};

export const ContactSection = ({
  socialLinks,
  primaryContactLink,
  contactEmail,
}: ContactSectionProps): React.JSX.Element => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 rounded-2xl border border-border bg-background/92 p-6 md:p-8 backdrop-blur-sm"
    >
      <h2
        id="contact-title"
        className="border-l-2 border-primary pl-3 text-2xl font-semibold tracking-tight"
      >
        Contact
      </h2>

      {primaryContactLink ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Canal principal:{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4 pointer-hover:text-primary transition-colors"
            href={primaryContactLink.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryContactLink.label} (ouvre dans un nouvel onglet)`}
          >
            {primaryContactLink.label}
          </a>
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          Aucun lien de contact principal n&apos;est configure pour le moment.
        </p>
      )}

      {contactEmail ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Email:{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4 pointer-hover:text-primary transition-colors"
            href={`mailto:${contactEmail}`}
            aria-label={`Envoyer un email à ${contactEmail}`}
          >
            {contactEmail}
          </a>
        </p>
      ) : null}

      <ul className="mt-6 flex flex-wrap gap-3" aria-label="Réseaux sociaux">
        {socialLinks.map((link) => (
          <li key={link.id}>
            <a
              className="text-sm text-foreground underline underline-offset-4 pointer-hover:text-primary transition-colors"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (ouvre dans un nouvel onglet)`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
