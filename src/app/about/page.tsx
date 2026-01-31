'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { GradientMesh } from '@/components/hero';
import { 
  Github, Linkedin, Mail, Globe,
  MapPin, Calendar, Coffee, Code, 
  Palette, Zap, ArrowRight
} from 'lucide-react';

const skills = [
  { name: 'Frontend Development', icon: Code, description: 'React, Next.js, TypeScript' },
  { name: 'UI/UX Design', icon: Palette, description: 'Figma, Design Systems' },
  { name: 'Performance', icon: Zap, description: 'Optimization, Web Vitals' },
];

const socialLinks = [
  { href: 'https://github.com/VaibhavK289', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/vaibhavkumarkandhway', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://vaibhavkandhway.dev', icon: Globe, label: 'Portfolio' },
  { href: 'mailto:vaibhav.kumar.kandhway@gmail.com', icon: Mail, label: 'Email' },
];

const timeline = [
  { year: '2024', title: 'Software Engineer', company: 'Building Dreams', description: 'Creating innovative web applications and exploring new technologies.' },
  { year: '2022', title: 'Frontend Developer', company: 'Creative Studio', description: 'Built performant web applications using React and Next.js.' },
  { year: '2020', title: 'Started Coding', company: 'Self-Taught Journey', description: 'Began my journey into the world of web development.' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <GradientMesh />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn>
            <div>
              <Badge 
                variant="secondary" 
                className="mb-4 bg-primary/10 text-primary border-primary/20"
              >
                About Me
              </Badge>
              <h1 className="text-4xl md:text-5xl font-medium mb-6">
                Hi, I&apos;m <span className="text-gradient">Vaibhav</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                A passionate developer and designer who loves building beautiful, performant web applications. 
                I write about technology, design, and the intersection of both.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  India
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  Developer
                </div>
                <div className="flex items-center gap-1">
                  <Coffee className="w-4 h-4 text-primary" />
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
                    className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
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
                <div className="absolute -inset-3 rounded-full bg-gradient-primary opacity-20 blur-2xl animate-pulse-glow" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border/50 bg-card">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="VK" 
                      width={120} 
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Skills Section */}
        <FadeIn>
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center">
              What I Do
            </h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {skills.map((skill) => (
                <StaggerItem key={skill.name}>
                  <div className="p-6 text-center rounded-2xl border border-border/50 bg-card/50 gradient-border hover-lift transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <skill.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Timeline Section */}
        <FadeIn>
          <div className="mb-24 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center">
              My Journey
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-primary opacity-30" />
              
              <StaggerContainer className="space-y-8">
                {timeline.map((item) => (
                  <StaggerItem key={item.year}>
                    <div className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-gradient-primary glow-primary" />
                      
                      <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
                        <Badge 
                          variant="secondary" 
                          className="mb-2 bg-primary/10 text-primary border-primary/20"
                        >
                          {item.year}
                        </Badge>
                        <h3 className="font-medium mb-1">{item.title}</h3>
                        <p className="text-sm text-primary/80 mb-2">{item.company}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
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
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              Let&apos;s Connect
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Have a project in mind or just want to chat? I&apos;d love to hear from you.
            </p>
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 rounded-full px-8"
              asChild
            >
              <a href="mailto:vaibhav.kumar.kandhway@gmail.com">
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
