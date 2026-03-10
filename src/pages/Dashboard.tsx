import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendente", variant: "secondary" },
  in_review: { label: "Em análise", variant: "default" },
  approved: { label: "Aprovado", variant: "default" },
  rejected: { label: "Rejeitado", variant: "destructive" },
  completed: { label: "Concluído", variant: "outline" },
};

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("solution_requests")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    setRequests(data || []);
    setLoadingRequests(false);
  };

  if (loading) {
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
          <a href="/" className="text-xl font-bold font-display">Banco da Praça</a>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80 hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Minhas Solicitações</h1>
            <p className="text-muted-foreground mt-1">Acompanhe suas soluções solicitadas</p>
          </div>
          <Button onClick={() => navigate("/nova-solicitacao")}>
            <Plus className="w-4 h-4 mr-2" /> Nova Solicitação
          </Button>
        </div>

        {loadingRequests ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : requests.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma solicitação ainda</h3>
              <p className="text-muted-foreground mb-4">Crie sua primeira solicitação de solução</p>
              <Button onClick={() => navigate("/nova-solicitacao")}>
                <Plus className="w-4 h-4 mr-2" /> Nova Solicitação
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => {
              const status = statusMap[req.status] || statusMap.pending;
              return (
                <Card key={req.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{req.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {req.category} • {new Date(req.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{req.description}</p>
                    {req.admin_notes && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-xs font-semibold text-foreground mb-1">Resposta da equipe:</p>
                        <p className="text-sm text-muted-foreground">{req.admin_notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
