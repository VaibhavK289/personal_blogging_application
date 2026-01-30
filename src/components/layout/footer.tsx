'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/archive', label: 'Archive' },
    { href: '/about', label: 'About' },
  ],
  categories: [
    { href: '/category/technology', label: 'Technology' },
    { href: '/category/design', label: 'Design' },
    { href: '/category/productivity', label: 'Productivity' },
    { href: '/category/thoughts', label: 'Thoughts' },
  ],
};

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hello@blog.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/50">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, oklch(0.14 0.02 260 / 0.5) 100%)',
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Newsletter */}
          <FadeIn delay={0} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span 
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Personal<span className="text-gradient">Blog</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Join the newsletter to receive the latest articles, insights, and updates directly in your inbox.
            </p>
            
            {/* Newsletter Form */}
            <form className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-card/50 border-border/50 focus:border-primary"
              />
              <Button 
                type="submit"
                className="bg-gradient-primary hover:opacity-90 text-white shrink-0"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight className="w-4 h-4 sm:ml-2" />
              </Button>
            </form>
          </FadeIn>

          {/* Navigation Links */}
          <FadeIn delay={0.1}>
            <h3 
              className="font-semibold mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Categories */}
          <FadeIn delay={0.2}>
            <h3 
              className="font-semibold mb-4 text-foreground"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Personal Blog. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
