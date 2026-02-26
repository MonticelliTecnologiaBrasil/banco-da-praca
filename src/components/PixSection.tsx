import { motion } from "framer-motion";
import { QrCode, Zap, CheckCircle } from "lucide-react";

const PixSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Pagamento Instantâneo</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6 font-display">
              PIX integrado com{" "}
              <span className="text-gradient-gold">Mercado Pago</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Pague e receba instantaneamente, com toda a segurança e praticidade do PIX. 
              Integração direta com Mercado Pago para transações rápidas e confiáveis.
            </p>
            <ul className="space-y-4">
              {[
                "Pagamentos instantâneos 24h por dia",
                "Taxas transparentes e competitivas",
                "Confirmação em tempo real",
                "QR Code dinâmico para cobranças",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-80 rounded-3xl bg-primary p-8 flex flex-col items-center justify-center text-primary-foreground shadow-[var(--shadow-elevated)]">
                <QrCode className="w-32 h-32 mb-6 opacity-90" />
                <p className="text-lg font-semibold font-display">Escaneie e pague</p>
                <p className="text-sm text-primary-foreground/70 mt-1">Via PIX • Mercado Pago</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center shadow-lg">
                <Zap className="w-10 h-10 text-secondary-foreground" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PixSection;
