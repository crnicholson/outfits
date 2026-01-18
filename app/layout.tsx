import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import "./cursor.css";
// import CustomCursor from "../components/CustomCursor";

export const metadata: Metadata = {
  title: "outfits of charlie nicholson",
  description: "fuck around with my clothes",
};

const crevv = localFont({
  src: '../public/fonts/crevv.woff',
  variable: '--font-crevv',
  display: 'swap',
});

const ibm = localFont({
  src: '../public/fonts/IBMPlexMono-Regular.ttf',
  variable: '--font-ibm',
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${crevv.variable} ${ibm.variable}`}
      >
        {/* <CustomCursor /> */}
        {children}
      </body>
    </html>
  );
}
