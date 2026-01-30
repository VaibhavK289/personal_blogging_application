'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, Clock, BookOpen, Sparkles, Code, Palette, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { GradientMesh, GradientMeshMobile } from '@/components/hero';

// Sample featured posts
const featuredPosts = [
  {
    slug: 'building-modern-web-apps',
    title: 'Building Modern Web Applications',
    excerpt: 'Exploring the latest patterns and practices in frontend development with React and Next.js.',
    category: 'Development',
    readTime: '8 min',
    date: 'Jan 25, 2026',
    image: '/images/placeholder-1.jpg',
  },
  {
    slug: 'design-systems-at-scale',
    title: 'Design Systems at Scale',
    excerpt: 'How to create and maintain design systems that grow with your product.',
    category: 'Design',
    readTime: '6 min',
    date: 'Jan 20, 2026',
    image: '/images/placeholder-2.jpg',
  },
  {
    slug: 'the-future-of-ai',
    title: 'The Future of AI in Development',
    excerpt: 'How artificial intelligence is transforming the way we build software.',
    category: 'Technology',
    readTime: '10 min',
    date: 'Jan 15, 2026',
    image: '/images/placeholder-3.jpg',
  },
];

const categories = [
  { name: 'Development', icon: Code, count: 12 },
  { name: 'Design', icon: Palette, count: 8 },
  { name: 'Ideas', icon: Lightbulb, count: 15 },
];

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        {isMobile ? <GradientMeshMobile /> : <GradientMesh />}
        
        {/* Content */}
        <motion.div 
          className="relative z-10 container mx-auto px-4 md:px-6 text-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <FadeIn delay={0.2}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Welcome to VK Blog
            </Badge>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-tight">
              Thoughts, Ideas &{' '}
              <span className="text-gradient">Discoveries</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Exploring the intersection of technology, design, and creativity. 
              Join me on a journey of continuous learning and innovation.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground border-0 rounded-full px-8"
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
                className="rounded-full px-8 border-border/50 hover:bg-card"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </FadeIn>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Posts */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium mb-2">Featured Articles</h2>
                <p className="text-muted-foreground">Latest thoughts and insights</p>
              </div>
              <Button variant="ghost" className="hidden sm:inline-flex link-underline" asChild>
                <Link href="/blog">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="relative h-full rounded-2xl border border-border/50 bg-card/50 overflow-hidden hover-lift hover-glow transition-all duration-300">
                    {/* Image placeholder */}
                    <div className="aspect-[16/10] relative bg-gradient-subtle overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary/40" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 relative bg-gradient-subtle">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium mb-2">Explore Topics</h2>
              <p className="text-muted-foreground">Dive into different areas of interest</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {categories.map((category) => (
              <StaggerItem key={category.name}>
                <Link
                  href={`/category/${category.name.toLowerCase()}`}
                  className="group block"
                >
                  <div className="p-8 rounded-2xl border border-border/50 bg-card/50 text-center gradient-border hover-lift transition-all duration-300">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <category.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                Stay Updated
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Subscribe to get notified about new articles, insights, and exclusive content.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="submit"
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-full px-8"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
