
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

export default function PhotoUpload() {
  return (
    <div>
      <Label>Add Photos (Optional)</Label>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
        <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">Upload photos to help us understand the issue</p>
        <Button variant="outline" size="sm" disabled>
          Choose Photos
        </Button>
      </div>
    </div>
  );
}
