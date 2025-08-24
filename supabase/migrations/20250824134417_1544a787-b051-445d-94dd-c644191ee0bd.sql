-- Create enum for content categories
CREATE TYPE public.content_category AS ENUM ('কবিতা', 'গল্প', 'প্রবন্ধ');

-- Create contents table
CREATE TABLE public.contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category content_category NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contents ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Contents are viewable by everyone" 
ON public.contents 
FOR SELECT 
USING (true);

-- Create policies for authenticated admin users (you'll need to manually grant admin access)
CREATE POLICY "Authenticated users can insert contents" 
ON public.contents 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update contents" 
ON public.contents 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete contents" 
ON public.contents 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contents_updated_at
BEFORE UPDATE ON public.contents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();