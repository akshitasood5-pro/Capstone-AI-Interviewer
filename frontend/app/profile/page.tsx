"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Rocket, Briefcase, Calendar, FileText, User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">PrepPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">Frontend Developer Candidate</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Info</CardTitle>
                <CardDescription>Update your personal details and bio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us a little about yourself..." defaultValue="Passionate frontend developer looking for new opportunities in the tech industry." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Goals</CardTitle>
                <CardDescription>What roles and companies are you targeting?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Target Role</Label>
                    <Input id="role" defaultValue="Frontend Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select defaultValue="mid">
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companies">Target Companies (comma separated)</Label>
                  <Input id="companies" defaultValue="Google, Meta, Vercel, Stripe" />
                </div>
                <div className="space-y-2 pt-2">
                  <Label>Key Skills</Label>
                  <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[50px] bg-muted/20">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Input className="h-6 w-32 border-none bg-transparent focus-visible:ring-0 p-0 text-sm shadow-none" placeholder="Add skill..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button size="lg">Save Profile</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Recent Reports</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b pb-3">
                    <div>
                      <p className="font-medium text-sm">Frontend Resume v2.pdf</p>
                      <p className="text-xs text-muted-foreground">Analyzed 2 days ago</p>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Score: 84</Badge>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">Software Eng Resume.pdf</p>
                      <p className="text-xs text-muted-foreground">Analyzed 2 weeks ago</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Score: 71</Badge>
                  </div>
                </div>
                <Button variant="link" className="w-full mt-2 text-primary">View all reports</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-muted-foreground text-sm">
                  <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>No upcoming interviews.</p>
                  <Button variant="outline" size="sm" className="mt-4">Book a session</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
