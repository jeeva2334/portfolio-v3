-- Supabase schema for the portfolio

-- Create the 'works' table for projects
CREATE TABLE works (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  stack TEXT NOT NULL,
  type TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial data into 'works'
INSERT INTO works (title, stack, type, image) VALUES
('Autonomous Orchestration Engine', 'Python / LangGraph / Astra DB', 'Multi-agent systems', '/assets/agent-network.png'),
('Financial Data Terminal', 'Next.js / FastAPI / ECharts', 'Real-time analytics', '/assets/system-layers.png'),
('Secure Desktop Client', 'Go / Wails / React', 'Local-first tooling', '/assets/hero-compute.png');

-- Create the 'notes' table for blog posts
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial data into 'notes'
INSERT INTO notes (title, category) VALUES
('What agent systems need in production', 'AI systems'),
('RAG is a product problem', 'Applied AI'),
('Interfaces for complex systems', 'Engineering');

-- Enable RLS (Row Level Security) - optional but recommended
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to works" ON works FOR SELECT USING (true);
CREATE POLICY "Allow public read access to notes" ON notes FOR SELECT USING (true);

-- (For the admin dashboard, you would typically add authenticated write policies here, 
-- but for now, you can manage data via the Supabase dashboard or allow authenticated users)
