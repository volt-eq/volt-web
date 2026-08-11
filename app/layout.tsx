import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const title = "Volt — Deploy LangGraph and LangChain agents";
const description =
  "Volt is the deployment platform for agents built with LangGraph and LangChain. Push TypeScript or Python and get a production endpoint that streams, remembers and pauses for humans.";

export const metadata: Metadata = {
  metadataBase: new URL("https://volt.run"),
  title: { default: title, template: "%s — Volt" },
  description,
  applicationName: "Volt",
  keywords: [
    "LangGraph deployment",
    "LangChain deployment",
    "deploy LangGraph agents",
    "AI agents",
    "agent protocol",
    "agent runtime",
    "LangGraph platform alternative",
    "deploy AI agents",
  ],
  openGraph: {
    type: "website",
    url: "https://volt.run",
    siteName: "Volt",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // `dark` keeps the registry components (MagicUI, Aceternity) on their dark
      // branch; the site itself is dark-only.
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
