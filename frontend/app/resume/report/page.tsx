"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, Lightbulb, Target } from "lucide-react";
import { ResumeAnalysisReport } from "@/lib/types";

export default function ResumeReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<ResumeAnalysisReport | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("prepPilot_mockReport");
    if (stored) {
      try {
        setReport(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No report found</h2>
          <Button onClick={() => router.push("/resume")}>Go back to upload</Button>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <nav className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/resume")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="font-semibold hidden sm:inline">PrepPilot</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/resume")}>Upload Another</Button>
            <Button size="sm">Share Report</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
        {/* Header & Overall Score */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Executive Summary</CardTitle>
                  <CardDescription>AI evaluation of your resume content and structure.</CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">Grade: {report.grade}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {report.summary}
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col items-center justify-center py-8 bg-card relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary to-violet-500" />
            <h3 className="font-semibold text-muted-foreground mb-4">Overall Score</h3>
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeDasharray={`${report.overall_score * 2.827} 282.7`} 
                  className={getScoreColor(report.overall_score)} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{report.overall_score}</span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {report.category_scores.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-medium">{cat.category || cat.category_name}</span>
                    <span className={`font-bold ${getScoreColor(cat.score)}`}>{cat.score}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBg(cat.score)}`} style={{ width: `${cat.score}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{cat.feedback || cat.feedback_text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" /> Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" /> Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report.weaknesses.map((wk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" /> Actionable Improvements
            </CardTitle>
            <CardDescription>Direct suggestions to rewrite parts of your resume.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {report.improvements.map((imp, i) => (
              <div key={i} className="border rounded-xl p-5 bg-card">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{imp.section}</span>
                  <Badge variant={imp.priority === "high" ? "destructive" : "secondary"}>
                    {imp.priority} priority
                  </Badge>
                </div>
                <p className="font-medium mb-3">{imp.issue}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 relative">
                    <span className="absolute -top-3 left-4 bg-background px-2 text-xs font-semibold text-red-500 border border-red-500/20 rounded">Before</span>
                    <p className="text-sm mt-1">{imp.before_text}</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 relative">
                    <span className="absolute -top-3 left-4 bg-background px-2 text-xs font-semibold text-green-500 border border-green-500/20 rounded">Suggested</span>
                    <p className="text-sm mt-1">{imp.suggested_text}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills & Interview Prep */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Detected Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {report.skills.map((group, i) => (
                <div key={i}>
                  <h4 className="text-sm font-semibold capitalize text-muted-foreground mb-2">{group.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, j) => (
                      <Badge key={j} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Recommended Interview Topics
              </CardTitle>
              <CardDescription>Based on your resume, our AI suggests preparing for these topics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-8">
                {report.recommended_interview_topics.map((topic, i) => (
                  <div key={i} className="bg-background border rounded-lg px-4 py-2 text-sm font-medium shadow-sm">
                    {topic}
                  </div>
                ))}
              </div>
              <Button className="w-full h-12 text-lg group">
                Start Mock Interview <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
