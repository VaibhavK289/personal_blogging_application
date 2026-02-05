// Blog Store - localStorage-based persistence for blog posts

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  slug: string;
  readTime: string;
  date: string;
  featured: boolean;
  isUserCreated: boolean;
}

const STORAGE_KEY = 'vk-blog-posts';

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
}

// Calculate reading time from content
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

// Get all user-created posts from localStorage
export function getUserPosts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getUserPosts();
  return posts.find(post => post.slug === slug);
}

// Create a new blog post
export function createPost(postData: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}): BlogPost {
  const posts = getUserPosts();
  
  // Generate unique slug
  const baseSlug = generateSlug(postData.title);
  let slug = baseSlug;
  let counter = 1;
  
  while (posts.some(p => p.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  const newPost: BlogPost = {
    id: `user-${Date.now()}`,
    title: postData.title,
    excerpt: postData.excerpt,
    content: postData.content,
    category: postData.category,
    tags: postData.tags,
    slug,
    readTime: calculateReadTime(postData.content),
    date: new Date().toISOString().split('T')[0],
    featured: false,
    isUserCreated: true,
  };
  
  posts.unshift(newPost);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
  
  return newPost;
}

// Update an existing post
export function updatePost(slug: string, updates: Partial<BlogPost>): BlogPost | null {
  const posts = getUserPosts();
  const index = posts.findIndex(p => p.slug === slug);
  
  if (index === -1) return null;
  
  const updatedPost = {
    ...posts[index],
    ...updates,
    readTime: updates.content 
      ? calculateReadTime(updates.content) 
      : posts[index].readTime,
  };
  
  posts[index] = updatedPost;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
  
  return updatedPost;
}

// Delete a post
export function deletePost(slug: string): boolean {
  const posts = getUserPosts();
  const filtered = posts.filter(p => p.slug !== slug);
  
  if (filtered.length === posts.length) return false;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
  
  return true;
}
