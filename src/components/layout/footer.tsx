'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, Heart } from 'lucide-react';
import { FadeIn } from '@/components/motion';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/VaibhavK289',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/vaibhavkumarkandhway',
    icon: Linkedin,
  },
  {
    name: 'Portfolio',
    href: 'https://vaibhavkandhway.dev',
    icon: Globe,
  },
  {
    name: 'Email',
    href: 'mailto:vaibhav.kumar.kandhway@gmail.com',
    icon: Mail,
  },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Archive', href: '/archive' },
  { name: 'About', href: '/about' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/30 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <FadeIn className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="VK" 
                  fill 
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-medium">
                <span className="text-foreground">VK</span>
                <span className="text-muted-foreground ml-1">Blog</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Exploring technology, design, and creativity. Sharing thoughts and ideas
              on building better digital experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.2}>
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:vaibhav.kumar.kandhway@gmail.com"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Email Me
                </a>
              </li>
              <li>
                <a
                  href="https://vaibhavkandhway.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/VaibhavK289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </FadeIn>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>
                © {currentYear} Vaibhav Kumar Kandhway. All rights reserved.
              </p>
              <p className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-primary fill-primary" /> and lots of coffee
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </footer>
  );
}
