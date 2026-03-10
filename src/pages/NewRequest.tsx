import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const categories = [
  { value: "financeiro", label: "Financeiro" },
  { value: "gestao", label: "Gestão" },
  { value: "automacao", label: "Automação" },
  { value: "marketing", label: "Marketing" },
  { value: "seguranca", label: "Segurança" },
  { value: "atendimento", label: "Atendimento" },
  { value: "outro", label: "Outro" },
];

const urgencies = [
  { value: "low", label: "Baixa" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "Alta" },
  { value: "urgent", label: "Urgente" },
];

const budgetRanges = [
  { value: "ate_1k", label: "Até R$ 1.000" },
  { value: "1k_5k", label: "R$ 1.000 - R$ 5.000" },
  { value: "5k_15k", label: "R$ 5.000 - R$ 15.000" },
  { value: "15k_50k", label: "R$ 15.000 - R$ 50.000" },
  { value: "acima_50k", label: "Acima de R$ 50.000" },
  { value: "a_definir", label: "A definir" },
];

const NewRequest = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "outro",
    description: "",
    budget_range: "a_definir",
    urgency: "normal",
  });

  if (!loading && !user) {
    navigate("/auth");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from("solution_requests").insert({
      user_id: user!.id,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      budget_range: form.budget_range,
      urgency: form.urgency,
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Solicitação enviada!", description: "Nossa equipe irá analisar em breve." });
      navigate("/dashboard");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground border-b border-border">
        <div className="container mx-auto px-6 flex items-center h-16">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-2xl">
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Nova Solicitação</h1>
        <p className="text-muted-foreground mb-8">Descreva seu problema ou necessidade e nossa equipe criará uma solução sob medida.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título da solução *</Label>
            <Input
              id="title"
              placeholder="Ex: Sistema de controle de estoque"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição detalhada *</Label>
            <Textarea
              id="description"
              placeholder="Descreva seu problema, necessidade ou ideia com o máximo de detalhes possível..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              maxLength={2000}
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Faixa de orçamento</Label>
              <select
                id="budget"
                value={form.budget_range}
                onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {budgetRanges.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgência</Label>
              <select
                id="urgency"
                value={form.urgency}
                onChange={(e) => setForm({ ...form, urgency: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {urgencies.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Enviando..." : "Enviar Solicitação"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default NewRequest;
