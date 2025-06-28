
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Upload } from "lucide-react";

const DocumentsTab: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Required Documents</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Driver's License</p>
              <p className="text-sm text-muted-foreground">Expires: Dec 2025</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Insurance Certificate</p>
              <p className="text-sm text-muted-foreground">Expires: Mar 2024</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Background Check</p>
              <p className="text-sm text-muted-foreground">Completed: Jan 2024</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Passed
          </Badge>
        </div>
      </div>
      
      <Button className="w-full mt-4" variant="outline">
        <Upload className="h-4 w-4 mr-2" />
        Upload New Document
      </Button>
    </Card>
  );
};

export default DocumentsTab;
