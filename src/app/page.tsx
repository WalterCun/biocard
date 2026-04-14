import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Link2, 
  QrCode, 
  BarChart3, 
  Globe, 
  Palette, 
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Link2,
      title: "Enlaces Ilimitados",
      description: "Crea todos los enlaces que necesites y organízalos fácil"
    },
    {
      icon: Palette,
      title: "Personalización Total",
      description: "Temas, colores, fuentes y fondo personalizado"
    },
    {
      icon: QrCode,
      title: "QR Code & vCard",
      description: "Comparte tu perfil con códigos QR y contactos digitales"
    },
    {
      icon: BarChart3,
      title: "Analíticas",
      description: "Mira quién visita tu perfil y hace click en tus enlaces"
    },
    {
      icon: Globe,
      title: "Dominio Personalizado",
      description: "Usa tu propio dominio para tu perfil de BioCard"
    },
    {
      icon: Zap,
      title: "Ecommerce & Pagos",
      description: "Vende productos y recibe pagos directamente"
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mes",
      features: [
        "5 enlaces",
        "1 perfil público",
        "QR Code básico",
        "Analíticas simples"
      ],
      cta: "Comenzar Gratis",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "/mes",
      features: [
        "Enlaces ilimitados",
        "Dominio personalizado",
        "Analíticas avanzadas",
        "Productos & pagos",
        "Soporte prioritario"
      ],
      cta: "升级 a Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "/mes",
      features: [
        "Todo en Pro",
        "Múltiples perfiles",
        "Team collaboration",
        "API access",
        "White-label"
      ],
      cta: "Contactanos",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">BioCard</div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
              Precios
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Comenzar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tu enlace personal en un solo lugar
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crea tu página de enlaces profesional. Comparte tu bio, acepta pagos, 
            analiza métricas y mucho más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Crear mi BioCard <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Todo lo que necesitas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Planes para todos
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <Card key={i} className={plan.popular ? "border-primary" : ""}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Empieza gratis hoy
          </h2>
          <p className="mb-8 opacity-90">
            Sin tarjeta de crédito. Configuración en minutos.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Crear mi BioCard <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 BioCard. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}