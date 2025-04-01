
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddRowModal from "@/components/AddRowModal";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState<Record<string, any>>({});

  const sampleTemplate = {
    name: "Customer Contacts",
    columns: [
      {
        name: "Full Name",
        data_type: "text",
        required: true,
        description: "Enter the customer's full name"
      },
      {
        name: "Email",
        data_type: "text",
        required: true,
        description: "Primary email address for contact"
      },
      {
        name: "Status",
        data_type: "select",
        required: true,
        options: [
          { value: "New Lead" },
          { value: "Contacted" },
          { value: "Qualified" },
          { value: "Proposal" },
          { value: "Closed Won" },
          { value: "Closed Lost" }
        ]
      },
      {
        name: "Contact Date",
        data_type: "date",
        description: "Date of first contact with the customer"
      },
      {
        name: "Assigned To",
        data_type: "user",
        options: [
          { value: "John Smith", user_id: "user_1" },
          { value: "Sarah Johnson", user_id: "user_2" },
          { value: "Mike Thompson", user_id: "user_3" }
        ]
      },
      {
        name: "Notes",
        data_type: "text",
        description: "Additional information about the contact"
      }
    ]
  };

  const handleInputChange = (field: string, value: any) => {
    setRowData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted data:", rowData);
    // Here you would typically send the data to your API
    setIsModalOpen(false);
    // Show success message
    alert("Row added successfully!");
    setRowData({});
  };

  return (
    <div className="container max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Home</span>
        </Link>
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Beautiful Modal Demo
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Click the button below to see our vibrant, responsive modal for adding a new row.
        </p>
      </div>
      
      <div className="flex justify-center mb-12">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 px-8 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all"
        >
          Open Add Row Modal
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Features of this modal:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Beautiful gradient backgrounds and subtle animations</li>
          <li>Fully responsive design that works on all device sizes</li>
          <li>Different input types (text, select, date picker, user selector)</li>
          <li>Helpful descriptions and icons for improved user experience</li>
          <li>Interactive hover effects and transitions</li>
          <li>Dark mode compatible with elegant styling</li>
        </ul>
      </div>
      
      <AddRowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={sampleTemplate}
        onSubmit={handleSubmit}
        newRowData={rowData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default ModalDemo;
