#!/bin/bash

#Definició variables
name=""
running=true
round=0
targetPoints=0
playerPoints=0
cpuPoints=0
playerHand=""
cpuHand=""
possibleHands=("pedra" "paper" "tisora")
clear
#Inici, on demanem el nom del jugador i la quantitat de rondes a jugar.
echo "Pedra, paper o tisores, programat per Javier Pedragosa."
while [ "$name" == "" ]
do
	echo "Si us plau, introdueix el teu nom: "
	read name
	clear
done

echo "Benvingut/da, $name."

while [ "$targetPoints" -lt 1 ]
do
	echo "Quants punts vols jugar?"
	read targetPoints
	clear
done

#Imprimim les instruccions del joc.
echo "Per jugar pedra, introdueix 'pedra'."
echo "Per jugar paper, introdueix 'paper'."
echo "Per jugar tisora, introdueix 'tisora'."
echo "Per finalitzar el joc abans de temps, introdueix 'x'."
echo ""
echo "Iniciar joc (intro)?"
read -r
clear
#Bucle principal del joc.
while [ "$running" == true ]
do
	echo "$name $playerPoints - $cpuPoints CPU"
	while [ "$playerHand" != "pedra" ] && [ "$playerHand" != "paper" ] && [ "$playerHand" != "tisores" ] && [ "$playerHand" != "x" ]
	do
		echo "Quina mà vols jugar ('pedra', 'paper' o 'tisores' (o 'x' per sortir))?"
		read -r playerHand
	done
	cpuHand=${possibleHands[$(( RANDOM % 3 ))]}
	echo "$cpuHand"
	playerHand=""
done
