
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Shield, Upload, Download, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected';
  uploadDate: string;
  expiryDate?: string;
  file?: File;
}

const DocumentsTab: React.FC = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: "Driver's License",
      type: 'license',
      status: 'verified',
      uploadDate: '2024-01-15',
      expiryDate: '2025-12-31'
    },
    {
      id: '2',
      name: "Insurance Certificate",
      type: 'insurance',
      status: 'verified',
      uploadDate: '2024-01-20',
      expiryDate: '2024-03-31'
    },
    {
      id: '3',
      name: "Background Check",
      type: 'background',
      status: 'verified',
      uploadDate: '2024-01-10'
    }
  ]);

  const handleFileUpload = (documentType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newDoc: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: documentType,
      status: 'pending',
      uploadDate: new Date().toISOString().split('T')[0],
      file: file
    };

    setDocuments(prev => [...prev, newDoc]);
    
    toast({
      title: "Document Uploaded",
      description: `${file.name} has been uploaded successfully and is pending review.`
    });
  };

  const handleDownload = (doc: Document) => {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name}...`
    });
  };

  const handleView = (doc: Document) => {
    toast({
      title: "View Document",
      description: `Opening ${doc.name} for preview...`
    });
  };

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Document Deleted",
      description: "The document has been removed successfully."
    });
  };

  const getStatusBadge = (status: Document['status']) => {
    const variants = {
      verified: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge variant="secondary" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">Required Documents</h3>
      </div>
      
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Uploaded: {doc.uploadDate}</span>
                  {doc.expiryDate && (
                    <span>• Expires: {doc.expiryDate}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(doc.status)}
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(doc)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(doc)}
                  className="h-8 w-8 p-0"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(doc.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 space-y-3">
        <h4 className="font-medium">Upload New Documents</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="license-upload" className="block text-sm font-medium mb-2">
              Driver's License
            </label>
            <Input
              id="license-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('license', e)}
              className="cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="insurance-upload" className="block text-sm font-medium mb-2">
              Insurance Certificate
            </label>
            <Input
              id="insurance-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('insurance', e)}
              className="cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="other-upload" className="block text-sm font-medium mb-2">
              Other Document
            </label>
            <Input
              id="other-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload('other', e)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      <Button className="w-full mt-4" variant="outline">
        <Upload className="h-4 w-4 mr-2" />
        Upload Multiple Documents
      </Button>
    </Card>
  );
};

export default DocumentsTab;
