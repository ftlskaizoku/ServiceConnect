import './globals.css';

export const metadata = {
  title: 'ServiceConnect — Sénégal',
  description: 'Trouvez des prestataires vérifiés au Sénégal. Plomberie, électricité, IT, et plus.',
  keywords: 'prestataires, services, Sénégal, plomberie, électricité, Dakar',
  authors: [{ name: 'ServiceConnect' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ServiceConnect',
  },
  openGraph: {
    title: 'ServiceConnect Sénégal',
    description: 'La plateforme qui connecte clients et prestataires au Sénégal',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F59E0B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ServiceConnect" />
        <meta name="application-name" content="ServiceConnect" />
        <meta name="msapplication-TileColor" content="#0D1117" />
        <meta name="msapplication-TileImage" content="/icon-144.png" />

        {/* Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />
        <link rel="apple-touch-icon" href="/icon-180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icon-144.png" />
        <link rel="apple-touch-icon" sizes="128x128" href="/icon-128.png" />
        <link rel="apple-touch-icon" sizes="96x96"  href="/icon-96.png" />

        {/* iOS splash screens */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js')
                .then(function(reg) { console.log('SW registered'); })
                .catch(function(err) { console.log('SW failed:', err); });
            });
          }
        `}} />
      </body>
    </html>
  );
}
