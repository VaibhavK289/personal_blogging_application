'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Preload } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Copy, Check, Mail, MapPin, Code, Palette, Lightbulb, Github, Linkedin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamic imports for Three.js components
const HeroCamera = dynamic(
  () => import('@/components/three/hero-camera').then(mod => mod.HeroCamera),
  { ssr: false }
);

const AnimatedRings = dynamic(
  () => import('@/components/three/animated-rings').then(mod => mod.AnimatedRings),
  { ssr: false }
);

const FloatingCube = dynamic(
  () => import('@/components/three/floating-cube').then(mod => mod.FloatingCube),
  { ssr: false }
);

const AnimatedTarget = dynamic(
  () => import('@/components/three/animated-target').then(mod => mod.AnimatedTarget),
  { ssr: false }
);

// Tech stack
const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Three.js', icon: '🎮' },
  { name: 'TailwindCSS', icon: '🎨' },
  { name: 'Node.js', icon: '🟢' },
];

// Featured posts
const featuredPosts = [
  {
    slug: 'building-modern-web-apps',
    title: 'Building Modern Web Applications',
    excerpt: 'Exploring the latest patterns and practices in frontend development.',
    category: 'Development',
    date: 'Jan 25, 2026',
  },
  {
    slug: 'design-systems-at-scale',
    title: 'Design Systems at Scale',
    excerpt: 'How to create design systems that grow with your product.',
    category: 'Design',
    date: 'Jan 20, 2026',
  },
  {
    slug: 'the-future-of-ai',
    title: 'The Future of AI in Development',
    excerpt: 'How AI is transforming the way we build software.',
    category: 'Technology',
    date: 'Jan 15, 2026',
  },
];

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('vaibhav@example.com');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section id="home" className="min-h-screen w-full flex flex-col relative">
        {/* 3D Canvas - Full Screen Background */}
        <div className="absolute inset-0 w-full h-full">
          <Canvas className="w-full h-full">
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 20]} />
              <HeroCamera isMobile={isMobile}>
                {/* Animated 3D Elements */}
                <AnimatedRings position={[-4, 1, 0]} scale={0.6} />
                <FloatingCube position={[5, -2, 0]} scale={0.8} />
                <AnimatedTarget position={[-6, -3, 0]} scale={1} />
                
                {/* Additional floating elements */}
                <mesh position={[4, 3, -2]}>
                  <icosahedronGeometry args={[0.8, 1]} />
                  <meshStandardMaterial color="#00d4ff" wireframe />
                </mesh>
              </HeroCamera>
              
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, 10]} intensity={0.5} color="#00d4ff" />
              
              <Preload all />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            {/* Greeting */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4">
              Hi, I am Vaibhav <span className="waving-hand">👋</span>
            </p>

            {/* Main Heading */}
            <h1 className="hero-tag text-gray-gradient mb-6">
              Building Products &<br />
              Digital Experiences
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              I'm a full-stack developer passionate about creating beautiful, 
              functional web experiences with modern technologies.
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pointer-events-auto"
            >
              <Button
                size="lg"
                className="btn gap-3"
                asChild
              >
                <Link href="#about">
                  Explore My Work
                  <span className="relative flex h-3 w-3">
                    <span className="btn-ping" />
                    <span className="btn-ping-dot" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== ABOUT SECTION (BENTO GRID) ==================== */}
      <section id="about" className="py-24 sm:px-10 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-muted-foreground uppercase tracking-widest mb-2">Introduction</p>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-gradient">About Me</h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
            {/* Card 1 - Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-1 xl:row-span-3"
            >
              <div className="grid-container">
                <div className="w-full rounded-2xl overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                </div>
                <div>
                  <p className="grid-headtext">Hi, I'm Vaibhav Kumar Kandhway</p>
                  <p className="grid-subtext">
                    With a passion for full-stack development, I have honed my skills in 
                    both frontend and backend technologies, creating dynamic and responsive 
                    web applications.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-1 xl:row-span-3"
            >
              <div className="grid-container">
                <p className="grid-headtext">Tech Stack</p>
                <p className="grid-subtext mb-4">
                  I specialize in modern technologies that allow me to build 
                  robust and scalable applications.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {techStack.map((tech) => (
                    <div key={tech.name} className="tech-logo">
                      <span className="text-2xl">{tech.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="col-span-1 xl:row-span-4"
            >
              <div className="grid-container h-full">
                <p className="grid-headtext flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location
                </p>
                <p className="grid-subtext">
                  I'm flexible with time zone communications & locations.
                </p>
                {/* Globe placeholder */}
                <div className="flex-1 min-h-[200px] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Globe className="w-24 h-24 text-primary/30" />
                </div>
                <p className="text-center text-muted-foreground text-sm">
                  Based in India · Open to remote work worldwide
                </p>
              </div>
            </motion.div>

            {/* Card 4 - Passion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="xl:col-span-2 xl:row-span-3"
            >
              <div className="grid-container">
                <p className="grid-headtext">My Passion for Coding</p>
                <p className="grid-subtext">
                  I love solving problems and building things through code. Programming isn't 
                  just my profession—it's my passion. I enjoy exploring new technologies, 
                  contributing to open-source projects, and enhancing my skills every day.
                </p>
              </div>
            </motion.div>

            {/* Card 5 - Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="xl:col-span-1 xl:row-span-2"
            >
              <div className="grid-container">
                <p className="grid-headtext flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Contact Me
                </p>
                <div 
                  className="copy-container mt-4"
                  onClick={handleCopyEmail}
                >
                  <div className="flex items-center gap-3 bg-secondary/50 px-4 py-3 rounded-lg w-full">
                    {hasCopied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {hasCopied ? 'Email copied!' : 'vaibhav@example.com'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== BLOG SECTION ==================== */}
      <section id="blog" className="py-24 sm:px-10 px-5 bg-card/30">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <p className="text-muted-foreground uppercase tracking-widest mb-2">My Thoughts</p>
              <h2 className="text-4xl md:text-5xl font-medium text-gray-gradient">Latest Articles</h2>
            </div>
            <Button variant="ghost" className="hidden sm:flex gap-2" asChild>
              <Link href="/blog">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className="grid-container group-hover:border-primary/50 transition-colors">
                    {/* Category */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary w-fit">
                      {post.category}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    {/* Date */}
                    <p className="text-xs text-muted-foreground mt-auto">
                      {post.date}
                    </p>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="py-24 sm:px-10 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground uppercase tracking-widest mb-2">Get in Touch</p>
            <h2 className="text-4xl md:text-5xl font-medium text-gray-gradient mb-6">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Have a project in mind? I'd love to hear about it. Send me a message 
              and let's create something amazing together.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <a 
                href="https://github.com/vaibhavk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/vaibhavkandhway" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://vaibhav.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <Globe className="w-6 h-6" />
              </a>
            </div>

            {/* CTA */}
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 rounded-full px-8" asChild>
              <Link href="mailto:vaibhav@example.com">
                <Mail className="w-5 h-5 mr-2" />
                Send a Message
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
