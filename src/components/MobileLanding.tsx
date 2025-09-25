import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Headphones } from "lucide-react";
import runnerHero from "@/assets/runner-hero.jpg";
import appMockup from "@/assets/copied/WorkoutPlans.svg";
import appStoreIcon from "@/assets/app-store.svg";
import googlePlayIcon from "@/assets/google-play.svg";

const MobileLanding = () => {
  // Device detection function
  const detectDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      return 'ios';
    }

    // Android detection
    if (/android/i.test(userAgent)) {
      return 'android';
    }

    // Desktop/other devices
    return 'desktop';
  };

  // High-converting smart download - direct for mobile, scroll for desktop
  const handleSmartDownload = () => {
    const device = detectDevice();
    console.log(`Device detected: ${device}`);

    // Direct download for mobile devices (highest conversion)
    if (device === 'ios') {
      handleAppDownload('ios');
      return;
    }

    if (device === 'android') {
      handleAppDownload('android');
      return;
    }

    // Fallback: Scroll to options for desktop users
    const appStoreSection = document.getElementById('app-store-buttons');
    if (appStoreSection) {
      appStoreSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const handleAppDownload = (store: 'ios' | 'android') => {
    // Analytics tracking for conversion optimization
    console.log(`Download initiated: ${store}`);

    // Redirect to app stores
    if (store === 'ios') {
      window.open('https://apps.apple.com/app/trekon', '_blank');
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.trekon', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Above the fold impact */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${runnerHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-sm mx-auto">
          {/* Compelling Headline - 6-8 words max */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Run Smarter.
            <br />
            <span className="text-success">Train Your Way.</span>
          </h1>

          {/* One-line Value Prop */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 font-medium">
            Custom plans that fit your pace, goals, and schedule
          </p>

          {/* App Screenshot Mockup */}
          <div className="mb-8 flex justify-center">
            <img
              src={appMockup}
              alt="Trekon app interface showing custom workout plans"
              className="h-64 sm:h-80 max-w-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Prominent Download CTA */}
          <Button
            variant="hero"
            size="mobile-lg"
            className="w-full mb-4"
            onClick={handleSmartDownload}
          >
            Download Free App
          </Button>

          {/* Quick Indicator */}
          <p className="text-white/70 text-sm">
            Available on iOS & Android
          </p>
        </div>
      </section>

      {/* Quick Benefits - 3 points max */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Training Built for Real Life
          </h2>

          <div className="space-y-6">
            {/* Benefit 1 */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Personal Pacing</h3>
                <p className="text-sm text-muted-foreground">Workouts calibrated to your fitness level</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Smart Adaptation</h3>
                <p className="text-sm text-muted-foreground">Plans adjust based on your progress</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Audio Guidance</h3>
                <p className="text-sm text-muted-foreground">Focus on your stride, not your screen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="max-w-sm mx-auto text-center">
          <Card className="p-6 bg-card border-success/20">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              No Running Track Required
            </h3>
            <p className="text-sm text-muted-foreground">
              Speed workouts, tempo runs, and race-day prep designed for real roads.
              If you've got pavement, you've got a plan.
            </p>
          </Card>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Coming Soon to iOS & Android
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 bg-background" id="app-store-buttons">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Start Your Journey Today
          </h2>

          {/* Desktop-friendly messaging */}
          <p className="text-sm text-muted-foreground mb-6">
            Download the mobile app to get started
          </p>

          {/* App Store Badges */}
          <div className="space-y-6">
            <button
              id="ios-download"
              onClick={() => handleAppDownload('ios')}
              className="w-full flex items-center justify-center transition-all duration-300 rounded-lg"
            >
              <img
                src={appStoreIcon}
                alt="Download on the App Store"
                className="h-16 w-auto hover:scale-105 transition-transform"
              />
            </button>

            <button
              id="android-download"
              onClick={() => handleAppDownload('android')}
              className="w-full flex items-center justify-center transition-all duration-300 rounded-lg"
            >
              <img
                src={googlePlayIcon}
                alt="Get it on Google Play"
                className="h-16 w-auto hover:scale-105 transition-transform"
              />
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Free download • No subscription required • Works offline
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-6 px-4 bg-muted/30 text-center">
        <p className="text-xs text-muted-foreground">
          © 2025 Trekon. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MobileLanding;