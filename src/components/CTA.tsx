import { motion } from "framer-motion";
import { ArrowRight, Layers, Wrench } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 70% 30%, hsl(42 80% 55% / 0.4) 0%, transparent 50%)"
      }} />
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 font-display">
            Encontre a solução ideal para seu negócio
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
            Explore nosso catálogo de soluções prontas ou descreva seu desafio e receba uma proposta personalizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold text-lg hover:opacity-90 transition-opacity">
              <Layers className="w-5 h-5" />
              Ver catálogo
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg border border-primary-foreground/30 text-primary-foreground font-semibold text-lg hover:bg-primary-foreground/10 transition-colors">
              <Wrench className="w-5 h-5" />
              Solicitar sob demanda
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
