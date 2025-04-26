
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import { UserRole } from "@/types";
import { GraduationCap, User, Building, ArrowRight } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loginUser, signupUser } = useAppContext();
  const [activeTab, setActiveTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    loginUser(loginData.email, loginData.password, selectedRole);
    navigate("/");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    signupUser({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      role: selectedRole,
      department: signupData.department || "General"
    });
    
    toast({
      title: "Account created!",
      description: "You can now log in with your credentials"
    });
    
    setActiveTab("login");
  };

  const RoleIcon = () => {
    switch (selectedRole) {
      case "admin":
        return <Building className="h-6 w-6" />;
      case "faculty":
        return <User className="h-6 w-6" />;
      case "student":
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-blue/90 to-campus-teal/90 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-lg shadow-lg overflow-hidden">
        <div className="lg:w-1/2 bg-campus-blue p-8 flex flex-col justify-center">
          <div className="text-white space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-md p-2">
                <RoleIcon />
              </div>
              <h1 className="text-3xl font-bold">CampusFlow</h1>
            </div>
            <h2 className="text-2xl font-semibold">Digital Permission Management</h2>
            <p className="opacity-80">
              Streamline your campus requests with our digital workflow system. 
              Book lecture halls, submit event requests, and track approvals all in one place.
            </p>
            
            <div className="pt-6">
              <div className="border-l-4 border-campus-teal pl-4 italic opacity-80">
                "CampusFlow has transformed how we manage requests on campus, saving time and eliminating paperwork."
                <p className="font-semibold mt-2">- Campus Administrator</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 bg-white p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-lg">Login</TabsTrigger>
              <TabsTrigger value="signup" className="text-lg">Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <Card>
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your credentials below to access CampusFlow</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@campus.edu" 
                        value={loginData.email}
                        onChange={e => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-campus-blue hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        value={loginData.password}
                        onChange={e => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>I am a:</Label>
                      <div className="grid grid-cols-3 gap-3 pt-1">
                        <Button 
                          type="button"
                          variant={selectedRole === "student" ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center p-3 h-auto space-y-1 transition-all ${
                            selectedRole === "student" ? "border-2 border-campus-blue" : ""
                          }`}
                          onClick={() => setSelectedRole("student")}
                        >
                          <GraduationCap className="h-6 w-6" />
                          <span>Student</span>
                        </Button>
                        <Button 
                          type="button"
                          variant={selectedRole === "faculty" ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center p-3 h-auto space-y-1 transition-all ${
                            selectedRole === "faculty" ? "border-2 border-campus-blue" : ""
                          }`}
                          onClick={() => setSelectedRole("faculty")}
                        >
                          <User className="h-6 w-6" />
                          <span>Faculty</span>
                        </Button>
                        <Button 
                          type="button"
                          variant={selectedRole === "admin" ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center p-3 h-auto space-y-1 transition-all ${
                            selectedRole === "admin" ? "border-2 border-campus-blue" : ""
                          }`}
                          onClick={() => setSelectedRole("admin")}
                        >
                          <Building className="h-6 w-6" />
                          <span>Admin</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full group hover:translate-y-[-2px] transition-all"
                    >
                      Login
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Fill in your details to join CampusFlow</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="John Doe" 
                        value={signupData.name}
                        onChange={e => setSignupData({...signupData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="you@campus.edu" 
                        value={signupData.email}
                        onChange={e => setSignupData({...signupData, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input 
                          id="signup-password" 
                          type="password"
                          value={signupData.password}
                          onChange={e => setSignupData({...signupData, password: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={signupData.confirmPassword}
                          onChange={e => setSignupData({...signupData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department" 
                        type="text" 
                        placeholder="e.g. Computer Science"
                        value={signupData.department}
                        onChange={e => setSignupData({...signupData, department: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>I am a:</Label>
                      <div className="grid grid-cols-3 gap-3 pt-1">
                        <Button 
                          type="button"
                          variant={selectedRole === "student" ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center p-3 h-auto space-y-1 transition-all ${
                            selectedRole === "student" ? "border-2 border-campus-blue" : ""
                          }`}
                          onClick={() => setSelectedRole("student")}
                        >
                          <GraduationCap className="h-6 w-6" />
                          <span>Student</span>
                        </Button>
                        <Button 
                          type="button"
                          variant={selectedRole === "faculty" ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center p-3 h-auto space-y-1 transition-all ${
                            selectedRole === "faculty" ? "border-2 border-campus-blue" : ""
                          }`}
                          onClick={() => setSelectedRole("faculty")}
                        >
                          <User className="h-6 w-6" />
                          <span>Faculty</span>
                        </Button>
                        <Button 
                          type="button"
                          variant={selectedRole === "admin" ? "default" : "outline"}
                          className={`flex flex-col items-center justify-center p-3 h-auto space-y-1 transition-all ${
                            selectedRole === "admin" ? "border-2 border-campus-blue" : ""
                          }`}
                          onClick={() => setSelectedRole("admin")}
                        >
                          <Building className="h-6 w-6" />
                          <span>Admin</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full group hover:translate-y-[-2px] transition-all"
                    >
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
