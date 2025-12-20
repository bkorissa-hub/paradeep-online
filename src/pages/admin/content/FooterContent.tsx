import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FooterLink {
  id: string;
  label: string;
  url: string;
}

interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

const FooterContent = () => {
  const { toast } = useToast();
  
  const [footer, setFooter] = useState({
    companyName: "Paradeep Online Computer Services",
    description: "Your trusted partner for all computer sales, service, and repair needs. Quality service since 2010.",
    copyright: "© 2024 Paradeep Online Computer Services. All rights reserved.",
    phone: "+91 1234567890",
    email: "info@paradeeponline.com",
    address: "123 Tech Street, Paradeep, Odisha, India",
  });

  const [socialLinks, setSocialLinks] = useState([
    { id: "1", platform: "Facebook", url: "https://facebook.com" },
    { id: "2", platform: "Twitter", url: "https://twitter.com" },
    { id: "3", platform: "Instagram", url: "https://instagram.com" },
    { id: "4", platform: "WhatsApp", url: "https://wa.me/911234567890" },
  ]);

  const [columns, setColumns] = useState<FooterColumn[]>([
    {
      id: "1",
      title: "Quick Links",
      links: [
        { id: "1", label: "Home", url: "/" },
        { id: "2", label: "About Us", url: "/about" },
        { id: "3", label: "Services", url: "/services" },
        { id: "4", label: "Contact", url: "/support" },
      ],
    },
    {
      id: "2",
      title: "Services",
      links: [
        { id: "1", label: "Hardware Repair", url: "/services#hardware" },
        { id: "2", label: "Software Services", url: "/services#software" },
        { id: "3", label: "Custom Builds", url: "/services#builds" },
        { id: "4", label: "On-site Support", url: "/services#onsite" },
      ],
    },
  ]);

  const handleFooterChange = (field: keyof typeof footer, value: string) => {
    setFooter((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (id: string, field: "platform" | "url", value: string) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [
      ...prev,
      { id: Date.now().toString(), platform: "New Platform", url: "" },
    ]);
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleColumnLinkChange = (
    columnId: string,
    linkId: string,
    field: "label" | "url",
    value: string
  ) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              links: col.links.map((link) =>
                link.id === linkId ? { ...link, [field]: value } : link
              ),
            }
          : col
      )
    );
  };

  const addColumnLink = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              links: [...col.links, { id: Date.now().toString(), label: "New Link", url: "/" }],
            }
          : col
      )
    );
  };

  const removeColumnLink = (columnId: string, linkId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, links: col.links.filter((link) => link.id !== linkId) }
          : col
      )
    );
  };

  const handleSave = () => {
    toast({
      title: "Footer saved",
      description: "Your footer content has been updated.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Footer</h1>
          <p className="text-muted-foreground mt-1">
            Configure your website footer
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Company Info */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Basic information displayed in the footer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={footer.companyName}
                onChange={(e) => handleFooterChange("companyName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Copyright Text</Label>
              <Input
                value={footer.copyright}
                onChange={(e) => handleFooterChange("copyright", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={footer.description}
              onChange={(e) => handleFooterChange("description", e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={footer.phone}
                onChange={(e) => handleFooterChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={footer.email}
                onChange={(e) => handleFooterChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={footer.address}
                onChange={(e) => handleFooterChange("address", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Social media profiles</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={addSocialLink}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {socialLinks.map((link) => (
            <div key={link.id} className="flex items-center gap-3">
              <Input
                value={link.platform}
                onChange={(e) => handleSocialChange(link.id, "platform", e.target.value)}
                placeholder="Platform"
                className="w-32"
              />
              <Input
                value={link.url}
                onChange={(e) => handleSocialChange(link.id, "url", e.target.value)}
                placeholder="URL"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(link.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Footer Columns */}
      {columns.map((column) => (
        <Card key={column.id} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{column.title}</CardTitle>
              <CardDescription>Navigation links</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => addColumnLink(column.id)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Link
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {column.links.map((link) => (
              <div key={link.id} className="flex items-center gap-3">
                <Input
                  value={link.label}
                  onChange={(e) =>
                    handleColumnLinkChange(column.id, link.id, "label", e.target.value)
                  }
                  placeholder="Label"
                  className="w-40"
                />
                <Input
                  value={link.url}
                  onChange={(e) =>
                    handleColumnLinkChange(column.id, link.id, "url", e.target.value)
                  }
                  placeholder="URL"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeColumnLink(column.id, link.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FooterContent;
