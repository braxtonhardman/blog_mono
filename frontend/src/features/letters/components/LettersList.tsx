import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, Filter, X } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  slug: string;
  featured: boolean;
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: "The Future of AI in Web Development: What Every Developer Should Know",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we build web applications, from code generation to intelligent user experiences.",
      content: "Full article content...",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "AI & Technology",
      tags: ["AI", "Web Development", "Machine Learning", "Future Tech"],
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      slug: "future-ai-web-development",
      featured: true
    },
    {
      id: '2',
      title: "Building Sustainable SaaS: Lessons from My First $10K MRR",
      excerpt: "A deep dive into the strategies, mistakes, and key decisions that helped me build a sustainable SaaS business from scratch.",
      content: "Full article content...",
      date: "2025-01-08",
      readTime: "12 min read",
      category: "Entrepreneurship",
      tags: ["SaaS", "Business", "Revenue", "Startup"],
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg",
      slug: "building-sustainable-saas",
      featured: true
    },
    {
      id: '3',
      title: "React Server Components: A Complete Guide for 2025",
      excerpt: "Understanding React Server Components, their benefits, implementation patterns, and how they're changing the landscape of React development.",
      content: "Full article content...",
      date: "2025-01-01",
      readTime: "10 min read",
      category: "Web Development",
      tags: ["React", "Server Components", "Next.js", "Performance"],
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
      slug: "react-server-components-guide",
      featured: false
    },
    {
      id: '4',
      title: "TypeScript Best Practices: Writing Maintainable Code",
      excerpt: "Essential TypeScript patterns and practices that will make your code more robust, maintainable, and developer-friendly.",
      content: "Full article content...",
      date: "2024-12-28",
      readTime: "7 min read",
      category: "Web Development",
      tags: ["TypeScript", "Best Practices", "Code Quality", "Development"],
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
      slug: "typescript-best-practices",
      featured: false
    },
    {
      id: '5',
      title: "From Idea to Launch: My Product Development Process",
      excerpt: "A detailed walkthrough of how I take product ideas from conception to successful launch, including validation, development, and marketing strategies.",
      content: "Full article content...",
      date: "2024-12-20",
      readTime: "15 min read",
      category: "Entrepreneurship",
      tags: ["Product Development", "Launch Strategy", "Validation", "Marketing"],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      slug: "idea-to-launch-process",
      featured: false
    },
    {
      id: '6',
      title: "The Psychology of User Experience: Designing for Humans",
      excerpt: "How understanding human psychology can dramatically improve your product's user experience and drive better engagement.",
      content: "Full article content...",
      date: "2024-12-15",
      readTime: "9 min read",
      category: "Design & UX",
      tags: ["UX Design", "Psychology", "User Research", "Product Design"],
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
      slug: "psychology-user-experience",
      featured: false
    },
    {
      id: '7',
      title: "Scaling Your Development Team: Lessons Learned",
      excerpt: "Key insights from scaling a development team from 2 to 20 engineers, including hiring, culture, and technical challenges.",
      content: "Full article content...",
      date: "2024-12-10",
      readTime: "11 min read",
      category: "Leadership",
      tags: ["Team Building", "Leadership", "Scaling", "Management"],
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      slug: "scaling-development-team",
      featured: false
    },
    {
      id: '8',
      title: "Open Source Contributions: Why and How to Get Started",
      excerpt: "The benefits of contributing to open source projects and a practical guide to making your first meaningful contribution.",
      content: "Full article content...",
      date: "2024-12-05",
      readTime: "6 min read",
      category: "Open Source",
      tags: ["Open Source", "GitHub", "Community", "Career Development"],
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
      slug: "open-source-contributions-guide",
      featured: false
    }
  ];

  // Get unique categories and tags
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter posts based on search, category, and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [blogPosts, searchTerm, selectedCategory, selectedTag]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTag]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI & Technology': 'bg-purple-100 text-purple-800 border-purple-200',
      'Entrepreneurship': 'bg-green-100 text-green-800 border-green-200',
      'Web Development': 'bg-blue-100 text-blue-800 border-blue-200',
      'Design & UX': 'bg-pink-100 text-pink-800 border-pink-200',
      'Leadership': 'bg-orange-100 text-orange-800 border-orange-200',
      'Open Source': 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedTag('');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedTag;

  return (
    <div className="min-h-screen bg-background-light">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-800 font-medium">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTag && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    Tag: {selectedTag}
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                <X size={14} />
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-slate-600">
            Showing {paginatedPosts.length} of {filteredPosts.length} articles
            {hasActiveFilters && ` (filtered from ${blogPosts.length} total)`}
          </p>
        </div>

        {/* Blog Posts List */}
        {paginatedPosts.length > 0 ? (
          <div className="bg-background-light rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="px-8 py-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Archive</h2>
            </div>
            
            <div className="divide-y divide-slate-100">
              {paginatedPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                >
                  <div className="px-8 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Left side - Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                              Featured
                            </span>
                          )}
                          <div className="flex items-center space-x-1 text-sm text-slate-500">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 mb-3 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs hover:bg-slate-200 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 4 && (
                            <span className="text-slate-400 text-xs px-2 py-1">
                              +{post.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Right side - Date and Action */}
                      <div className="flex flex-col lg:items-end gap-3 lg:min-w-0 lg:w-48">
                        <div className="flex items-center space-x-1 text-sm text-slate-500">
                          <Calendar size={14} />
                          <span className="whitespace-nowrap">{formatDate(post.date)}</span>
                        </div>
                        
                        <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                          <span className="mr-2 text-sm">Read Article</span>
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}