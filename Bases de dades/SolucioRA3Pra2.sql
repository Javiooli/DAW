-- 1. Obtenir els noms dels hotels 
			de 3 i 5 estrelles (UNION)
SELECT nomHotel FROM hotels 
	WHERE estrelles = 3
UNION
SELECT nomHotel FROM hotels 
	WHERE estrelles = 5;

-- 2. Reserves que encara no s'han facturat
-- ((NOT)EXISTS)
SELECT * FROM reserves r
	WHERE NOT EXISTS (
		SELECT 1 FROM factures f
			WHERE f.idHotel = r.idHotel 
			AND f.numReserva = r.numReserva);

--3. Clients qe NO han reservat 
-- serveis d'hotels.((NOT)IN)
SELECT * FROM clients c
	WHERE c.idClient NOT IN (
		SELECT DISTINCT r.idClient
		FROM reserves r, reservesserveis rs
			WHERE r.idHotel = rs.idHotel 
			AND r.numReserva = rs.numReserva);
			
-- 4. Clients que han fet reserves 
-- ((NOT)IN) ((NOT)EXISTS)
SELECT * FROM clients c
	WHERE c.idClient 
	IN (SELECT DISTINCT r.idClient 
	FROM reserves r);
	
SELECT * FROM clients c WHERE EXISTS (
    SELECT 1 FROM reserves r 
	WHERE r.idClient = c.idClient);

-- 5. Obtenir els serveis que 
-- no ofereix cada hotel ((NOT)IN) ((NOT)EXISTS)

SELECT s.idHotel, sh.idServei 
	FROM serveishotels sh
	WHERE sh.idServei NOT IN 
	(SELECT s.idServei FROM serveis s);

SELECT sh.idHotel, sh.idServei 
FROM serveishotels sh
	WHERE NOT EXISTS 
	(SELECT 1 FROM serveis s
    WHERE s.idServei = sh.idServei);


-- 6. Categories d'habitacions que 
-- ofereix cada hotel ((NOT)IN) ((NOT)EXISTS)
SELECT DISTINCT nomHotel, categoria FROM hotel h , habitacions ha 
		WHERE h.idHotel = ha.idHotel 
		and ha.idCategoria IN 
		(select c.idCategoria 
		FROM categories c)
		
SELECT DISTINCT nomHotel, categoria FROM hotel h , habitacions ha 
		WHERE h.idHotel = ha.idHotel 
		and EXISTS (select 1 FROM categories c 
			WHERE c.idCategoria=ha.idCategoria)		

-- 7. Països amb províncies sense hotels ((NOT)IN) ((NOT)EXISTS)
SELECT DISTINCT pr.idPais
FROM provincies pr 
  WHERE pr.idProvincia NOT IN (
		SELECT DISTINCT h.idProvincia 
		FROM hotels h);

SELECT DISTINCT p.nomPais
FROM paisos p, provincies pr 
  WHERE p.idPais = pr.idPais 
  and pr.idProvincia NOT IN (
		SELECT DISTINCT h.idProvincia FROM hotels h);
		
SELECT DISTINCT p.nomPais
FROM paisos p, provincies pr 
	WHERE p.idPais = pr.idPais and NOT EXISTS (
		SELECT 1 FROM hotels h 
		WHERE pr.idProvincia=h.idProvincia);		
