"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, FileText, Brain, Video, CheckCircle2, ChevronDown, ArrowRight, BarChart3, Clock, Target, PlayCircle } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { question: "Is PrepPilot really free?", answer: "Yes, our core features including resume analysis and standard mock interviews are completely free. We also offer premium features for advanced interview coaching." },
    { question: "What file formats are supported?", answer: "Currently, we support PDF resumes up to 5MB in size. We extract and analyze the text using our proprietary AI model." },
    { question: "How does the AI scoring work?", answer: "Our AI evaluates your resume across 4 pillars: Impact & Quantification, Technical Depth, ATS Compatibility, and Structure & Brevity. It compares your resume against thousands of successful ones." },
    { question: "Can I use this without signing up?", answer: "Yes, basic resume analysis works without an account. However, you'll need to sign up to practice mock interviews and save your resume history." }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">PrepPilot</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent -z-10" />
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm">
              ✨ The #1 AI-Powered Platform for Tech Interviews
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
              Land Your Dream Job with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">AI-Powered</span> Interview Prep
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Upload your resume for instant AI analysis, practice with adaptive mock interviews, and get expert feedback — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/resume">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  Analyze Your Resume <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                  Start Mock Interview
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto py-8 border-y border-border/50">
              <div>
                <h3 className="text-3xl font-bold mb-1">10,000+</h3>
                <p className="text-muted-foreground text-sm">Resumes Analyzed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">95%</h3>
                <p className="text-muted-foreground text-sm">User Satisfaction</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">500+</h3>
                <p className="text-muted-foreground text-sm">Mock Interviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Supercharge Your Preparation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to stand out to recruiters and ace your technical interviews.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-md bg-background/50 backdrop-blur">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Instant Resume Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Upload your resume and get a comprehensive AI diagnostic: ATS compatibility score, skill gap analysis, and line-by-line improvement suggestions.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-background/50 backdrop-blur">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-violet-500" />
                  </div>
                  <CardTitle>Adaptive AI Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Practice with an AI interviewer that reads your resume and tailors questions to your target role. Get scored feedback instantly.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-background/50 backdrop-blur">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Video className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle>1-on-1 Expert Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Book video mock interviews with industry professionals. Get personalized, human feedback on your performance and presentation.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-16">Your Path to Success</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10 -translate-y-1/2"></div>
              
              {[
                { icon: FileText, title: "1. Upload Resume", desc: "Share your PDF resume" },
                { icon: BarChart3, title: "2. Get Diagnostic", desc: "Instant AI evaluation" },
                { icon: Video, title: "3. Mock Interview", desc: "Practice with AI or humans" },
                { icon: Target, title: "4. Land the Job", desc: "Ace the real interview" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center flex-1 bg-background p-4 rounded-xl">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-lg ring-4 ring-background">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Preview */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card rounded-2xl border shadow-2xl overflow-hidden">
              <div className="border-b p-6 bg-muted/30 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xl">Resume Intelligence Report</h3>
                  <p className="text-sm text-muted-foreground">Generated for Frontend Developer</p>
                </div>
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border">
                  <span className="font-bold text-xl text-primary">84</span>
                  <span className="text-muted-foreground">/100</span>
                </div>
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-sm">Impact & Quantification</span>
                      <span className="text-sm font-medium text-green-500">78</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[78%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-sm">Technical Depth</span>
                      <span className="text-sm font-medium text-green-500">91</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[91%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-sm">ATS Compatibility</span>
                      <span className="text-sm font-medium text-green-500">82</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[82%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-sm">Structure & Brevity</span>
                      <span className="text-sm font-medium text-green-500">85</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%]" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <h4 className="font-semibold text-lg">Want to see your score?</h4>
                  <p className="text-sm text-muted-foreground max-w-[250px]">Upload your resume now for an instant, free AI analysis of your strengths and weaknesses.</p>
                  <Link href="/resume">
                    <Button>Try it free <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-2">No signup required</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i} className="border shadow-sm cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="p-6 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{faq.question}</h4>
                      {openFaq === i && (
                        <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                      )}
                    </div>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-bold">PrepPilot</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">About</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
}
