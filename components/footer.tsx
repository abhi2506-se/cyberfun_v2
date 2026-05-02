import React from "react";
import Link from "next/link";
import { Zap, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg grad-text">Cyberfun</span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-5 max-w-xs">{COMPANY.tagline}. We craft digital experiences that drive growth.</p>
            <div className="space-y-2">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-sky-400 transition-colors"><Mail className="w-3.5 h-3.5" />{COMPANY.email}</a>
              <a href={`tel:${COMPANY.phone}`}  className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-sky-400 transition-colors"><Phone className="w-3.5 h-3.5" />{COMPANY.phone}</a>
              <div className="flex items-start gap-2 text-sm text-[var(--muted)]"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /><span>{COMPANY.address}</span></div>
            </div>
          </div>
          {[
            { title: "Company",  links: [["About","/about"],["Services","/services"],["Portfolio","/portfolio"],["Blog","/blog"],["Careers","/careers"]] },
            { title: "Services", links: [["Web Dev","/services#web"],["App Dev","/services#app"],["UI/UX","/services#uiux"],["AI Solutions","/services#ai"],["Cloud","/services#cloud"]] },
            { title: "Legal",    links: [["Privacy Policy","/privacy"],["Terms","/terms"],["Cookies","/cookies"]] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-semibold text-sm text-[var(--text)] mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={href}><Link href={href} className="text-sm text-[var(--muted)] hover:text-sky-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--border)] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">© {new Date().getFullYear()} {COMPANY.fullName}. All rights reserved.</p>
          <div className="flex gap-2">
            {[[Github,COMPANY.social.github],[Linkedin,COMPANY.social.linkedin],[Twitter,COMPANY.social.twitter],[Instagram,COMPANY.social.instagram]].map(([Icon, href], i) => (
              <a key={i} href={href as string} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-sky-400 hover:border-sky-500/40 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
