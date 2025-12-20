import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Star, 
  Phone, 
  MessageCircle,
  Grid,
  List,
  SlidersHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Products" },
  { id: "laptops", name: "Laptops" },
  { id: "desktops", name: "Desktops" },
  { id: "monitors", name: "Monitors" },
  { id: "accessories", name: "Accessories" },
  { id: "components", name: "Components" },
  { id: "networking", name: "Networking" },
  { id: "printers", name: "Printers" },
];

const products = [
  {
    id: 1,
    name: "HP Pavilion 15 Laptop - Intel Core i5, 8GB RAM, 512GB SSD",
    category: "laptops",
    price: 54999,
    originalPrice: 64999,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    inStock: true,
    specs: ["Intel Core i5-1235U", "8GB DDR4", "512GB NVMe SSD", "15.6\" FHD IPS"],
  },
  {
    id: 2,
    name: "Dell OptiPlex 3090 Desktop - Core i7, 16GB RAM",
    category: "desktops",
    price: 42500,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    specs: ["Intel Core i7-10700", "16GB DDR4", "1TB HDD", "Windows 11 Pro"],
  },
  {
    id: 3,
    name: "Logitech MX Master 3 Wireless Mouse",
    category: "accessories",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 256,
    badge: "Sale",
    inStock: true,
    specs: ["4000 DPI", "USB-C Rechargeable", "Multi-device", "Ergonomic Design"],
  },
  {
    id: 4,
    name: "Samsung 27\" Curved Monitor - Full HD, 75Hz",
    category: "monitors",
    price: 18499,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 178,
    inStock: true,
    specs: ["27\" Curved VA Panel", "1920x1080 FHD", "75Hz Refresh", "AMD FreeSync"],
  },
  {
    id: 5,
    name: "ASUS ROG Gaming Laptop - RTX 3060, Ryzen 7",
    category: "laptops",
    price: 89999,
    originalPrice: 99999,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 67,
    badge: "Gaming",
    inStock: true,
    specs: ["AMD Ryzen 7 6800H", "16GB DDR5", "RTX 3060 6GB", "15.6\" 144Hz"],
  },
  {
    id: 6,
    name: "Intel Core i5-12400F Processor",
    category: "components",
    price: 15999,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    specs: ["6 Cores, 12 Threads", "2.5GHz Base Clock", "4.4GHz Boost", "LGA 1700"],
  },
  {
    id: 7,
    name: "TP-Link Archer AX50 WiFi 6 Router",
    category: "networking",
    price: 7499,
    image: "https://images.unsplash.com/photo-1544244015-9c72362c2122?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    reviews: 92,
    inStock: true,
    specs: ["WiFi 6 AX3000", "Dual Band", "OFDMA", "4 Gigabit Ports"],
  },
  {
    id: 8,
    name: "HP LaserJet Pro MFP Printer",
    category: "printers",
    price: 24999,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    reviews: 56,
    badge: "New",
    inStock: false,
    specs: ["Print/Scan/Copy", "22 PPM", "Auto Duplex", "Wireless"],
  },
];

const Sales = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <>
      {/* Page Header */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Computer Sales
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Browse our wide selection of quality computers, laptops, and accessories. 
            Contact us for pricing and availability.
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-8 lg:py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-card rounded-xl border border-border">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2.5 transition-colors",
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2.5 transition-colors",
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {sortedProducts.length} products
          </p>

          {/* Products Grid/List */}
          <div className={cn(
            viewMode === "grid" 
              ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          )}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "group bg-card rounded-xl border border-border overflow-hidden",
                  "hover:shadow-card hover:border-primary/20 transition-all duration-300",
                  viewMode === "list" && "flex"
                )}
              >
                {/* Image */}
                <div className={cn(
                  "relative bg-secondary overflow-hidden",
                  viewMode === "grid" ? "aspect-square" : "w-48 shrink-0"
                )}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge 
                      className={cn(
                        "absolute top-3 left-3",
                        product.badge === "Sale" ? "bg-destructive" : 
                        product.badge === "Gaming" ? "bg-purple-600" : "bg-primary"
                      )}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                      <span className="bg-background px-4 py-2 rounded-lg font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={cn("p-4 flex-1", viewMode === "list" && "flex flex-col justify-between")}>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                    <h3 className={cn(
                      "font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors",
                      viewMode === "grid" ? "line-clamp-2" : "line-clamp-1"
                    )}>
                      {product.name}
                    </h3>
                    
                    {/* Specs (list view only) */}
                    {viewMode === "list" && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.specs.map((spec, i) => (
                          <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-display font-bold text-lg text-foreground">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 gradient-primary" 
                      disabled={!product.inStock}
                      asChild
                    >
                      <a href="tel:+919876543210">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1" 
                      disabled={!product.inStock}
                      asChild
                    >
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Sales;
