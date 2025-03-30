
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Email Workflow Platform</h1>
        <p className="text-xl text-gray-600 mb-8">Create powerful email workflows using your own email provider</p>
        
        <Link to="/smtp-guide">
          <Button size="lg" className="gap-2">
            <Mail className="h-5 w-5" /> SMTP Configuration Guide
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
