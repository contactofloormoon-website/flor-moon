INSERT INTO dj (slug, name, bio, location, genres, highlights, labels, hero_name, hero_tagline) 
VALUES ('flor-moon', 'FLOR MOON', 'Productor y DJ argentino de música electrónica con más de 10 años de experiencia en la escena underground.', 'Buenos Aires, Argentina', '["Techno","Melodic House","Progressive"]', '["Club de la Música 2024","Ultra Buenos Aires 2023"]', '["Armada Music","Anjunadeep"]', 'FLOR MOON', 'Electronic Music Producer & DJ');

INSERT INTO event (dj_id, title, date, venue, city, ticket_url, is_featured)
SELECT id, 'Club de la Música Festival', '2026-06-15 20:00:00', 'Tecnópolis', 'Buenos Aires', 'https://example.com/tickets', 1
FROM dj WHERE slug = 'flor-moon';

INSERT INTO event (dj_id, title, date, venue, city, ticket_url, is_featured)
SELECT id, 'Sunset Sessions', '2026-07-20 18:00:00', 'The Bow', 'Buenos Aires', NULL, 0
FROM dj WHERE slug = 'flor-moon';

INSERT INTO music (dj_id, platform, url, is_primary, order_index)
SELECT id, 'spotify', 'https://spotify.com/artist/flormoon', 1, 0
FROM dj WHERE slug = 'flor-moon';

INSERT INTO music (dj_id, platform, url, is_primary, order_index)
SELECT id, 'soundcloud', 'https://soundcloud.com/flormoon', 0, 1
FROM dj WHERE slug = 'flor-moon';

INSERT INTO contact (dj_id, email, social_instagram)
SELECT id, 'booking@flormoon.com', 'https://instagram.com/flormoon'
FROM dj WHERE slug = 'flor-moon';