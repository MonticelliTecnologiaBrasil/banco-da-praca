import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Shield, ChevronDown, ChevronUp } from "lucide-react";

const statusOptions = [
  { value: "pending", label: "Pendente" },
  { value: "in_review", label: "Em análise" },
  { value: "approved", label: "Aprovado" },
  { value: "rejected", label: "Rejeitado" },
  { value: "completed", label: "Concluído" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  in_review: "default",
  approved: "default",
  rejected: "destructive",
  completed: "outline",
};

const AdminPanel = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});
  const [editStatus, setEditStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/dashboard");
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin) fetchRequests();
  }, [user, isAdmin]);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("solution_requests")
      .select("*, profiles(full_name, email, company)")
      .order("created_at", { ascending: false });
    setRequests(data || []);
    setLoadingReqs(false);
  };

  const handleUpdate = async (id: string) => {
    const updates: any = {};
    if (editStatus[id]) updates.status = editStatus[id];
    if (editNotes[id] !== undefined) updates.admin_notes = editNotes[id];
    updates.updated_at = new Date().toISOString();

    const { error } = await supabase.from("solution_requests").update(updates).eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Atualizado com sucesso!" });
      fetchRequests();
    }
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground border-b border-border">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" />
            <span className="text-xl font-bold font-display">Painel Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="text-primary-foreground hover:bg-primary-foreground/10">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">Solicitações de Clientes</h1>
        <p className="text-muted-foreground mb-8">Avalie e responda as solicitações recebidas</p>

        {loadingReqs ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : requests.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">Nenhuma solicitação recebida ainda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => {
              const isExpanded = expandedId === req.id;
              const profile = req.profiles;
              const currentStatus = editStatus[req.id] || req.status;
              return (
                <Card key={req.id} className="transition-shadow hover:shadow-md">
                  <CardHeader
                    className="cursor-pointer pb-3"
                    onClick={() => setExpandedId(isExpanded ? null : req.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {req.title}
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {profile?.full_name || "Sem nome"} • {profile?.email} • {req.category} • {new Date(req.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Badge variant={statusVariant[req.status] || "secondary"}>
                        {statusOptions.find((s) => s.value === req.status)?.label || req.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">Descrição:</p>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{req.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-foreground">Orçamento:</span>{" "}
                          <span className="text-muted-foreground">{req.budget_range || "A definir"}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">Urgência:</span>{" "}
                          <span className="text-muted-foreground">{req.urgency}</span>
                        </div>
                        {profile?.company && (
                          <div>
                            <span className="font-semibold text-foreground">Empresa:</span>{" "}
                            <span className="text-muted-foreground">{profile.company}</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-border pt-4 space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Status:</label>
                          <select
                            value={currentStatus}
                            onChange={(e) => setEditStatus({ ...editStatus, [req.id]: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {statusOptions.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground">Notas para o cliente:</label>
                          <Textarea
                            placeholder="Escreva uma resposta ou observações para o cliente..."
                            value={editNotes[req.id] ?? req.admin_notes ?? ""}
                            onChange={(e) => setEditNotes({ ...editNotes, [req.id]: e.target.value })}
                            maxLength={2000}
                          />
                        </div>

                        <Button onClick={() => handleUpdate(req.id)} className="w-full">
                          Salvar Alterações
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
