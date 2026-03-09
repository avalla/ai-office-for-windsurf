import { Download, Play, BookOpen } from 'lucide-react'

export function GettingStarted() {
  const steps = [
    {
      number: "1",
      title: "Install AI Office",
      description: "Download and install the AI Office extension for Antigravity from the marketplace.",
      icon: Download
    },
    {
      number: "2", 
      title: "Configure Your Workspace",
      description: "Set up your preferences and connect your development environment.",
      icon: Play
    },
    {
      number: "3",
      title: "Start Coding",
      description: "Begin experiencing intelligent code assistance and accelerated development.",
      icon: BookOpen
    }
  ]

  return (
    <section id="getting-started" className="py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-[980px] text-center mb-16">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
            Getting Started
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
            Up and running in minutes. Follow these simple steps to transform your development experience.
          </p>
        </div>
        
        <div className="mx-auto max-w-[980px]">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
              Get Started Now
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              Free for personal use • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
