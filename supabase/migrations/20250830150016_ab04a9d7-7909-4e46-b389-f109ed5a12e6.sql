-- Create app_role enum only if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = check_user_id
    AND role = 'admin'
  );
$$;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert contents" ON public.contents;
DROP POLICY IF EXISTS "Authenticated users can update contents" ON public.contents;
DROP POLICY IF EXISTS "Authenticated users can delete contents" ON public.contents;

-- Create admin-only policies for contents
CREATE POLICY "Only admins can insert contents" ON public.contents
FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update contents" ON public.contents
FOR UPDATE USING (public.is_admin());

CREATE POLICY "Only admins can delete contents" ON public.contents
FOR DELETE USING (public.is_admin());

-- RLS policies for user_roles table
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Admins can manage all user roles" ON public.user_roles
FOR ALL USING (public.is_admin());

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Add updated_at trigger for user_roles
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();