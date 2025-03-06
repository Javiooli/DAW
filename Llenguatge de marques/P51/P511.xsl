<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Equips de Futbol</title>
                <link rel="stylesheet" href="./P511.css"/>
            </head>
            <body>
                <h1>Equips de Futbol</h1>
                <!-- Contenidor pels focs artificials -->
                <div id="fireworks-container"></div>
                <!-- Taula d'equips -->
                <table>
                    <tr> <!-- Capçalera -->
                        <th>Equip</th>
                        <th>Localitat</th>
                    </tr>
                    <xsl:for-each select="equips/equip"> <!-- Comanda XSL per generar files, una per equip -->
                        <tr>
                            <td><xsl:value-of select="nom"/></td>
                            <td><xsl:value-of select="localitat"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
                <!-- Script pels focs artificials -->
                <script src="fireworks.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

