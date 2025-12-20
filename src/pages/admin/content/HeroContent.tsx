import { useState } from "react";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

const HeroContent = () => {
  const { toast } = useToast();
  
  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      id: "1",
      title: "Expert Computer Repair & Services",
      subtitle: "Professional solutions for all your tech needs. Fast, reliable, and affordable.",
      ctaText: "Get Started",
      ctaLink: "/services",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: "2",
      title: "Custom PC Builds",
      subtitle: "Build your dream computer with our expert guidance and quality components.",
      ctaText: "Build Now",
      ctaLink: "/sales",
      imageUrl: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1920&q=80",
    },
  ]);

  const handleSlideChange = (id: string, field: keyof HeroSlide, value: string) => {
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    );
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now().toString(),
      title: "New Slide Title",
      subtitle: "Add your description here",
      ctaText: "Learn More",
      ctaLink: "/",
      imageUrl: "",
    };
    setSlides((prev) => [...prev, newSlide]);
  };

  const removeSlide = (id: string) => {
    if (slides.length > 1) {
      setSlides((prev) => prev.filter((slide) => slide.id !== id));
    }
  };

  const handleSave = () => {
    toast({
      title: "Hero section saved",
      description: "Your hero slides have been updated.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
          <p className="text-muted-foreground mt-1">
            Manage your homepage hero carousel
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addSlide} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Slide
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Slides */}
      <div className="space-y-6">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div>
                  <CardTitle className="text-lg">Slide {index + 1}</CardTitle>
                  <CardDescription>Configure slide content and image</CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSlide(slide.id)}
                disabled={slides.length === 1}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => handleSlideChange(slide.id, "title", e.target.value)}
                    placeholder="Enter slide title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={slide.imageUrl}
                    onChange={(e) => handleSlideChange(slide.id, "imageUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Textarea
                  value={slide.subtitle}
                  onChange={(e) => handleSlideChange(slide.id, "subtitle", e.target.value)}
                  placeholder="Enter slide description"
                  rows={2}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>CTA Button Text</Label>
                  <Input
                    value={slide.ctaText}
                    onChange={(e) => handleSlideChange(slide.id, "ctaText", e.target.value)}
                    placeholder="Button text"
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA Link</Label>
                  <Input
                    value={slide.ctaLink}
                    onChange={(e) => handleSlideChange(slide.id, "ctaLink", e.target.value)}
                    placeholder="/services"
                  />
                </div>
              </div>

              {/* Preview */}
              {slide.imageUrl && (
                <div className="mt-4">
                  <Label className="mb-2 block">Preview</Label>
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center p-6">
                      <div>
                        <h3 className="text-xl font-bold">{slide.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{slide.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
