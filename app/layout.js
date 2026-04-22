import './globals.css';

export const metadata = {
  title: 'ServiceConnect — Sénégal',
  description: 'La plateforme qui connecte clients et prestataires au Sénégal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
