import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import {
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
} from "@/components/shared/social-icons"
import { siteConfig } from "@/lib/site-config"

const quickLinks = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Services", href: "/services" },
	{ label: "Blog", href: "/blog" },
	{ label: "Apply for Finance", href: "/apply" },
	{ label: "Contact", href: "/contact" },
	{ label: "Privacy Policy", href: "/privacy" },
]

export function SiteFooter() {
	const { contact, socials, hours, legal } = siteConfig
	const year = new Date().getFullYear()

	return (
		<footer className="site-footer">
			<div className="wrap">
				<div className="fgrid">
					<div>
						<Image
							className="flogo"
							src="/logo-white.svg"
							alt="A88 Finance Group"
							width={79}
							height={64}
						/>
						<p className="legal">
							<b>{legal.entity}</b>
							<br />
							{legal.creditRep} is authorised under {legal.acl}
							<br />
							{legal.abn}
							<br />
							{legal.membership}
						</p>
						<div className="fsocial">
							<a
								href={socials.facebook}
								aria-label="Facebook"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FacebookIcon />
							</a>
							<a
								href={socials.linkedin}
								aria-label="LinkedIn"
								target="_blank"
								rel="noopener noreferrer"
							>
								<LinkedinIcon />
							</a>
							<a
								href={socials.instagram}
								aria-label="Instagram"
								target="_blank"
								rel="noopener noreferrer"
							>
								<InstagramIcon />
							</a>
						</div>
					</div>

					<div>
						<h4>Quick Links</h4>
						<ul>
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href}>{link.label}</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4>Contact Information</h4>
						<ul>
							<li>
								<span className="inline-flex items-start gap-[9px]">
									<MapPin aria-hidden />
									{contact.addressMain}
								</span>
							</li>
							<li>
								<span className="inline-flex items-start gap-[9px]">
									<MapPin aria-hidden />
									{contact.addressSecondary}
								</span>
							</li>
							<li>
								<a href={contact.phoneHref}>
									<Phone aria-hidden />
									{contact.phone}
								</a>
							</li>
							<li>
								<a href={contact.emailHref}>
									<Mail aria-hidden />
									{contact.email}
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4>Opening Hours</h4>
						{hours.map((h) => (
							<div className="hours" key={h.day}>
								<span>{h.day}</span>
								<span>{h.time}</span>
							</div>
						))}
					</div>
				</div>

				<div className="fbottom">
					<span>
						© {year} {legal.entity}. All Rights Reserved.
					</span>
					<span>
						Developed by <a href="https://explainerium.co/">@Explainerium</a>
					</span>
				</div>
			</div>
		</footer>
	)
}
