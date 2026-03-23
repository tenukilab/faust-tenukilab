-- てぬきラボ EC システム テーブル設定
-- Supabase の SQL Editor に貼り付けて実行してください

-- 商品テーブル
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 注文テーブル
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  stripe_session_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  amount INTEGER NOT NULL,
  user_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 誰でも商品を読めるようにする（RLS設定）
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON products FOR SELECT USING (active = true);

-- 注文は誰でも作れるようにする
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_public_insert" ON orders FOR INSERT WITH CHECK (true);

-- 初期商品データ（FPSゲーム）
INSERT INTO products (name, description, price, active)
VALUES (
  'てぬきFPS 有料版',
  'VALORANT・APEX完全特化版。感度・視野角を本家に寄せたエイム練習ツール。会社でこっそり使えます。',
  500,
  true
);
