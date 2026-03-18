import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.munos.sanctuary',
  appName: 'MUN OS',
  webDir: 'out',
  server: {
    // Full-featured MÜN OS with all features unlocked + real AI
    // Production: Vercel deployment URL
    url: 'https://mun-os.vercel.app',
    // Fallback: 'https://m-nreader.vercel.app',
    cleartext: true,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
