'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/motion';
import { GradientBlob, GlowCard } from '@/components/effects';
import { 
  Clock, Calendar, ArrowLeft, 
  Twitter, Linkedin, Facebook, Link2, 
  ChevronUp, BookOpen
} from 'lucide-react';

// Mock post data
const postData = {
  title: 'Building Modern Web Applications with Next.js 14',
  excerpt: 'Explore the latest features in Next.js 14 including App Router, Server Components, and more.',
  category: 'Technology',
  tags: ['Next.js', 'React', 'Web Development', 'JavaScript'],
  readTime: '8 min',
  date: '2024-01-28',
  author: {
    name: 'John Doe',
    avatar: '/avatar.jpg',
  },
  content: `
## Introduction

Next.js 14 represents a significant leap forward in the React ecosystem, bringing powerful features that make building modern web applications more intuitive and performant than ever before.

## The App Router Revolution

The App Router, introduced in Next.js 13 and refined in 14, fundamentally changes how we think about routing in React applications. With file-based routing that supports layouts, loading states, and error boundaries out of the box, developers can create sophisticated navigation patterns with minimal boilerplate.

### Key Features

- **Server Components**: By default, components in the App Router are server components, enabling better performance and smaller client bundles.
- **Streaming**: Progressive rendering with Suspense boundaries allows for faster initial page loads.
- **Parallel Routes**: Build complex dashboard layouts with independent loading states.

## Server Actions

One of the most exciting additions in Next.js 14 is stable Server Actions. These allow you to define server-side functions that can be called directly from your components:

\`\`\`typescript
async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title')
  const content = formData.get('content')
  
  await db.posts.create({
    data: { title, content }
  })
  
  revalidatePath('/blog')
}
\`\`\`

## Performance Improvements

Next.js 14 includes significant performance improvements:

1. **Turbopack**: The new Rust-based bundler is now stable for development
2. **Partial Prerendering**: Combine static and dynamic content seamlessly
3. **Improved Caching**: More granular control over data caching strategies

## Conclusion

Next.js 14 makes it easier than ever to build fast, scalable web applications. The combination of Server Components, Server Actions, and improved developer experience creates a compelling platform for modern web development.

Whether you're building a simple blog or a complex enterprise application, Next.js 14 provides the tools you need to succeed.
  `,
};

const relatedPosts = [
  {
    id: 2,
    title: 'The Art of UI/UX Design: Principles That Matter',
    category: 'Design',
    readTime: '6 min',
    slug: 'art-of-ui-ux-design',
  },
  {
    id: 3,
    title: 'Understanding Three.js: A Beginner\'s Guide',
    category: 'Technology',
    readTime: '10 min',
    slug: 'understanding-threejs-beginners-guide',
  },
];

// Table of contents items (parsed from content)
const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'the-app-router-revolution', title: 'The App Router Revolution', level: 2 },
  { id: 'key-features', title: 'Key Features', level: 3 },
  { id: 'server-actions', title: 'Server Actions', level: 2 },
  { id: 'performance-improvements', title: 'Performance Improvements', level: 2 },
  { id: 'conclusion', title: 'Conclusion', level: 2 },
];

