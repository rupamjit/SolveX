import React from "react";
import {
  Code2,
  Trophy,
  Users,
  Zap,
  ChevronRight,
  Play,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { onBoardUser } from "@/modules/auth/actions/auth";
import { Cover } from "@/components/ui/cover";
import { Meteors } from "@/components/ui/meteors";
import { cn } from "@/lib/utils";
import TestimonialsComponent, {
  TestimonialItem,
} from "@/components/ui/testimonials-component";
import Footer from "@/components/home/Footer";

export default async function Home() {
  await onBoardUser();

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "High-Frequency Runtime",
      description:
        "A proprietary distributed compiler engine. Execute algorithms against dense datasets with sub-millisecond latency and guaranteed consistency.",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Algorithmic Forensics",
      description:
        "Advanced telemetry for every submission. Real-time visualization of memory allocation and theoretical complexity curves.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "The Elite Collective",
      description:
        "A private ecosystem for high-signal engineers. Exchange architectural blueprints and optimized strategies with the industry's top 1%.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Frictionless Workflow",
      description:
        "A zero-latency interface designed for pure logic. Eliminating the distance between thought and execution through architectural clarity.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Problems Solved" },
    { number: "10K+", label: "Active Developers" },
    { number: "25+", label: "Programming Languages" },
    { number: "98%", label: "Success Rate" },
  ];

  const problemCategories = [
    {
      level: "Beginner",
      title: "Foundation Path",
      description:
        "Master the basics of programming with simple puzzles and logic games.",
      count: "500+ Problems",
      color: "emerald",
    },
    {
      level: "Intermediate",
      title: "Advanced Logic",
      description:
        "Deep dive into complex algorithms and specialized data structures.",
      count: "800+ Problems",
      color: "amber",
    },
    {
      level: "Expert",
      title: "Mastery Tier",
      description:
        "Tackle the hardest problems designed for competitive programming.",
      count: "300+ Problems",
      color: "rose",
    },
  ];

  const testimonials: TestimonialItem[] = [
    {
      name: "Sarah Jenkins",
      role: "Full Stack Engineer",
      company: "Google",
      avatar:
        "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto",
      rating: 5,
      content:
        "SolveX was pivotal in my journey to Google. The problem sets are so close to what I faced during the actual technical rounds.",
    },
    {
      name: "Marcus Chen",
      role: "Software Architect",
      company: "Meta",
      avatar:
        "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
      rating: 5,
      content:
        "I recommend SolveX to all my mentees. The real-time metrics help identify exactly where you need to optimize your logic.",
    },
    {
      name: "Elena Rodriguez",
      role: "Backend Developer",
      company: "Amazon",
      avatar:
        "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto",
      rating: 5,
      content:
        "The interface is distraction-free, allowing for deep work. It's the most polished platform I've used for competitive programming.",
    },
    {
      name: "David Kim",
      role: "Frontend Lead",
      company: "Vercel",
      avatar:
        "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto",
      rating: 5,
      content:
        "Sub-millisecond latency and a beautiful UI—SolveX makes practicing algorithms actually enjoyable.",
    },
  ];
  return (
    <div className="min-h-screen  transition-colors mt-24">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 flex flex-col items-center px-4 overflow-hidden">
        {/* Meteors background */}
        <div className="absolute inset-0 z-0">
          <Meteors number={30} maxDuration={15} />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge
            variant="secondary"
            className="mb-8 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
          >
            <Users className="w-4 h-4 mr-2" />
            10,000+ developers joined
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-5xl mx-auto py-6 bg-clip-text text-transparent bg-linear-to-b from-neutral-900 via-neutral-700 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400">
            Solve Coding Questions <br /> <Cover>Like A Pro</Cover>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Browse coding questions, write solutions, and submit your code in a
            clean and focused environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 cursor-pointer text-white"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Solving
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-indigo-300 text-indigo-700 cursor-pointer"
            >
              Browse Problems
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 bg-gray-50 dark:bg-neutral-900/50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-20">
            <Badge
              variant="outline"
              className="mb-8 px-4 py-1.5 border-amber-500/20 text-amber-600 dark:text-amber-500 bg-amber-500/5 backdrop-blur-sm rounded-full tracking-widest text-xs font-bold uppercase"
            >
              System Capabilities
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight max-w-4xl">
              Features <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-600 via-amber-500 to-amber-300">
                You Will Get
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed antialiased">
              Unlock your potential with an environment built for speed, depth,
              and absolute clarity. The future of competitive programming is
              here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative h-full p-px rounded-[2rem] overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-transparent group-hover:from-amber-500/40 group-hover:via-amber-500/10 group-hover:to-transparent transition-all duration-700" />

                <div className="relative h-full bg-white dark:bg-neutral-950 p-8 rounded-[1.95rem] flex flex-col items-center text-center transition-colors duration-500 group-hover:bg-amber-50/50 dark:group-hover:bg-amber-950/10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />

                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div
                      className={cn(
                        "relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                        index % 2 === 0 ? "text-amber-500" : "text-indigo-500",
                      )}
                    >
                      {React.cloneElement(feature.icon as any, {
                        className:
                          "w-8 h-8 group-hover:scale-110 transition-transform duration-500",
                      })}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm antialiased">
                    {feature.description}
                  </p>

                  {/* Bottom micro-detail */}
                  <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-8 h-1 rounded-full bg-primary/50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Choose Your <span className="text-primary">Challenge</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto antialiased leading-relaxed">
              Select a path that fits your experience level and start solving
              today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {problemCategories.map((category, index) => (
              <div
                key={index}
                className="group relative h-full p-px rounded-[2rem] overflow-hidden transition-all duration-500"
              >
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-br",
                    category.color === "emerald"
                      ? "from-emerald-500/40 via-emerald-500/10 to-transparent"
                      : category.color === "amber"
                        ? "from-amber-500/40 via-amber-500/10 to-transparent"
                        : "from-rose-500/40 via-rose-500/10 to-transparent",
                  )}
                />

                {/* Card Body */}
                <div className="relative h-full bg-white dark:bg-neutral-950 p-10 rounded-[1.95rem] flex flex-col transition-colors duration-500 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900/50">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-8",
                      category.color === "emerald"
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 shadow-lg shadow-emerald-500/5"
                        : category.color === "amber"
                          ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 shadow-lg shadow-amber-500/5"
                          : "bg-rose-50 dark:bg-rose-950/30 text-rose-600 shadow-lg shadow-rose-500/5",
                    )}
                  >
                    {index === 0 ? (
                      <Code2 className="w-6 h-6" />
                    ) : index === 1 ? (
                      <Activity className="w-6 h-6" />
                    ) : (
                      <Trophy className="w-6 h-6" />
                    )}
                  </div>

                  <div className="mb-2">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border",
                        category.color === "emerald"
                          ? "border-emerald-500/20 text-emerald-700 dark:text-emerald-400 bg-emerald-500/5"
                          : category.color === "amber"
                            ? "border-amber-500/20 text-amber-700 dark:text-amber-400 bg-amber-500/5"
                            : "border-rose-500/20 text-rose-700 dark:text-rose-400 bg-rose-500/5",
                      )}
                    >
                      {category.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {category.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-auto grow antialiased">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-neutral-800">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {category.count}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "p-0 h-auto font-bold group flex items-center transition-colors",
                        category.color === "emerald"
                          ? "text-emerald-600 hover:text-emerald-700"
                          : category.color === "amber"
                            ? "text-amber-600 hover:text-amber-700"
                            : "text-rose-600 hover:text-rose-700",
                      )}
                    >
                      Start Now{" "}
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsComponent testimonials={testimonials} />
      
      <Footer />
    </div>
  );
}
