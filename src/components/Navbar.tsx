import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const scrollTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      window.location.href = "/#" + id;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-primary-foreground font-display">
          Banco da Praça
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("servicos")} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Serviços</button>
          <button onClick={() => scrollTo("como-funciona")} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">Como funciona</button>
          <button onClick={() => scrollTo("pix")} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">PIX</button>
          <Link to="/auth" className="px-5 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Entrar
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-primary-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary border-t border-primary-foreground/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <button onClick={() => scrollTo("servicos")} className="text-sm text-primary-foreground/80 text-left">Serviços</button>
              <button onClick={() => scrollTo("como-funciona")} className="text-sm text-primary-foreground/80 text-left">Como funciona</button>
              <button onClick={() => scrollTo("pix")} className="text-sm text-primary-foreground/80 text-left">PIX</button>
              <Link to="/auth" className="block px-5 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold w-full text-center" onClick={() => setOpen(false)}>
                Entrar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
