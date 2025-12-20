import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const HeaderContent = () => {
  const { toast } = useToast();
  
  const [content, setContent] = useState({
    siteName: "Paradeep Online Computer Services",
    tagline: "Your Trusted Tech Partner",
    logoUrl: "",
    phoneNumber: "+91 1234567890",
    email: "info@paradeeponline.com",
  });

  const [navItems, setNavItems] = useState([
    { label: "Home", path: "/" },
    { label: "Sales", path: "/sales" },
    { label: "Services", path: "/services" },
    { label: "Support", path: "/support" },
    { label: "About Us", path: "/about" },
    { label: "Blog", path: "/blog" },
  ]);

  const handleChange = (key: keyof typeof content, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleNavChange = (index: number, field: "label" | "path", value: string) => {
    setNavItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = () => {
    toast({
      title: "Header content saved",
      description: "Your header settings have been updated.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Header Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your website header
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Branding */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>
            Set your site name, tagline, and logo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={content.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={content.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/50">
                {content.logoUrl ? (
                  <img
                    src={content.logoUrl}
                    alt="Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Upload Logo
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 200x60px, PNG or SVG
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Contact details shown in the header
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={content.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={content.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Navigation Menu</CardTitle>
          <CardDescription>
            Configure the main navigation links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input
                    value={item.label}
                    onChange={(e) => handleNavChange(index, "label", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Path</Label>
                  <Input
                    value={item.path}
                    onChange={(e) => handleNavChange(index, "path", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeaderContent;
