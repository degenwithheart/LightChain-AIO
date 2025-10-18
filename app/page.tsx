import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { APP_CONFIG } from '../lib/constants'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main 
        className="pt-16"
        style={{ 
          minHeight: `clamp(${APP_CONFIG.ui.minContentHeight.mobile}, 50vh, ${APP_CONFIG.ui.minContentHeight.desktop})`
        }}
      >
        <Hero />
      </main>
      <Footer />
    </div>
  )
}