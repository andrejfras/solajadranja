-- Seed courses
INSERT INTO courses (id, slug, name, short_description, description, image, boat, price_eur, price_label, duration, program, includes, note, related_course_slug, sort_order)
VALUES
  ('c1', 'beginner', 'Začetni tečaj jadranja', 'Osnovni tečaj jadranja za začetnike.', 'Imate opravljen izpit za voditelja čolna, a vam primanjkuje praktičnih izkušenj z jadranjem? Začetni tečaj jadranja je idealna osnova za samozavestno in varno upravljanje jadrnice. Tečaj je namenjen vsem, tudi kandidatom ki še nimajo izpita za voditelja čolna, vendar si želijo osvojiti temeljna znanja in veščine, potrebne za aktivno sodelovanje v jadralski posadki.', '/images/beginner.jpg', 'Express 770', 149, '149€ na osebo', '2 dnevni tečaj jadranja (skupaj 9ur)',
   '["Uvod - spoznavanje jadrnice (tehnične značilnosti in pomorski izrazi)","Učenje osnovnih vozlov (osmica, moški vozel, pašnjak, vrzni vozel)","Organizacija posadke in delitev nalog","Priprava jadrnice ter njene opreme","Varnost na plovilu (analiza tveganj, varna uporaba opreme, premikanje po jadrnici in uporaba varnostne opreme)","Varna plovba v marini in privezovanje (z motorjem)","Priprava, dvig in osnove nastavljanja jader","Plovba z jadri z vetrom iz različnih smeri (uporaba različnih tehnik jadranja in obratov ter skrajševanje jader)","Upoštevanje pravil o izogibanju trčenju na morju v praksi"]',
   '["2 dnevni tečaj jadranja (skupaj 9ur)","Stroške najema plovila, goriva in zavarovanja","Jadralski priročnik","Video-gradiva"]',
   'Pri začetnem tečaju jadranja je poudarek na učenju jadranja in varni plovbi. Če vas zanima tečaj fokusiran na pristajanje in manevriranje v marini vam priporočamo Tečaj pristajanja.', 'course-docking', 1),

  ('c2', 'course-docking', 'Tečaj pristajanja in manevriranja', 'Tečaj varnega in natančnega pristajanja ter manevriranja v marinah.', 'Naučite se varnega in samozavestnega pristajanja v marinah v vseh vremenskih pogojih.', '/images/docking.jpg', 'Y999', 179, '179€ na osebo', '2 dnevni tečaj pristajanja (skupaj 9ur)',
   '["Uvod - spoznavanje jadrnice (tehnične značilnosti in pomorski izrazi)","Učenje osnovnih vozlov (osmica, moški vozel, pašnjak, vrzni vozel)","Organizacija posadke in delitev nalog","Priprava jadrnice ter njene opreme","Varnost na plovilu (analiza tveganj, varna uporaba opreme, premikanje po jadrnici in uporaba varnostne opreme)","Varna plovba v marini in privezovanje (z motorjem)","Priprava, dvig in osnove nastavljanja jader","Plovba z jadri z vetrom iz različnih smeri (uporaba različnih tehnik jadranja in obratov ter skrajševanje jader)","Upoštevanje pravil o izogibanju trčenju na morju v praksi"]',
   '["2 dnevni tečaj pristajanja (skupaj 9ur)","Stroške najema plovila, goriva in zavarovanja","Jadralski priročnik","Video-gradiva"]',
   NULL, NULL, 2),

  ('c3', 'course-rib', 'Tečaj plovbe z gumenjakom', 'Plovba in manevriranje z gumenjakom.', 'Imate izpit za voditelja čolna, a nimate praktičnega znanja za plovbo z gumenjakom? Opravite praktični tečaj plovbe z gumenjakom in se sami varno odpravite na morje s katerimkoli gumenjakom.', '/images/rib.jpg', 'Gumenjak 5m, 60hp', 99, '99€ na osebo', '4-urni tečaj plovbe na gumenjaku',
   '["Spoznavanje gumenjaka","Pregled in priprava čolna ter opreme","Varna plovba po marini (uporaba pravil o izogibanju trčenju na morju)","Glisiranje in manevriranje","Pristajanje z bočnim privezovanjem in izplutje","Privezovanje v četverovez in izplutje","Sidranje"]',
   '["4-urni tečaj plovbe na gumenjaku","Stroške najema plovila, goriva in zavarovanja","Priročnik za pristajanje","Video-gradiva"]',
   'Tečajniki izmenjujejo vloge na čolnu, tako da vsak izmed njih izvede vse vaje iz programa tečaja.', NULL, 3),

  ('c4', 'course-intermediate', 'Nadaljevalni tečaj jadranja', 'Navigacija ob obali, jadranje z genakerjem.', 'Naučite se varnega in samozavestnega pristajanja v marinah v vseh vremenskih pogojih.', '/images/intermediate.jpg', NULL, 180, '180€', NULL, NULL, NULL, NULL, NULL, 4),

  ('c5', 'course-regatta', 'Regatno jadranje', 'Treningi manevrov in udeležba na regatah.', 'Naučite se varnega in samozavestnega pristajanja v marinah v vseh vremenskih pogojih.', '/images/regatta.jpg', NULL, 180, '180€', NULL, NULL, NULL, NULL, NULL, 5)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  boat = EXCLUDED.boat,
  price_eur = EXCLUDED.price_eur,
  price_label = EXCLUDED.price_label,
  duration = EXCLUDED.duration,
  program = EXCLUDED.program,
  includes = EXCLUDED.includes,
  note = EXCLUDED.note,
  related_course_slug = EXCLUDED.related_course_slug,
  sort_order = EXCLUDED.sort_order;

-- Seed boats
DELETE FROM boats;
INSERT INTO boats (id, name, image, price_label, specs, sort_order) VALUES
  ('b1', 'Gumenjak', '/images/erikgumon.jpg', '289€', '7m, 150KM', 1),
  ('b2', 'Šolska jadrnica - Express 770', '/images/jajca.jpg', '115€/dan', '7,7m, 5KM', 2),
  ('b3', 'VSR 5.8', '/images/vsr.jpg', '199€/dan', '5.8m, 70KM', 3);

-- Seed admin user (password: admin123)
-- bcrypt hash of "admin123"
INSERT INTO admin_users (id, username, password_hash) VALUES
  ('a1', 'admin', '$2b$10$aPgdJ.KXat6T60zu3E.5UuAAQO9VzAdLHpEdfX33T6xUb0dH8yaW6')
ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Add a sample course date for demo
INSERT INTO course_dates (id, course_id, label, capacity, spots_remaining, enabled, created_at) VALUES
  ('d1', 'c1', '12.–13. april 2025', 6, 4, true, NOW()),
  ('d2', 'c1', '26.–27. april 2025', 6, 6, true, NOW()),
  ('d3', 'c2', '3.–4. maj 2025', 6, 2, true, NOW()),
  ('d4', 'c3', '10. maj 2025', 4, 4, true, NOW())
ON CONFLICT DO NOTHING;
