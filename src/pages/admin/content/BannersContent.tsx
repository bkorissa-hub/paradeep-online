import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const BannersContent = () => {
  const { toast } = useToast();
  
  const [isEnabled, setIsEnabled] = useState(true);
  const [banner, setBanner] = useState({
    title: "Special Offer!",
    description: "Get 25% off on all laptop repairs this month. Limited time only!",
    ctaText: "Claim Offer",
    ctaLink: "/services",
    backgroundColor: "gradient",
    imageUrl: "",
  });

  const handleChange = (field: keyof typeof banner, value: string) => {
    setBanner((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Banner saved",
      description: "Your promotional banner has been updated.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Promotional Banner</h1>
          <p className="text-muted-foreground mt-1">
            Configure the promotional banner displayed on the homepage
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Enable Toggle */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Enable Banner</Label>
              <p className="text-sm text-muted-foreground">
                Show the promotional banner on the homepage
              </p>
            </div>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </CardContent>
      </Card>

      {/* Banner Content */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Banner Content</CardTitle>
          <CardDescription>
            Set the text and call-to-action for your banner
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={banner.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Banner title"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={banner.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Banner description"
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={banner.ctaText}
                onChange={(e) => handleChange("ctaText", e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div className="space-y-2">
              <Label>Button Link</Label>
              <Input
                value={banner.ctaLink}
                onChange={(e) => handleChange("ctaLink", e.target.value)}
                placeholder="/services"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the banner style
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Background Style</Label>
            <Select
              value={banner.backgroundColor}
              onValueChange={(value) => handleChange("backgroundColor", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gradient">Gradient (Primary)</SelectItem>
                <SelectItem value="solid">Solid Color</SelectItem>
                <SelectItem value="image">Background Image</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {banner.backgroundColor === "image" && (
            <div className="space-y-2">
              <Label>Background Image URL</Label>
              <div className="flex gap-2">
                <Input
                  value={banner.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  placeholder="https://..."
                />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-primary-foreground">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{banner.title}</h3>
                <p className="text-primary-foreground/90 mt-1">{banner.description}</p>
              </div>
              <Button variant="secondary" className="whitespace-nowrap">
                {banner.ctaText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BannersContent;
