import { Hero } from '@/components/Hero'
import { FeaturesShowcase } from '@/components/FeaturesShowcase'
import { GettingStarted } from '@/components/GettingStarted'

export function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturesShowcase />
      <GettingStarted />
    </div>
  )
}
