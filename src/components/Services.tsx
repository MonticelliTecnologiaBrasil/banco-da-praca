import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Smartphone, Users, Wrench, HeadphonesIcon } from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Pagamentos PIX",
    description: "Receba e envie pagamentos instantâneos via PIX com integração Mercado Pago.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança Total",
    description: "Seus dados e transações protegidos com criptografia de ponta.",
  },
  {
    icon: Smartphone,
    title: "100% Digital",
    description: "Acesse todos os serviços direto do seu celular, a qualquer hora.",
  },
  {
    icon: Users,
    title: "Atendimento Humano",
    description: "Equipe dedicada para ouvir e resolver suas demandas de verdade.",
  },
  {
    icon: Wrench,
    title: "Soluções Sob Medida",
    description: "Cada problema é único. Criamos soluções personalizadas para você.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte 24/7",
    description: "Estamos sempre disponíveis para ajudar quando você precisar.",
  },
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
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Nossos Serviços</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 font-display">
            Tudo que você precisa, <span className="text-gradient-gold">num só lugar</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-card-foreground mb-2 font-display">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
