import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Conte seu problema",
    description: "Nos diga o que precisa resolver. Ouvimos você com atenção para entender cada detalhe.",
  },
  {
    icon: Lightbulb,
    title: "Criamos a solução",
    description: "Nossa equipe desenvolve uma solução personalizada, pensada sob medida para você.",
  },
  {
    icon: Rocket,
    title: "Resultado entregue",
    description: "Implementamos rapidamente e você acompanha tudo. Simples, rápido e eficiente.",
  },
];

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
            Do problema à solução em <span className="text-gradient-gold">3 passos</span>
          </h2>
        </motion.div>

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
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
