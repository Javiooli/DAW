<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Menú del dia</title>
                <link rel="stylesheet" href="./menu.css"/>
            </head>
            <body>
                <h1>Menú del dia</h1>
                <ul>
                    <xsl:for-each select="menu/item"> <!-- Per cada ítem del menú: -->
                        <li>
                            <h3><xsl:value-of select="@title"/></h3> <!-- Seleccionem el títol de l'ítem, és a dir, si és primer, segon, postre o beguda. -->
                            <ul>
                                <xsl:for-each select="subitem"> <!-- Per cada plat o article en la categoria: -->
                                    <li>
                                        <xsl:value-of select="@name"/> - <!-- Seleccionem el nom, el preu i la descripció.-->
                                        <span class="price"><xsl:value-of select="@price"/></span>
                                        <p><xsl:value-of select="."/></p>
                                    </li>
                                </xsl:for-each>
                            </ul>
                        </li>
                    </xsl:for-each>
                </ul>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>


