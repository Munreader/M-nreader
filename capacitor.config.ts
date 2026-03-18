import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.munos.sanctuary',
  appName: 'MUN OS',
  webDir: 'out',
  server: {
    // Full-featured MÜN OS with all features unlocked + real AI
    url: 'https://francisco-consist-regional-arg.trycloudflare.com',
    cleartext: true,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
