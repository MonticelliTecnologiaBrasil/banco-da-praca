import { motion } from "framer-motion";
import { Search, ShoppingCart, Wrench, MessageSquare, FileText, Rocket } from "lucide-react";

const shelfSteps = [
  {
    icon: Search,
    title: "Explore o catálogo",
    description: "Navegue por categorias como financeiro, gestão, automação e marketing.",
  },
  {
    icon: ShoppingCart,
    title: "Escolha e contrate",
    description: "Selecione o plano ideal — assinatura ou pagamento único via PIX.",
  },
  {
    icon: Rocket,
    title: "Use imediatamente",
    description: "Solução ativada na hora, sem necessidade de desenvolvimento.",
  },
];

const customSteps = [
  {
    icon: MessageSquare,
    title: "Descreva seu problema",
    description: "Preencha o formulário de diagnóstico com sua necessidade.",
  },
  {
    icon: FileText,
    title: "Receba a proposta",
    description: "Escopo, orçamento e cronograma definidos para sua aprovação.",
  },
  {
    icon: Wrench,
    title: "Solução desenvolvida",
    description: "Após aprovação e pagamento, iniciamos o desenvolvimento.",
  },
];

const StepRow = ({ title, subtitle, steps }: { title: string; subtitle: string; steps: typeof shelfSteps }) => (
  <div className="mb-16 last:mb-0">
    <div className="text-center mb-10">
      <span className="inline-block px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
        {subtitle}
      </span>
      <h3 className="text-2xl font-bold text-foreground font-display">{title}</h3>
    </div>
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          className="relative text-center group"
        >
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-border" />
          )}
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors relative z-10">
            <step.icon className="w-10 h-10 text-primary" />
            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
              {index + 1}
            </span>
          </div>
          <h4 className="text-xl font-bold text-foreground mb-3 font-display">{step.title}</h4>
          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Como funciona</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 font-display">
            Dois caminhos, <span className="text-gradient-gold">uma plataforma</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Escolha soluções prontas do nosso catálogo ou solicite um projeto personalizado sob demanda.
          </p>
        </motion.div>

        <StepRow title="Soluções de Prateleira" subtitle="Pronto para usar" steps={shelfSteps} />
        <StepRow title="Soluções Sob Demanda" subtitle="Feito para você" steps={customSteps} />
      </div>
    </section>
  );
};

export default HowItWorks;
