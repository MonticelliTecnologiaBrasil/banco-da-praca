import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Smartphone, BarChart3, Megaphone, Cog, Layers, Users } from "lucide-react";

const categories = [
  { icon: CreditCard, title: "Financeiro", description: "Gestão de cobranças, fluxo de caixa e pagamentos integrados via PIX." },
  { icon: BarChart3, title: "Gestão", description: "ERPs leves, dashboards e controle operacional para seu negócio." },
  { icon: Cog, title: "Automação", description: "Automatize processos repetitivos e ganhe produtividade." },
  { icon: Megaphone, title: "Marketing", description: "Ferramentas de CRM, campanhas e funis de vendas." },
  { icon: ShieldCheck, title: "Segurança", description: "Soluções de proteção de dados e compliance digital." },
  { icon: Users, title: "Atendimento", description: "Chatbots, helpdesk e sistemas de suporte ao cliente." },
];

const highlights = [
  { icon: Layers, label: "Soluções prontas", value: "Catálogo completo" },
  { icon: Smartphone, label: "100% digital", value: "Acesse de qualquer lugar" },
  { icon: CreditCard, label: "PIX integrado", value: "Mercado Pago" },
];

const Services = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Catálogo de Soluções</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 font-display">
            Soluções organizadas por <span className="text-gradient-gold">categoria</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Sistemas e ferramentas já estruturados, prontos para uso imediato. Contrate por assinatura ou pagamento único.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <cat.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2 font-display">{cat.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{cat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-primary/5 border border-primary/10"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <h.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
