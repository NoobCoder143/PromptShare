import '@styles/global.css';
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';

export const metadata = {
  title: "PromptShare",
  description: "Share and explore various useful prompts"
};

export default function RootLayout({ children ,session}) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/assets/icons/artificial-intelligence.png" />
        <title>PromptShare</title>
        <meta name="description" content="Share and explore various useful prompts" />
      </head>
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
