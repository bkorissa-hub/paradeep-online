import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Tips & Tricks", "Hardware", "Software", "Security", "News"];

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips to Speed Up Your Old Laptop",
    excerpt: "Is your laptop running slow? Learn these proven techniques to breathe new life into your aging device without spending money on upgrades.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    category: "Tips & Tricks",
    author: "Rakesh Mohanty",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "How to Choose the Right Laptop for Your Needs",
    excerpt: "Confused about which laptop to buy? Our comprehensive guide helps you navigate specs, brands, and features to find your perfect match.",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    category: "Hardware",
    author: "Amit Sahoo",
    date: "Dec 12, 2024",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Protecting Your Computer from Ransomware Attacks",
    excerpt: "Ransomware attacks are on the rise. Learn how to protect your data and what to do if you become a victim of this growing threat.",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80",
    category: "Security",
    author: "Sunita Das",
    date: "Dec 10, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Windows 11 vs Windows 10: Should You Upgrade?",
    excerpt: "Windows 11 has been out for a while now. We compare the two operating systems to help you decide if it's time to upgrade.",
    image: "https://images.unsplash.com/photo-1624571395765-47d4c9e48dbc?auto=format&fit=crop&w=800&q=80",
    category: "Software",
    author: "Rakesh Mohanty",
    date: "Dec 8, 2024",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Building Your First Gaming PC: A Complete Guide",
    excerpt: "Ready to build your dream gaming rig? Our step-by-step guide covers everything from component selection to assembly tips.",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    category: "Hardware",
    author: "Amit Sahoo",
    date: "Dec 5, 2024",
    readTime: "12 min read",
  },
  {
    id: 6,
    title: "Data Backup Best Practices for Small Businesses",
    excerpt: "Don't wait for disaster to strike. Learn the 3-2-1 backup rule and other strategies to keep your business data safe.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    category: "Tips & Tricks",
    author: "Sunita Das",
    date: "Dec 2, 2024",
    readTime: "5 min read",
  },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured || selectedCategory !== "All");

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Blog & Resources
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Tech tips, tutorials, and news to help you get the most out of your devices.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && featuredPost && (
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-xl border border-border overflow-hidden">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <Button className="w-fit gradient-primary">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {regularPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={cn(
                    "group bg-card rounded-xl border border-border overflow-hidden",
                    "hover:shadow-card hover:border-primary/20 transition-all duration-300",
                    "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {regularPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest tech tips and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button className="gradient-primary shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
