import { Code, Cpu, FileText, GitBranch, Layers, Terminal } from 'lucide-react'

export function FeaturesShowcase() {
  const features = [
    {
      icon: Code,
      title: "Intelligent Code Completion",
      description: "AI-powered suggestions that understand your codebase context and coding style."
    },
    {
      icon: Cpu,
      title: "Smart Refactoring",
      description: "Automated code improvements with safety checks and rollback capabilities."
    },
    {
      icon: FileText,
      title: "Documentation Generation",
      description: "Automatically generate and maintain comprehensive documentation for your projects."
    },
    {
      icon: GitBranch,
      title: "Version Control Integration",
      description: "Seamless Git workflow integration with intelligent commit message generation."
    },
    {
      icon: Layers,
      title: "Multi-Language Support",
      description: "Works with TypeScript, JavaScript, Python, Go, and many more languages."
    },
    {
      icon: Terminal,
      title: "Command Line Interface",
      description: "Powerful CLI tools for automation and integration into your existing workflows."
    }
  ]

  return (
    <section id="features" className="py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-[980px] text-center mb-16">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
            Powerful Features
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Everything you need to accelerate your development workflow and ship better code faster.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col space-y-3 rounded-lg border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
