import { useState } from "react";
import { Save, Plus, Trash2, GripVertical } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Headline {
  id: string;
  text: string;
  link: string;
  active: boolean;
}

const HeadlinesContent = () => {
  const { toast } = useToast();
  
  const [isEnabled, setIsEnabled] = useState(true);
  const [speed, setSpeed] = useState("30");
  const [headlines, setHeadlines] = useState<Headline[]>([
    { id: "1", text: "🎉 Grand Opening Sale - Get 20% off on all services!", link: "/sales", active: true },
    { id: "2", text: "💻 New Gaming Laptops Now Available", link: "/sales", active: true },
    { id: "3", text: "🔧 Free Diagnostic for First-Time Customers", link: "/services", active: true },
    { id: "4", text: "📞 24/7 Support Available - Call Now!", link: "/support", active: true },
  ]);

  const handleHeadlineChange = (id: string, field: keyof Headline, value: string | boolean) => {
    setHeadlines((prev) =>
      prev.map((headline) =>
        headline.id === id ? { ...headline, [field]: value } : headline
      )
    );
  };

  const addHeadline = () => {
    const newHeadline: Headline = {
      id: Date.now().toString(),
      text: "New headline text",
      link: "/",
      active: true,
    };
    setHeadlines((prev) => [...prev, newHeadline]);
  };

  const removeHeadline = (id: string) => {
    if (headlines.length > 1) {
      setHeadlines((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const handleSave = () => {
    toast({
      title: "Headlines saved",
      description: "Your scrolling headlines have been updated.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Scrolling Headlines</h1>
          <p className="text-muted-foreground mt-1">
            Manage the news ticker displayed at the top
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addHeadline} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Headline
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>
            Configure how the headlines appear
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-medium">Enable Headlines</Label>
              <p className="text-sm text-muted-foreground">
                Show the scrolling headline ticker
              </p>
            </div>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>

          <div className="space-y-2">
            <Label>Scroll Speed (seconds)</Label>
            <Input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-32"
              min="10"
              max="60"
            />
            <p className="text-xs text-muted-foreground">
              Lower number = faster scroll
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Headlines */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Headlines</CardTitle>
          <CardDescription>
            Add, edit, or remove headlines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {headlines.map((headline, index) => (
            <div
              key={headline.id}
              className="flex items-start gap-4 p-4 border rounded-lg bg-muted/30"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab mt-2" />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    #{index + 1}
                  </span>
                  <Switch
                    checked={headline.active}
                    onCheckedChange={(checked) =>
                      handleHeadlineChange(headline.id, "active", checked)
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    {headline.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Text</Label>
                    <Input
                      value={headline.text}
                      onChange={(e) =>
                        handleHeadlineChange(headline.id, "text", e.target.value)
                      }
                      placeholder="Headline text"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Link (optional)</Label>
                    <Input
                      value={headline.link}
                      onChange={(e) =>
                        handleHeadlineChange(headline.id, "link", e.target.value)
                      }
                      placeholder="/page"
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeHeadline(headline.id)}
                disabled={headlines.length === 1}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-primary text-primary-foreground py-2 px-4 rounded-lg overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              {headlines
                .filter((h) => h.active)
                .map((h) => h.text)
                .join("  •  ")}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeadlinesContent;
