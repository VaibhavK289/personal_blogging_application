'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { GradientBlob, GlowCard } from '@/components/effects';
import { 
  Github, Twitter, Linkedin, Mail, 
  MapPin, Calendar, Coffee, Code, 
  Palette, Zap, ArrowRight
} from 'lucide-react';

const skills = [
  { name: 'Frontend Development', icon: Code },
  { name: 'UI/UX Design', icon: Palette },
  { name: 'Performance Optimization', icon: Zap },
];

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:hello@blog.com', icon: Mail, label: 'Email' },
];

const timeline = [
  { year: '2024', title: 'Senior Frontend Engineer', company: 'Tech Company', description: 'Leading frontend architecture and design systems.' },
  { year: '2022', title: 'Frontend Developer', company: 'Startup Inc', description: 'Built performant web applications using React and Next.js.' },
  { year: '2020', title: 'Junior Developer', company: 'Agency Co', description: 'Started my journey in web development.' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <GradientBlob className="top-0 left-0 opacity-20" />

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn>
            <div>
              <Badge 
                variant="secondary" 
                className="mb-4 bg-primary/10 text-primary border-0"
              >
                About Me
              </Badge>
              <h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Hi, I&apos;m <span className="text-gradient">John Doe</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                A passionate developer and designer who loves building beautiful, performant web applications. 
                I write about technology, design, and the intersection of both.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  5+ years experience
                </div>
                <div className="flex items-center gap-1">
                  <Coffee className="w-4 h-4" />
                  Coffee enthusiast
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Profile Image */}
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                {/* Gradient ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-primary opacity-20 blur-xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border/50 bg-card">
                  {/* Placeholder avatar */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-primary text-white text-6xl font-bold">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills Section */}
        <FadeIn>
          <div className="mb-24">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              What I Do
            </h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {skills.map((skill) => (
                <StaggerItem key={skill.name}>
                  <GlowCard className="p-6 text-center" glowColor="primary">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 
                      className="font-semibold mb-2"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {skill.name}
                    </h3>
                  </GlowCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Timeline Section */}
        <FadeIn>
          <div className="mb-24 max-w-2xl mx-auto">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              My Journey
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              
              <StaggerContainer className="space-y-8">
                {timeline.map((item) => (
                  <StaggerItem key={item.year}>
                    <div className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-gradient-primary" />
                      
                      <div className="glass rounded-xl p-6">
                        <Badge 
                          variant="secondary" 
                          className="mb-2 bg-primary/10 text-primary border-0"
                        >
                          {item.year}
                        </Badge>
                        <h3 
                          className="font-semibold mb-1"
                          style={{ fontFamily: 'var(--font-outfit)' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn>
          <div className="text-center">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Have a project in mind or just want to chat? I&apos;d love to hear from you.
            </p>
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-white border-0"
              asChild
            >
              <a href="mailto:hello@blog.com">
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
