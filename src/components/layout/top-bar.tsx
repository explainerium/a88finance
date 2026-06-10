import { Mail, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

export function TopBar() {
  const { contact, socials } = siteConfig;

  return (
    <div className="topbar">
      <div className="wrap">
        <div className="tb-left">
          <a href={contact.phoneHref}>
            <Phone aria-hidden />
            {contact.phone}
          </a>
          <a href={contact.emailHref}>
            <Mail aria-hidden />
            <span>{contact.email}</span>
          </a>
        </div>
        <div className="tb-right">
          <a href={socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a href={socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon />
          </a>
          <a href={socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
