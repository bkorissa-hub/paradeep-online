import { useState } from "react";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SidebarWidget {
  id: string;
  type: "contact" | "hours" | "promo" | "social" | "custom";
  title: string;
  content: string;
  active: boolean;
}

const SidebarContent = () => {
  const { toast } = useToast();
  
  const [isEnabled, setIsEnabled] = useState(true);
  const [widgets, setWidgets] = useState<SidebarWidget[]>([
    {
      id: "1",
      type: "contact",
      title: "Contact Us",
      content: "Phone: +91 1234567890\nEmail: info@paradeeponline.com\nWhatsApp: +91 1234567890",
      active: true,
    },
    {
      id: "2",
      type: "hours",
      title: "Business Hours",
      content: "Mon-Sat: 9:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM",
      active: true,
    },
    {
      id: "3",
      type: "promo",
      title: "Special Offer",
      content: "Free diagnostics for new customers!",
      active: true,
    },
  ]);

  const handleWidgetChange = (id: string, field: keyof SidebarWidget, value: string | boolean) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id ? { ...widget, [field]: value } : widget
      )
    );
  };

  const addWidget = () => {
    const newWidget: SidebarWidget = {
      id: Date.now().toString(),
      type: "custom",
      title: "New Widget",
      content: "Widget content here",
      active: true,
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Sidebar saved",
      description: "Your sidebar widgets have been updated.",
    });
  };

  const widgetTypes = [
    { value: "contact", label: "Contact Information" },
    { value: "hours", label: "Business Hours" },
    { value: "promo", label: "Promotion" },
    { value: "social", label: "Social Links" },
    { value: "custom", label: "Custom Content" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sidebar</h1>
          <p className="text-muted-foreground mt-1">
            Configure the right sidebar widgets
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addWidget} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Widget
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Enable Toggle */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Enable Sidebar</Label>
              <p className="text-sm text-muted-foreground">
                Show the right sidebar on applicable pages
              </p>
            </div>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </CardContent>
      </Card>

      {/* Widgets */}
      <div className="space-y-4">
        {widgets.map((widget, index) => (
          <Card key={widget.id} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Widget {index + 1}
                  </span>
                  <Switch
                    checked={widget.active}
                    onCheckedChange={(checked) =>
                      handleWidgetChange(widget.id, "active", checked)
                    }
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeWidget(widget.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Widget Type</Label>
                  <Select
                    value={widget.type}
                    onValueChange={(value) =>
                      handleWidgetChange(widget.id, "type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {widgetTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={widget.title}
                    onChange={(e) =>
                      handleWidgetChange(widget.id, "title", e.target.value)
                    }
                    placeholder="Widget title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={widget.content}
                  onChange={(e) =>
                    handleWidgetChange(widget.id, "content", e.target.value)
                  }
                  placeholder="Widget content"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SidebarContent;
