'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Search, FileText, Clock, ArrowRight } from 'lucide-react';
import Fuse from 'fuse.js';

// Mock search data
const searchData = [
  {
    id: '1',
    title: 'Building Modern Web Applications with Next.js 14',
    excerpt: 'Explore the latest features in Next.js 14 including App Router, Server Components, and more.',
    category: 'Technology',
    slug: 'building-modern-web-apps-nextjs-14',
    readTime: '8 min',
  },
  {
    id: '2',
    title: 'The Art of UI/UX Design: Principles That Matter',
    excerpt: 'Deep dive into design principles that create memorable user experiences.',
    category: 'Design',
    slug: 'art-of-ui-ux-design',
    readTime: '6 min',
  },
  {
    id: '3',
    title: 'Productivity Hacks for Developers',
    excerpt: 'Maximize your efficiency with these proven productivity techniques.',
    category: 'Productivity',
    slug: 'productivity-hacks-developers',
    readTime: '5 min',
  },
  {
    id: '4',
    title: 'Understanding Three.js: A Beginner\'s Guide',
    excerpt: 'Get started with 3D graphics on the web using Three.js.',
    category: 'Technology',
    slug: 'understanding-threejs-beginners-guide',
    readTime: '10 min',
  },
  {
    id: '5',
    title: 'Mastering CSS Grid and Flexbox',
    excerpt: 'A comprehensive guide to modern CSS layout techniques.',
    category: 'Technology',
    slug: 'mastering-css-grid-flexbox',
    readTime: '7 min',
  },
  {
    id: '6',
    title: 'The Psychology of Colors in Web Design',
    excerpt: 'How colors affect user perception and behavior.',
    category: 'Design',
    slug: 'psychology-colors-web-design',
    readTime: '6 min',
  },
];

// Fuse.js configuration for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'excerpt', weight: 0.2 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
};

interface SearchDialogProps {
  trigger?: React.ReactNode;
}

export function SearchDialog({ trigger }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  const fuse = useMemo(() => new Fuse(searchData, fuseOptions), []);
  
  const results = useMemo(() => {
    if (!query.trim()) return searchData.slice(0, 5);
    return fuse.search(query).map(result => result.item);
  }, [query, fuse]);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = useCallback((slug: string) => {
    setOpen(false);
    setQuery('');
    window.location.href = `/blog/${slug}`;
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Search className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Search</span>
            <kbd className="hidden md:inline-flex ml-2 px-1.5 py-0.5 text-xs bg-muted rounded">
              ⌘K
            </kbd>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 gap-0 glass border-border/50">
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search articles..."
            value={query}
            onValueChange={setQuery}
            className="h-14 text-lg border-b border-border/50"
          />
          <CommandList className="max-h-[400px] overflow-y-auto p-2">
            <CommandEmpty className="py-12 text-center text-muted-foreground">
              No articles found.
            </CommandEmpty>
            <CommandGroup heading={query ? 'Results' : 'Recent Articles'}>
              <AnimatePresence mode="popLayout">
                {results.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CommandItem
                      value={item.title}
                      onSelect={() => handleSelect(item.slug)}
                      className="p-4 cursor-pointer rounded-lg group"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="secondary" 
                              className="bg-primary/10 text-primary border-0 text-xs"
                            >
                              {item.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.readTime}
                            </span>
                          </div>
                          <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    </CommandItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CommandGroup>
          </CommandList>
          <div className="border-t border-border/50 p-3 text-xs text-muted-foreground flex items-center justify-between">
            <span>
              Press <kbd className="px-1 py-0.5 bg-muted rounded">↵</kbd> to select
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-muted rounded">esc</kbd> to close
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
