import { useTranslations } from "next-intl";
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
  const t = useTranslations("contact");
  const tA11y = useTranslations("a11y");

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
        {t("title")}
      </h2>

      {primaryContactLink ? (
        <p className="mt-4 text-sm text-muted-foreground">
          {t("primaryChannel")}:{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4 pointer-hover:text-primary transition-colors"
            href={primaryContactLink.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${primaryContactLink.label} ${tA11y("openInNewTab")}`}
          >
            {primaryContactLink.label}
          </a>
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">{t("noPrimary")}</p>
      )}

      {contactEmail ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {t("emailLabel")}:{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4 pointer-hover:text-primary transition-colors"
            href={`mailto:${contactEmail}`}
            aria-label={`${t("sendEmailAria")} ${contactEmail}`}
          >
            {contactEmail}
          </a>
        </p>
      ) : null}

      <ul className="mt-6 flex flex-wrap gap-3" aria-label={t("socialNetworksLabel")}>
        {socialLinks.map((link) => (
          <li key={link.id}>
            <a
              className="text-sm text-foreground underline underline-offset-4 pointer-hover:text-primary transition-colors"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} ${tA11y("openInNewTab")}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
