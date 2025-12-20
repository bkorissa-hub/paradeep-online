import { useState } from "react";
import { Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    showScrollingHeadline: true,
    showPromotionalBanner: true,
    showSidebar: true,
    enableWhatsApp: true,
    enablePhoneContact: true,
    enableTicketing: true,
    maintenanceMode: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const featureToggles = [
    {
      key: "showScrollingHeadline" as const,
      title: "Scrolling Headline",
      description: "Show the scrolling news ticker at the top of the page",
    },
    {
      key: "showPromotionalBanner" as const,
      title: "Promotional Banner",
      description: "Display the promotional banner below the header",
    },
    {
      key: "showSidebar" as const,
      title: "Right Sidebar",
      description: "Show the sidebar on applicable pages",
    },
  ];

  const contactToggles = [
    {
      key: "enableWhatsApp" as const,
      title: "WhatsApp Contact",
      description: "Enable WhatsApp button for customer inquiries",
    },
    {
      key: "enablePhoneContact" as const,
      title: "Phone Contact",
      description: "Show phone number for direct calls",
    },
    {
      key: "enableTicketing" as const,
      title: "Support Ticketing",
      description: "Allow customers to create support tickets",
    },
  ];

  const systemToggles = [
    {
      key: "maintenanceMode" as const,
      title: "Maintenance Mode",
      description: "Put the website in maintenance mode (visitors will see a maintenance page)",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage website features and toggles
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Feature Toggles */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>
            Enable or disable website features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {featureToggles.map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div className="space-y-0.5">
                <Label htmlFor={toggle.key} className="text-base font-medium">
                  {toggle.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
              <Switch
                id={toggle.key}
                checked={settings[toggle.key]}
                onCheckedChange={() => handleToggle(toggle.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Options */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Contact Options</CardTitle>
          <CardDescription>
            Configure customer contact methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactToggles.map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div className="space-y-0.5">
                <Label htmlFor={toggle.key} className="text-base font-medium">
                  {toggle.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
              <Switch
                id={toggle.key}
                checked={settings[toggle.key]}
                onCheckedChange={() => handleToggle(toggle.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="border-0 shadow-sm border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">System Settings</CardTitle>
          <CardDescription>
            Critical system controls - use with caution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {systemToggles.map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div className="space-y-0.5">
                <Label htmlFor={toggle.key} className="text-base font-medium">
                  {toggle.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
              <Switch
                id={toggle.key}
                checked={settings[toggle.key]}
                onCheckedChange={() => handleToggle(toggle.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
