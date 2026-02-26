const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-primary-foreground/70">
          <div>
            <h3 className="text-xl font-bold text-primary-foreground mb-4 font-display">
              Banco da Praça
            </h3>
            <p className="text-sm leading-relaxed">
              Hub de serviços que entende seu problema e cria soluções sob medida.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Pagamentos PIX</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Soluções Personalizadas</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Suporte</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">contato@bancodapraca.com</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/50">
          © 2026 Banco da Praça. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
