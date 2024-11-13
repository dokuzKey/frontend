import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Antenna, FileText, Package2 } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Shield,
    title: "Encrypted Storage",
    description: "Your passwords are encrypted and stored securely in cloud, accessible from anywhere"
  },
  {
    icon: Antenna,
    title: "Access Anywhere",
    description: "Access your passwords from any device, anywhere in the world with our web-based app"
  },
  {
    icon: FileText,
    title: "Secure Notes",
    description: "Store all of your notes securely, in the cloud to access from anywhere, anytime."
  },
  {
    icon: Package2,
    title: "Open-source",
    description: "Our whole codebase is open-sourced and available on GitHub so you can audit and self-host."
  }
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12 bg-background">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
         Password management, the open way
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Open-sourced and beautifully designed password manager and note keeper.
        </p>
        <Link href="/register">
          <Button size="lg" className="mr-4">Get Started</Button>
        </Link>
      </div>

      <div className="w-full max-w-5xl mx-auto mb-12">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Always Free</h2>
            <p className="text-4xl font-bold">$0</p>
            <p className="mt-2">Powered by open source, free for everyone</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-4 w-fit p-2 rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}