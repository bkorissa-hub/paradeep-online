import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "HP Pavilion 15 Laptop",
    category: "Laptops",
    price: "₹54,999",
    originalPrice: "₹64,999",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Dell OptiPlex Desktop",
    category: "Desktops",
    price: "₹42,500",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Logitech MX Master 3",
    category: "Accessories",
    price: "₹8,999",
    originalPrice: "₹10,999",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    badge: "Sale",
  },
  {
    id: 4,
    name: "Samsung 27\" Monitor",
    category: "Monitors",
    price: "₹18,499",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Featured Products
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Popular Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Quality computers and accessories at competitive prices.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/sales">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "group bg-card rounded-xl border border-border overflow-hidden",
                "hover:shadow-card hover:border-primary/20 transition-all duration-300",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-square bg-secondary overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge 
                    className={cn(
                      "absolute top-3 left-3",
                      product.badge === "Sale" ? "bg-destructive" : "bg-primary"
                    )}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-display font-bold text-lg text-foreground">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gradient-primary" asChild>
                    <a href="tel:+919876543210">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" asChild>
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
      </div>
    </section>
  );
}