export default function BlogPostPage() {
  const [activeSection] = useState('');
  const articleRef = useRef<HTMLElement>(null);
  
  // Reading progress
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end']
  });
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="relative min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <GradientBlob className="top-0 right-0 opacity-20" />

      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-6 pt-24">
        <FadeIn>
          <Button
            variant="ghost"
            asChild
            className="mb-8"
          >
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </FadeIn>
      </div>

      {/* Article Layout */}
      <div className="container mx-auto px-4 md:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents - Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <FadeIn>
              <div className="sticky top-24">
                <h3 
                  className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  <BookOpen className="w-4 h-4" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm transition-colors ${
                        item.level === 3 ? 'pl-4' : ''
                      } ${
                        activeSection === item.id 
                          ? 'text-primary font-medium' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </FadeIn>
          </aside>

          {/* Main Article */}
          <article ref={articleRef} className="lg:col-span-6">
            {/* Header */}
            <FadeIn>
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-primary/10 text-primary border-0"
                  >
                    {postData.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {postData.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(postData.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {postData.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6">
                  {postData.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {postData.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                <Separator />
              </header>
            </FadeIn>

            {/* Article Content */}
            <FadeIn delay={0.1}>
              <div className="prose-blog">
                {/* Rendering the content as markdown would go here */}
                <section id="introduction">
                  <h2>Introduction</h2>
                  <p>
                    Next.js 14 represents a significant leap forward in the React ecosystem, bringing powerful features that make building modern web applications more intuitive and performant than ever before.
                  </p>
                </section>

                <section id="the-app-router-revolution">
                  <h2>The App Router Revolution</h2>
                  <p>
                    The App Router, introduced in Next.js 13 and refined in 14, fundamentally changes how we think about routing in React applications. With file-based routing that supports layouts, loading states, and error boundaries out of the box, developers can create sophisticated navigation patterns with minimal boilerplate.
                  </p>

                  <section id="key-features">
                    <h3>Key Features</h3>
                    <ul>
                      <li><strong>Server Components</strong>: By default, components in the App Router are server components, enabling better performance and smaller client bundles.</li>
                      <li><strong>Streaming</strong>: Progressive rendering with Suspense boundaries allows for faster initial page loads.</li>
                      <li><strong>Parallel Routes</strong>: Build complex dashboard layouts with independent loading states.</li>
                    </ul>
                  </section>
                </section>

                <section id="server-actions">
                  <h2>Server Actions</h2>
                  <p>
                    One of the most exciting additions in Next.js 14 is stable Server Actions. These allow you to define server-side functions that can be called directly from your components.
                  </p>
                  <pre>
                    <code>{`async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title')
  const content = formData.get('content')
  
  await db.posts.create({
    data: { title, content }
  })
}`}</code>
                  </pre>
                </section>

                <section id="performance-improvements">
                  <h2>Performance Improvements</h2>
                  <p>Next.js 14 includes significant performance improvements:</p>
                  <ol>
                    <li><strong>Turbopack</strong>: The new Rust-based bundler is now stable for development</li>
                    <li><strong>Partial Prerendering</strong>: Combine static and dynamic content seamlessly</li>
                    <li><strong>Improved Caching</strong>: More granular control over data caching strategies</li>
                  </ol>
                </section>

                <section id="conclusion">
                  <h2>Conclusion</h2>
                  <p>
                    Next.js 14 makes it easier than ever to build fast, scalable web applications. The combination of Server Components, Server Actions, and improved developer experience creates a compelling platform for modern web development.
                  </p>
                  <p>
                    Whether you&apos;re building a simple blog or a complex enterprise application, Next.js 14 provides the tools you need to succeed.
                  </p>
                </section>
              </div>
            </FadeIn>

            {/* Share Section */}
            <FadeIn delay={0.2}>
              <div className="mt-12 pt-8 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <h3 
                    className="text-lg font-semibold"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    Share this article
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="border-border/50">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-border/50">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-border/50">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-border/50"
                      onClick={copyLink}
                    >
                      <Link2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </article>

          {/* Related Posts - Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <FadeIn>
              <div className="sticky top-24">
                <h3 
                  className="text-sm font-semibold text-muted-foreground mb-4"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  Related Posts
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <GlowCard key={post.id} className="p-4" glowColor="primary">
                      <Link href={`/blog/${post.slug}`}>
                        <Badge 
                          variant="secondary" 
                          className="bg-primary/10 text-primary border-0 mb-2 text-xs"
                        >
                          {post.category}
                        </Badge>
                        <h4 
                          className="font-medium line-clamp-2 hover:text-primary transition-colors"
                          style={{ fontFamily: 'var(--font-outfit)' }}
                        >
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-2">
                          {post.readTime}
                        </p>
                      </Link>
                    </GlowCard>
                  ))}
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
