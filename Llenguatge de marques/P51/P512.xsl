<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Lliga d'Islàndia</title>
                <link rel="stylesheet" href="./P512.css"/>
            </head>
            <body>
                <h1>Classificació Lliga Islandesa</h1>
                <!-- Contenidor pels focs artificials -->
                <div id="fireworks-container"></div>
                <table> <!-- Taula d'equips -->
                    <tr> <!-- Capçalera -->
                        <th>Equips</th>
                        <th>PJ</th>
                        <th>V</th>
                        <th>E</th>
                        <th>D</th>
                        <th>GF</th>
                        <th>GC</th>
                        <th>DG</th>
                        <th>PT</th>
                    </tr>
                    <xsl:for-each select="lliga/equip"> <!-- Comanda XSL per generar files, una per equip -->
                        <tr>
                            <td><xsl:value-of select="nom"/></td>
                            <td><xsl:value-of select="PJ"/></td>
                            <td><xsl:value-of select="V"/></td>
                            <td><xsl:value-of select="E"/></td>
                            <td><xsl:value-of select="D"/></td>
                            <td><xsl:value-of select="GF"/></td>
                            <td><xsl:value-of select="GC"/></td>
                            <td><xsl:value-of select="DG"/></td>
                            <td><xsl:value-of select="PT"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
                <!-- Script pels focs artificials -->
                <script src="fireworks.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

