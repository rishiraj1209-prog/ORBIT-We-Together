import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { PwaRuntime } from "@/components/pwa/pwa-runtime";
import { OrbitCinematic } from "@/components/experience/orbit-cinematic";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <OrbitCinematic>
        <AuthProvider>{children}</AuthProvider>
      </OrbitCinematic>
      <PwaRuntime />
    </ThemeProvider>
  );
}
