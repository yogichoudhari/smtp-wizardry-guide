
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Type, Info, Plus, User, ListFilter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface Column {
  name: string;
  data_type: string;
  required?: boolean;
  description?: string;
  options?: Array<{ value: string; user_id?: string }>;
}

interface Template {
  name: string;
  columns: Column[];
}

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template;
  onSubmit: () => void;
  newRowData: Record<string, any>;
  handleInputChange: (field: string, value: any) => void;
}

const getDataTypeIcon = (dataType: string) => {
  switch (dataType) {
    case "text":
      return <Type className="h-4 w-4" />;
    case "date":
      return <CalendarIcon className="h-4 w-4" />;
    case "select":
      return <ListFilter className="h-4 w-4" />;
    case "user":
      return <User className="h-4 w-4" />;
    default:
      return <Type className="h-4 w-4" />;
  }
};

export const AddRowModal: React.FC<AddRowModalProps> = ({
  isOpen,
  onClose,
  template,
  onSubmit,
  newRowData,
  handleInputChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 border border-indigo-100 dark:border-indigo-900 shadow-lg">
        <div className="absolute -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/20 via-purple-100/5 to-transparent opacity-50"></div>
        
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/50 p-3">
              <Plus className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Add New Row
              </DialogTitle>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                To {template?.name} Template
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 pt-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {template.columns.map((column, index) => (
              <div key={index} className="space-y-2 group">
                <div className="flex items-center mb-1.5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 mr-2 transition-all group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50">
                    {getDataTypeIcon(column.data_type)}
                  </div>
                  <Label className="font-medium text-sm text-slate-700 dark:text-slate-300">
                    {column.name}
                    {column.required && (
                      <span className="text-rose-500 ml-1">*</span>
                    )}
                  </Label>
                </div>

                {column.data_type === "select" && (
                  <Select
                    value={newRowData[column.name] || ""}
                    onValueChange={(value) => handleInputChange(column.name, value)}
                  >
                    <SelectTrigger className="w-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-700">
                      <SelectValue placeholder={`Select ${column.name}`} />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {column.options?.map((option, idx) => (
                        <SelectItem key={idx} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {column.data_type === "date" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-700"
                      >
                        {newRowData[column.name] ? (
                          format(new Date(newRowData[column.name]), "PPP")
                        ) : (
                          <span className="text-muted-foreground">Select date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newRowData[column.name] ? new Date(newRowData[column.name]) : undefined}
                        onSelect={(date) => handleInputChange(column.name, date?.toISOString().split("T")[0] || "")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}

                {column.data_type === "user" && (
                  <Select
                    value={newRowData[column.name] || ""}
                    onValueChange={(value) => handleInputChange(column.name, value)}
                  >
                    <SelectTrigger className="w-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-700">
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {column.options?.map((user, idx) => (
                        <SelectItem key={idx} value={user.user_id || user.value}>
                          {user.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {column.data_type === "text" && (
                  <div className="relative">
                    <Textarea
                      value={newRowData[column.name] || ""}
                      onChange={(e) => handleInputChange(column.name, e.target.value)}
                      placeholder={`Enter ${column.name}`}
                      className="min-h-[80px] resize-none border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-700"
                    />
                    <Type className="absolute right-3 bottom-3 h-4 w-4 text-slate-400" />
                  </div>
                )}

                {column.description && (
                  <div className="flex items-start gap-1.5 mt-1.5">
                    <Info className="h-3.5 w-3.5 text-slate-400 mt-0.5" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {column.description}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="flex justify-between p-6 pt-2 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700">
          <Button variant="outline" onClick={onClose} className="hover:bg-slate-100 dark:hover:bg-slate-700">
            Cancel
          </Button>
          <Button 
            onClick={onSubmit} 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            Add Row
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRowModal;
