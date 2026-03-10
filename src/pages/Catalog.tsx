import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, DollarSign, FileText, Users, Layout, MessageSquare,
  Mail, Globe, Shield, Headphones, Package, Star, Check, ArrowRight, X
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
};

const categories = [
  { value: "all", label: "Todas" },
  { value: "financeiro", label: "Financeiro" },
  { value: "gestao", label: "Gestão" },
  { value: "automacao", label: "Automação" },
  { value: "marketing", label: "Marketing" },
  { value: "seguranca", label: "Segurança" },
  { value: "atendimento", label: "Atendimento" },
];

const categoryLabels: Record<string, string> = {
  financeiro: "Financeiro",
  gestao: "Gestão",
  automacao: "Automação",
  marketing: "Marketing",
  seguranca: "Segurança",
  atendimento: "Atendimento",
};

type Solution = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: string;
  icon: string;
  features: string[];
  is_featured: boolean;
};

type Plan = {
  id: string;
  solution_id: string;
  name: string;
  price_monthly: number | null;
  price_once: number | null;
  billing_type: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
};

const Catalog = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [solRes, planRes] = await Promise.all([
        supabase.from("solutions").select("*").eq("is_active", true).order("name"),
        supabase.from("solution_plans").select("*").order("sort_order"),
      ]);
      setSolutions((solRes.data as any[]) || []);
      setPlans((planRes.data as any[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = activeCategory === "all"
    ? solutions
    : solutions.filter((s) => s.category === activeCategory);

  const solutionPlans = (solutionId: string) =>
    plans.filter((p) => p.solution_id === solutionId);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold font-display">Banco da Praça</a>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Início
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/auth")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground pb-12 pt-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Catálogo de Soluções
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Soluções prontas para uso imediato. Escolha a categoria, explore os recursos e contrate o plano ideal para o seu negócio.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="container mx-auto px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma solução encontrada nesta categoria.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((sol) => (
                <motion.div
                  key={sol.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="h-full cursor-pointer group hover:shadow-lg transition-all border-border hover:border-primary/30"
                    onClick={() => setSelectedSolution(sol)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          {iconMap[sol.icon] || <Package className="w-6 h-6" />}
                        </div>
                        <div className="flex gap-2">
                          {sol.is_featured && (
                            <Badge className="bg-secondary text-secondary-foreground">
                              <Star className="w-3 h-3 mr-1" /> Destaque
                            </Badge>
                          )}
                          <Badge variant="outline">
                            {categoryLabels[sol.category] || sol.category}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                        {sol.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{sol.short_description}</p>
                      <div className="flex items-center gap-2">
                        {solutionPlans(sol.id).length > 0 && (
                          <span className="text-sm text-primary font-semibold">
                            A partir de{" "}
                            {formatPrice(
                              Math.min(
                                ...solutionPlans(sol.id).map(
                                  (p) => p.price_monthly ?? p.price_once ?? Infinity
                                )
                              )
                            )}
                          </span>
                        )}
                        <ArrowRight className="w-4 h-4 text-primary ml-auto group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Solution Detail Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={() => setSelectedSolution(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-background rounded-2xl max-w-4xl w-full shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      {iconMap[selectedSolution.icon] || <Package className="w-7 h-7" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold font-display text-foreground">
                        {selectedSolution.name}
                      </h2>
                      <Badge variant="outline" className="mt-1">
                        {categoryLabels[selectedSolution.category] || selectedSolution.category}
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSolution(null)}
                    className="text-muted-foreground hover:text-foreground p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {selectedSolution.full_description}
                </p>
              </div>

              {/* Features */}
              <div className="p-6 md:px-8 border-b border-border">
                <h3 className="text-lg font-semibold font-display text-foreground mb-4">Recursos inclusos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(selectedSolution.features as string[]).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Plans */}
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-semibold font-display text-foreground mb-6">Planos disponíveis</h3>
                {solutionPlans(selectedSolution.id).length === 0 ? (
                  <p className="text-muted-foreground text-sm">Entre em contato para um orçamento personalizado.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {solutionPlans(selectedSolution.id).map((plan) => (
                      <Card
                        key={plan.id}
                        className={`relative ${plan.is_popular ? "border-primary shadow-md" : "border-border"}`}
                      >
                        {plan.is_popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <Badge className="bg-primary text-primary-foreground">Mais popular</Badge>
                          </div>
                        )}
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <div className="mt-2">
                            {plan.price_monthly != null && (
                              <div>
                                <span className="text-3xl font-bold text-foreground">
                                  {formatPrice(plan.price_monthly)}
                                </span>
                                <span className="text-muted-foreground text-sm">/mês</span>
                              </div>
                            )}
                            {plan.price_once != null && (
                              <div className={plan.price_monthly != null ? "mt-1" : ""}>
                                <span className={`font-bold text-foreground ${plan.price_monthly ? "text-lg" : "text-3xl"}`}>
                                  {formatPrice(plan.price_once)}
                                </span>
                                <span className="text-muted-foreground text-sm"> único</span>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-6">
                            {(plan.features as string[]).map((f, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                          <Button
                            className="w-full"
                            variant={plan.is_popular ? "default" : "outline"}
                            onClick={() => navigate("/auth")}
                          >
                            Contratar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
