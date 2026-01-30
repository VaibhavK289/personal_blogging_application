'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion';
import { GradientBlob } from '@/components/effects';
import { Calendar, Clock } from 'lucide-react';

// Mock archive data grouped by year and month
const archiveData = {
  2024: {
    January: [
      { id: 1, title: 'Building Modern Web Applications with Next.js 14', slug: 'building-modern-web-apps-nextjs-14', date: '28', readTime: '8 min', category: 'Technology' },
      { id: 2, title: 'The Art of UI/UX Design: Principles That Matter', slug: 'art-of-ui-ux-design', date: '25', readTime: '6 min', category: 'Design' },
      { id: 3, title: 'Productivity Hacks for Developers', slug: 'productivity-hacks-developers', date: '22', readTime: '5 min', category: 'Productivity' },
      { id: 4, title: 'Understanding Three.js: A Beginner\'s Guide', slug: 'understanding-threejs-beginners-guide', date: '20', readTime: '10 min', category: 'Technology' },
      { id: 5, title: 'Mastering CSS Grid and Flexbox', slug: 'mastering-css-grid-flexbox', date: '18', readTime: '7 min', category: 'Technology' },
      { id: 6, title: 'The Psychology of Colors in Web Design', slug: 'psychology-colors-web-design', date: '15', readTime: '6 min', category: 'Design' },
    ],
  },
  2023: {
    December: [
      { id: 7, title: 'Year in Review: Web Development Trends', slug: 'year-review-web-dev-trends', date: '28', readTime: '12 min', category: 'Technology' },
      { id: 8, title: 'Building a Design System from Scratch', slug: 'building-design-system', date: '15', readTime: '15 min', category: 'Design' },
    ],
    November: [
      { id: 9, title: 'Introduction to TypeScript for Beginners', slug: 'intro-typescript-beginners', date: '20', readTime: '10 min', category: 'Technology' },
      { id: 10, title: 'Remote Work Best Practices', slug: 'remote-work-best-practices', date: '10', readTime: '6 min', category: 'Productivity' },
    ],
  },
};

export default function ArchivePage() {
  return (
    <div className="relative min-h-screen pt-24">
      <GradientBlob className="top-0 right-0 opacity-20" />

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Archive
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse all articles organized by date
            </p>
          </div>
        </FadeIn>

        {/* Archive Content */}
        <div className="max-w-3xl mx-auto">
          {Object.entries(archiveData).map(([year, months], yearIndex) => (
            <FadeIn key={year} delay={yearIndex * 0.1}>
              <div className="mb-12">
                {/* Year Header */}
                <h2 
                  className="text-3xl font-bold mb-8 text-gradient"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {year}
                </h2>

                {/* Months */}
                {Object.entries(months).map(([month, posts]) => (
                  <div key={month} className="mb-8">
                    <h3 
                      className="text-lg font-semibold mb-4 text-muted-foreground flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      <Calendar className="w-4 h-4" />
                      {month}
                    </h3>

                    <StaggerContainer className="space-y-4">
                      {posts.map((post) => (
                        <StaggerItem key={post.id}>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="group block p-4 rounded-xl glass hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-primary/10 text-primary border-0 text-xs"
                                  >
                                    {post.category}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {month} {post.date}
                                  </span>
                                </div>
                                <h4 
                                  className="font-medium group-hover:text-primary transition-colors line-clamp-1"
                                  style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                  {post.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                              </div>
                            </div>
                          </Link>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
