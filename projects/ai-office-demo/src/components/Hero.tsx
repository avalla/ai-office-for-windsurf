import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative space-y-8 py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-[980px] text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            AI Office for{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Antigravity
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground sm:text-xl">
            Transform your development workflow with intelligent AI assistance. 
            Build faster, code smarter, and ship with confidence.
          </p>
          <div className="space-x-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              View Documentation
            </button>
          </div>
        </div>
        
        <div className="mx-auto max-w-[980px] mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Optimized performance with sub-2 second load times
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Secure by Default</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade security with A+ ratings
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Developer First</h3>
            <p className="text-sm text-muted-foreground">
              Built by developers, for developers
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
