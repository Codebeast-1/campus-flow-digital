
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function RequestForm() {
  const navigate = useNavigate();
  const { addRequest, currentUser } = useAppContext();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      location: "",
      startDate: undefined,
      endDate: undefined,
      facultyName: "", // Added for student requests
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      addRequest({
        title: values.title,
        description: values.description,
        type: values.type as any,
        location: values.location,
        startDate: values.startDate,
        endDate: values.endDate,
        requestor: {
          id: currentUser?.id || "",
          name: currentUser?.name || "",
          email: currentUser?.email || "",
          department: currentUser?.department || "",
        },
        facultyName: currentUser?.role === 'student' ? values.facultyName : undefined,
        currentStep: 0,
        steps: [
          {
            id: "",
            department: "Facilities",
            status: "pending",
          },
        ],
      });
      navigate("/requests");
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show faculty field only for students
  const isStudent = currentUser?.role === 'student';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter request title" 
                    {...field} 
                    className="hover:border-campus-blue transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            rules={{ required: "Request type is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="hover:border-campus-blue transition-colors">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="room_booking">Room Booking</SelectItem>
                    <SelectItem value="event_hosting">Event Hosting</SelectItem>
                    <SelectItem value="equipment_request">
                      Equipment Request
                    </SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed description"
                  className="min-h-[120px] hover:border-campus-blue transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (if applicable)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter location" 
                  {...field} 
                  className="hover:border-campus-blue transition-colors"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isStudent && (
          <FormField
            control={form.control}
            name="facultyName"
            rules={{ required: currentUser?.role === 'student' ? "Faculty name is required" : false }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter faculty member's name" 
                    {...field} 
                    className="hover:border-campus-blue transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal hover:border-campus-blue transition-colors",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal hover:border-campus-blue transition-colors",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <
                        (form.getValues("startDate") || new Date())
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="hover:scale-105 transition-transform"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="hover:translate-y-[-2px] transition-all"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
