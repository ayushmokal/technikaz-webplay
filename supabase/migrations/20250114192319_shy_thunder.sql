/*
  # Add Admin Logs Table

  1. New Tables
    - `admin_logs`
      - `id` (uuid, primary key)
      - `user_email` (text)
      - `action_type` (text - create/update/delete)
      - `entity_type` (text - blog/product)
      - `entity_id` (uuid)
      - `entity_name` (text)
      - `details` (text)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Create admin_logs table
CREATE TABLE admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  action_type text NOT NULL CHECK (action_type IN ('create', 'update', 'delete')),
  entity_type text NOT NULL CHECK (entity_type IN ('blog', 'product')),
  entity_id uuid NOT NULL,
  entity_name text NOT NULL,
  details text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow admin read access"
  ON admin_logs
  FOR SELECT
  TO authenticated
  USING (auth.email() != 'user1@admin.com');

CREATE POLICY "Allow all users to insert logs"
  ON admin_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_admin_logs_user_email ON admin_logs(user_email);
CREATE INDEX idx_admin_logs_action_type ON admin_logs(action_type);
CREATE INDEX idx_admin_logs_entity_type ON admin_logs(entity_type);
CREATE INDEX idx_admin_logs_created_at ON admin_logs(created_at);

-- Add comments for documentation
COMMENT ON TABLE admin_logs IS 'Tracks all admin and content creator actions';
COMMENT ON COLUMN admin_logs.user_email IS 'Email of the user who performed the action';
COMMENT ON COLUMN admin_logs.action_type IS 'Type of action performed (create/update/delete)';
COMMENT ON COLUMN admin_logs.entity_type IS 'Type of entity affected (blog/product)';
COMMENT ON COLUMN admin_logs.entity_name IS 'Name/title of the affected entity';
COMMENT ON COLUMN admin_logs.details IS 'Additional details about the action';