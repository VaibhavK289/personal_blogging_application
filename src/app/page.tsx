'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from '@/components/motion';
import { GradientBlob, GridPattern, GlowCard } from '@/components/effects';
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles, Zap, Star } from 'lucide-react';
import { HeroSceneMobile } from '@/components/three/hero-scene';

// Dynamically import 3D scene - only on desktop
const HeroScene = dynamic(
  () => import('@/components/three/hero-scene').then((mod) => mod.HeroScene),
  { 
    ssr: false,
    loading: () => <HeroSceneMobile />
  }
);

// Mock featured posts data
const featuredPosts = [
  {
    id: 1,
    title: 'Building Modern Web Applications with Next.js 14',
    excerpt: 'Explore the latest features in Next.js 14 including App Router, Server Components, and more.',
    category: 'Technology',
    readTime: '8 min',
    date: '2024-01-28',
    slug: 'building-modern-web-apps-nextjs-14',
    featured: true,
  },
  {
    id: 2,
    title: 'The Art of UI/UX Design: Principles That Matter',
    excerpt: 'Deep dive into design principles that create memorable user experiences.',
    category: 'Design',
    readTime: '6 min',
    date: '2024-01-25',
    slug: 'art-of-ui-ux-design',
    featured: true,
  },
  {
    id: 3,
    title: 'Productivity Hacks for Developers',
    excerpt: 'Maximize your efficiency with these proven productivity techniques.',
    category: 'Productivity',
    readTime: '5 min',
    date: '2024-01-22',
    slug: 'productivity-hacks-developers',
    featured: false,
  },
];

const categories = [
  { name: 'Technology', count: 24, color: 'primary', icon: Zap },
  { name: 'Design', count: 18, color: 'accent', icon: Sparkles },
  { name: 'Productivity', count: 12, color: 'coral', icon: Star },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Scene / Gradient Background */}
        <div className="hidden md:block">
          <HeroScene />
        </div>
        <div className="md:hidden">
          <HeroSceneMobile />
        </div>
        
        <GridPattern className="opacity-[0.02]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.2}>
              <Badge 
                variant="secondary" 
                className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Welcome to my digital garden
              </Badge>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Thoughts, Ideas, &{' '}
                <span className="text-gradient">Discoveries</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A personal space where I share insights on technology, design, and the art of building beautiful digital experiences.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-white border-0 px-8"
                  asChild
                >
                  <Link href="/blog">
                    Explore Articles
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/50 hover:bg-card/50"
                  asChild
                >
                  <Link href="/about">
                    About Me
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-muted-foreground"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-24 relative">
        <GradientBlob className="top-0 left-0 opacity-50" />
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  Featured Posts
                </h2>
                <p className="text-muted-foreground">
                  Handpicked articles you might enjoy
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/blog">
                  View all
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <ScaleOnHover>
                  <GlowCard className="h-full" glowColor="primary">
                    <Link href={`/blog/${post.slug}`} className="block p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge 
                          variant="secondary" 
                          className="bg-primary/10 text-primary border-0"
                        >
                          {post.category}
                        </Badge>
                        {post.featured && (
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <h3 
                        className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </Link>
                  </GlowCard>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="mt-8 text-center sm:hidden">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                View all posts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Explore by Category
              </h2>
              <p className="text-muted-foreground">
                Find content that interests you
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {categories.map((category) => (
              <StaggerItem key={category.name}>
                <ScaleOnHover>
                  <Link
                    href={`/category/${category.name.toLowerCase()}`}
                    className="group block p-6 rounded-xl glass hover:border-primary/30 transition-all text-center"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} articles
                    </p>
                  </Link>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.7 0.22 270 / 0.15) 0%, oklch(0.75 0.12 180 / 0.15) 100%)',
                }}
              />
              <div className="absolute inset-0 glass" />
              
              <div className="relative p-8 md:p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  Stay Updated
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Get the latest articles delivered directly to your inbox. No spam, just quality content.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 text-white border-0 shrink-0"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
