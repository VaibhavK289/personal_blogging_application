'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from '@/components/motion';
import { GradientBlob, GlowCard } from '@/components/effects';
import { Search, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { getUserPosts } from '@/lib/blog-store';

// Mock blog posts data
const allPosts = [
  {
    id: 1,
    title: 'Building Modern Web Applications with Next.js 14',
    excerpt: 'Explore the latest features in Next.js 14 including App Router, Server Components, and more. Learn how to build performant web applications.',
    category: 'Technology',
    tags: ['Next.js', 'React', 'Web Development'],
    readTime: '8 min',
    date: '2024-01-28',
    slug: 'building-modern-web-apps-nextjs-14',
    featured: true,
  },
  {
    id: 2,
    title: 'The Art of UI/UX Design: Principles That Matter',
    excerpt: 'Deep dive into design principles that create memorable user experiences. From color theory to micro-interactions.',
    category: 'Design',
    tags: ['UI/UX', 'Design', 'User Experience'],
    readTime: '6 min',
    date: '2024-01-25',
    slug: 'art-of-ui-ux-design',
    featured: true,
  },
  {
    id: 3,
    title: 'Productivity Hacks for Developers',
    excerpt: 'Maximize your efficiency with these proven productivity techniques. From time management to automation.',
    category: 'Productivity',
    tags: ['Productivity', 'Development', 'Tips'],
    readTime: '5 min',
    date: '2024-01-22',
    slug: 'productivity-hacks-developers',
    featured: false,
  },
  {
    id: 4,
    title: 'Understanding Three.js: A Beginner\'s Guide',
    excerpt: 'Get started with 3D graphics on the web. Learn the fundamentals of Three.js and create your first 3D scene.',
    category: 'Technology',
    tags: ['Three.js', '3D', 'WebGL'],
    readTime: '10 min',
    date: '2024-01-20',
    slug: 'understanding-threejs-beginners-guide',
    featured: false,
  },
  {
    id: 5,
    title: 'Mastering CSS Grid and Flexbox',
    excerpt: 'A comprehensive guide to modern CSS layout techniques. Build responsive layouts with ease.',
    category: 'Technology',
    tags: ['CSS', 'Layout', 'Web Development'],
    readTime: '7 min',
    date: '2024-01-18',
    slug: 'mastering-css-grid-flexbox',
    featured: false,
  },
  {
    id: 6,
    title: 'The Psychology of Colors in Web Design',
    excerpt: 'How colors affect user perception and behavior. Learn to create impactful color schemes for your projects.',
    category: 'Design',
    tags: ['Color Theory', 'Psychology', 'Design'],
    readTime: '6 min',
    date: '2024-01-15',
    slug: 'psychology-colors-web-design',
    featured: false,
  },
];

const categories = ['All', 'Technology', 'Design', 'Productivity', 'Lifestyle', 'Tutorial'];



export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshKey, setRefreshKey] = useState(0);

  // Combine user posts with mock posts using useMemo
  const combinedPosts = useMemo(() => {
    const userPosts = typeof window !== 'undefined' ? getUserPosts() : [];
    return [
      ...userPosts,
      ...allPosts.map(post => ({ ...post, isUserCreated: false as const })),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // Refresh posts when tab becomes visible (in case user created a post in another tab)
  useEffect(() => {
    const handleFocus = () => setRefreshKey(k => k + 1);
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const filteredPosts = combinedPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen pt-24">
      <GradientBlob className="top-0 right-0 opacity-30" />

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts on technology, design, and building better digital experiences.
            </p>
          </div>
        </FadeIn>

        {/* Search and Filter */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-border/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? 'bg-gradient-primary text-white border-0' 
                    : 'hover:bg-muted'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Posts Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <StaggerItem key={post.id}>
              <ScaleOnHover>
                <GlowCard className="h-full" glowColor="primary">
                  <Link href={`/blog/${post.slug}`} className="block p-6 h-full">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {post.isUserCreated && (
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-0"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          New
                        </Badge>
                      )}
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-0"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    
                    <h2 
                      className="text-xl font-semibold mb-3 line-clamp-2 hover:text-primary transition-colors"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
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
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                </GlowCard>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <FadeIn>
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Clear filters
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
