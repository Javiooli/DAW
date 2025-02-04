-- RA3 Prova Practica

-- Resol amb instruccions següents amb SQL
-- 1. Quantes reserves ha fet cada client?
SELECT c.nom, c.cognoms, COUNT(*) as reserves FROM clients c, reserves r
WHERE c.idClient = r.idClient
GROUP BY nom, cognoms;

-- 2. Quantes factures hi ha de cada client?
SELECT c.nom, c.cognoms, COUNT(*) as factures FROM clients c, reserves r, factures f
WHERE c.idClient = r.idClient AND r.idHotel = f.idHotel
GROUP BY nom, cognoms;

-- 3. Quants serveis disponibles té cada hotel?
SELECT h.nomHotel, count(*) as serveis FROM hotels h, serveishotels s
WHERE h.idHotel = s.idHotel
GROUP BY h.nomHotel;

-- 4. Obtenir la quantitat d'hotels per cada país i filtrar només els països amb més de 5 hotels.
SELECT p.pais, count(*) as hotels FROM paisos p, hotels h
WHERE p.idPais = h.idPais
GROUP BY p.pais HAVING count(*) > 5;

-- 5. Quantes habitacions hi ha de cada categoria en cada hotel?
SELECT h.nomHotel, c.categoria, count(*) FROM hotels h, categories c, habitacions ha
WHERE h.idHotel = ha.idHotel AND ha.idCategoria = c.idCategoria
GROUP BY c.categoria, h.nomHotel
ORDER BY h.nomHotel;

-- 6. Obtenir la llista de noms i cognoms dels clients de les províncies Barcelona, Valencia i Madrid.
SELECT p.provincia, c.nom, c.cognoms FROM provincies p, clients c
WHERE c.idProvincia = p.idProvincia AND p.provincia IN('Barcelona','Valencia','Madrid')
ORDER BY p.provincia;

-- 7. Mostrar els noms de les províncies que tenen almenys un hotel registrat (EXISTS i IN).
SELECT p.provincia FROM provincies p
WHERE EXISTS (SELECT 1 FROM hotels h WHERE h.idProvincia = p.idProvincia);

SELECT p.provincia FROM provincies p
WHERE p.idProvincia IN (SELECT p.idProvincia FROM hotels h WHERE h.idProvincia = p.idProvincia);

-- 8. Noms dels països amb alguna província amb més de tres hotels (IN).
SELECT DISTINCT p.pais FROM paisos p, provincies pr
WHERE p.idPais = pr.idPais AND pr.idProvincia IN (SELECT pr.idProvincia FROM provincies pr, hotels h
	WHERE pr.idProvincia = h.idProvincia
	GROUP BY pr.idProvincia
	HAVING COUNT(h.nomHotel) > 3);

-- 9. Noms i cognoms dels clients que han fet reserves d'habitacions amb més de dues persones,
-- és a dir habitacions triples i de més persones. (IN i EXISTS)
SELECT c.nom, c.cognoms FROM clients c, reserves r
WHERE r.idClient = c.idClient AND r.numReserva NOT IN (
	SELECT DISTINCT r.numReserva FROM reserves r, reserveshab rh, habitacions h, categories c
    WHERE r.numReserva = rh.numReserva AND rh.numHabitacio = h.numeroHabitacio AND h.idCategoria = c.idCategoria AND c.categoria IN ('Individual Estàndard','Individual Superior'));
    
SELECT c.nom, c.cognoms FROM clients c, reserves r
WHERE r.idClient = c.idClient AND NOT EXISTS (
	SELECT DISTINCT 1 FROM reserves r, reserveshab rh, habitacions h, categories c
    WHERE r.numReserva = rh.numReserva AND rh.numHabitacio = h.numeroHabitacio AND h.idCategoria = c.idCategoria AND c.categoria IN ('Individual Estàndard','Individual Superior'));

-- 10. Llista dels noms i cognoms dels clients que tenen reserves que no s'han facturat (IN i EXISTS).
SELECT c.nom, c.cognoms FROM clients c
WHERE c.idClient IN (
	SELECT r.idClient FROM reserves r
	WHERE r.numReserva NOT IN (SELECT * FROM factures));
    
SELECT c.nom, c.cognoms FROM clients c
WHERE EXISTS (
	SELECT 1 FROM reserves r
	WHERE r.numReserva NOT IN (SELECT * FROM factures));