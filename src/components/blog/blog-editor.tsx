'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GradientBlob } from '@/components/effects';
import { createPost } from '@/lib/blog-store';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  X, 
  Plus,
  Sparkles,
  Save
} from 'lucide-react';
import Link from 'next/link';

const categories = ['Technology', 'Design', 'Productivity', 'Lifestyle', 'Tutorial'];

export function BlogEditor() {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Technology',
    tags: [] as string[],
    content: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (formData.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!validate()) return;

    setIsPublishing(true);
    
    try {
      createPost({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
      });
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      router.push('/blog');
    } catch (error) {
      console.error('Failed to publish:', error);
      setIsPublishing(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <GradientBlob className="top-0 right-0 opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              className="border-border/50"
            >
              {isPreview ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-gradient-primary hover:opacity-90 text-white border-0"
            >
              {isPublishing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                  </motion.div>
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {isPreview ? (
            /* Preview Mode */
            <div className="prose-blog bg-card/30 rounded-2xl border border-border/50 p-8">
              <h1 
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {formData.title || 'Untitled Post'}
              </h1>
              
              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-primary/10 text-primary border-0">
                  {formData.category}
                </Badge>
                {formData.tags.map(tag => (
                  <span key={tag} className="text-sm text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <p className="text-xl text-muted-foreground mb-8">
                {formData.excerpt || 'No excerpt provided'}
              </p>
              
              <div className="whitespace-pre-wrap">
                {formData.content || 'Start writing your content...'}
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Input
                  type="text"
                  placeholder="Enter your post title..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`text-3xl font-bold h-auto py-4 bg-transparent border-0 border-b border-border/50 rounded-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                  style={{ fontFamily: 'var(--font-outfit)' }}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <textarea
                  placeholder="Write a brief excerpt that summarizes your post..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  className={`w-full text-lg bg-transparent border-0 border-b border-border/50 rounded-none focus:outline-none focus:border-primary placeholder:text-muted-foreground/50 resize-none py-3 ${
                    errors.excerpt ? 'border-red-500' : ''
                  }`}
                />
                {errors.excerpt && (
                  <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
                )}
              </div>

              {/* Category & Tags */}
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-muted-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg bg-card/50 border border-border/50 focus:outline-none focus:border-primary text-foreground"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm text-muted-foreground mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="bg-card/50 border-border/50"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddTag}
                      className="border-border/50"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tags Display */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-0 pr-1"
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Content */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Start writing your blog post content here...

You can write in plain text or use markdown formatting:
- **bold** for emphasis
- *italic* for subtle emphasis  
- Lists, headings, and more!"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  rows={20}
                  className={`w-full px-4 py-4 rounded-xl bg-card/30 border border-border/50 focus:outline-none focus:border-primary placeholder:text-muted-foreground/50 resize-y min-h-[400px] ${
                    errors.content ? 'border-red-500' : ''
                  }`}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
