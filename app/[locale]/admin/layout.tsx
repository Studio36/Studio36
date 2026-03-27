import { Metadata } from "next";
import SessionProviders from "../components/SessionProviders";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <SessionProviders>
        {children}
    </SessionProviders>
  )
}
