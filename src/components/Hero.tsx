import { motion } from "framer-motion";
import { ArrowRight, Layers, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 30% 50%, hsl(42 80% 55% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(160 55% 40% / 0.4) 0%, transparent 40%)"
      }} />

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6">
              Hub de Soluções Tecnológicas
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 font-display">
              Tecnologia acessível,{" "}
              <span className="text-gradient-gold">sob medida ou pronta.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
              Encontre soluções digitais prontas para usar ou descreva seu problema e receba 
              uma proposta personalizada. Tudo num só lugar, com pagamento via PIX.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="/catalogo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
                Explorar soluções
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/nova-solicitacao" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors">
                Solicitar sob demanda
              </a>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Layers className="w-4 h-4 text-secondary" />
                Soluções de prateleira
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Wrench className="w-4 h-4 text-secondary" />
                Projetos personalizados
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src={heroImage}
              alt="Banco da Praça - Hub de Soluções Tecnológicas"
              className="w-full max-w-lg mx-auto animate-float rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
