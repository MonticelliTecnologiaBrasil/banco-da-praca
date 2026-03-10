
-- Solutions catalog table
CREATE TABLE public.solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL DEFAULT '',
  full_description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'outro',
  icon TEXT NOT NULL DEFAULT 'Package',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;

-- Public read access for active solutions
CREATE POLICY "Anyone can view active solutions" ON public.solutions FOR SELECT USING (is_active = true);
-- Admins can manage solutions
CREATE POLICY "Admins can manage solutions" ON public.solutions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Plans table
CREATE TABLE public.solution_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solution_id UUID REFERENCES public.solutions(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price_monthly NUMERIC(10,2) DEFAULT NULL,
  price_once NUMERIC(10,2) DEFAULT NULL,
  billing_type TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_type IN ('monthly', 'once', 'both')),
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.solution_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view plans" ON public.solution_plans FOR SELECT USING (true);
CREATE POLICY "Admins can manage plans" ON public.solution_plans FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
