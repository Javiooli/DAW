-- Hotels que tenen habitacions de mes de 49 m2.
SELECT idHotel, nomHotel FROM hotels h
WHERE EXISTS (
	SELECT idHotel
	FROM habitacions hab
    WHERE hab.idHotel = h.idHotel AND hab.m2 > 49);
    
-- Clients que han fet reserves a l'hotel amb ID 10
SELECT idClient, nom, cognoms FROM clients
WHERE idClient IN ( SELECT idClient FROM reserves
						WHERE idHotel = 10 );
                        
-- Mostra tots els serveis, indicant si estan disponibles o no.
SELECT nomServei, 'Disponible' AS estat FROM serveis
	WHERE disponible = 1
UNION
SELECT nomServei, 'No disponible' AS estat FROM serveis
	WHERE disponible = 0 
ORDER BY nomServei;

-- Clients que tenen reserves actives, és a dir, que estiguin actualment allotjats a l'hotel.
SELECT idClient, nom, cognoms FROM clients c
WHERE EXISTS (
	SELECT 1
    FROM reserves r
    WHERE r.idClient = c.idClient
		AND CURDATE() BETWEEN r.dataInici AND r.dataFi);
        
-- Habitacions que pertanyen a les categories "Doble Deluxe" o "Suite"
SELECT numeroHabitacio, nom, categoria FROM habitacions h, categories c
WHERE h.idCategoria = c.idcategoria AND h.idCategoria IN (
	SELECT c.idcategoria
    FROM categories c
    WHERE c.categoria IN ('Doble Deluxe', 'Suite'));
            
        
