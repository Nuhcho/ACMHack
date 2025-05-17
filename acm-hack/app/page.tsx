// app/home/page.tsx

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 flex flex-col items-center space-y-10">
      {/* Hero Section */}
      <Card className="w-full">
        <CardContent className="text-center space-y-4">
          <CardTitle className="text-4xl">
            Stomach Cancer Detection AI
          </CardTitle>
          <CardDescription>
            Upload an endoscopic image and let our CNN model highlight
            suspicious regions in seconds.
          </CardDescription>
        </CardContent>
      </Card>

      {/* Upload / Analyze Section */}
      <Card className="w-full">
        <CardContent className="flex flex-col items-center space-y-6">
          <Input
            type="file"
            accept="image/*"
            className="w-full"
          />
          <Button className="w-full">
            Analyze Image
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder for results */}
      <div id="result" className="w-full">
        {/* you can render heatmap overlay or confidence scores here */}
      </div>
    </div>
  );
}
