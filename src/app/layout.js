import { Inter } from "next/font/google";
import "./globals.css";
import DefaultProvider from "@/providers/DefaultProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {" "}
        <main>
          {" "}
          <DefaultProvider>{children}</DefaultProvider>
        </main>
      </body>
    </html>
  );
}
