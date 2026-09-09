-- ═══════════════════════════════════════════════════════════
--  Cherry Club — Setup de Supabase
--  Pegá TODO esto en: Supabase → tu proyecto → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════

-- 1) Tabla de productos
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null,
  description text,
  price       numeric default 0,
  image_url   text,
  blank_url   text,
  featured    boolean default false,
  created_at  timestamptz default now()
);

alter table public.products enable row level security;

-- Lectura pública (la tienda) / escritura solo para usuarios con
-- app_metadata.role = 'admin'. Configurá ese claim en Authentication > Users.
drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products for select using (true);

drop policy if exists "products auth insert" on public.products;
drop policy if exists "products admin insert" on public.products;
create policy "products admin insert" on public.products for insert to authenticated
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "products auth update" on public.products;
drop policy if exists "products admin update" on public.products;
create policy "products admin update" on public.products for update to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "products auth delete" on public.products;
drop policy if exists "products admin delete" on public.products;
create policy "products admin delete" on public.products for delete to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 2) Bucket de imágenes (público para lectura)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "images public read" on storage.objects;
create policy "images public read" on storage.objects for select using (bucket_id = 'product-images');

drop policy if exists "images auth insert" on storage.objects;
drop policy if exists "images admin insert" on storage.objects;
create policy "images admin insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "images auth update" on storage.objects;
drop policy if exists "images admin update" on storage.objects;
create policy "images admin update" on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "images auth delete" on storage.objects;
drop policy if exists "images admin delete" on storage.objects;
create policy "images admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 3) Carga inicial (los 12 productos actuales). Corré esto una sola vez.
insert into public.products (name, category, description, price, image_url, featured) values
('Remera ''Nunca fui lo que querían de mí''','remeras','Remera ringer blanca con frase. Estampa de alta duración. Varios talles.',12000,'/img/ig-05.webp',true),
('Remera estampada a pedido','remeras','Tu diseño o el nuestro — estilo Cherry Club. DTF full color.',12000,'/img/ig-08.jpg',false),
('Medias personalizadas','medias','Sublimadas full color, diseño a elección. Ideales para regalar.',4500,'/img/ig-06.webp',true),
('Pack stickers bandas x10','stickers','Vinilo resistente al agua. Rock, pop y más, cortados a medida.',3000,'/img/ig-04.webp',true),
('Pack stickers Taylor Swift','stickers','Set temático de vinilo. Eras a elección.',3500,'/img/ig-09.webp',false),
('Pack stickers Pride','stickers','Set orgullo, vinilo resistente al agua.',3500,'/img/ig-10.webp',false),
('Chapitas / pins 38mm','chapitas','Prendedor metálico con diseño personalizado. Ideal para eventos y merch.',1500,'/img/empresa-museo-moderno.jpg',false),
('Encendedores AFA & Maradona','encendedores','Recargables, con diseños de la Selección y el Diego.',4000,'/img/ig-01.webp',true),
('Encendedores cute cherry','encendedores','Diseños cherry y clubes. Recargables.',4000,'/img/ig-12.jpg',false),
('Combo escolar personalizado','ninos','Mochila, delantal, taza y toalla con nombre y personaje a elección.',0,'/img/ig-02.webp',false),
('Remera niños personalizada','ninos','Talles 2 al 14. Personajes y frases a pedido.',9000,'/img/ig-11.jpg',false),
('Combo personalizado a medida','personalizados','Contanos tu idea y lo armamos. Mayorista y minorista.',0,'/img/ig-07.jpg',false),
('Vaso térmico personalizado','personalizados','Vaso térmico con tapa, sublimado full color con tu diseño.',8000,'/img/producto-vaso-kaos.jpg',false);

-- Fotos "sin sublimar" (before/after) para los productos que las tienen
update public.products set blank_url='/img/blank-remera.jpg'
  where name in ('Remera ''Nunca fui lo que querían de mí''','Remera estampada a pedido','Remera niños personalizada');
update public.products set blank_url='/img/blank-vaso.jpg'
  where name='Vaso térmico personalizado';
