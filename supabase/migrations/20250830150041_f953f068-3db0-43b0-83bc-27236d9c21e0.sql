-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = COALESCE($1, auth.uid())
    AND role = 'admin'
  );
$$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create RLS policies for user_roles
CREATE POLICY "Admins can manage all user roles" ON public.user_roles
FOR ALL USING (public.is_admin());

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Drop existing overly permissive policies on contents table
DROP POLICY IF EXISTS "Authenticated users can insert contents" ON public.contents;
DROP POLICY IF EXISTS "Authenticated users can update contents" ON public.contents; 
DROP POLICY IF EXISTS "Authenticated users can delete contents" ON public.contents;

-- Create new admin-only policies for contents table
CREATE POLICY "Only admins can insert contents" ON public.contents
FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update contents" ON public.contents  
FOR UPDATE USING (public.is_admin());

CREATE POLICY "Only admins can delete contents" ON public.contents
FOR DELETE USING (public.is_admin());

-- Add trigger for user_roles updated_at if it doesn't exist
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();