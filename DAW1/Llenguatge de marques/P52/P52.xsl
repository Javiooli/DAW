<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/">
        <html>
            <head>
                <title>La meva llista de desitjos</title>
                <link rel="stylesheet" href="./P52.css"/>
            </head>
            <body>
                <h1>La meva llista de desitjos</h1>
                <ul>
                    <xsl:for-each select="wishlist/wish"> <!-- Comanda XSL per generar files, una per desig -->
                        <li><xsl:value-of select="title"/></li>
                    </xsl:for-each>
                </ul>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
