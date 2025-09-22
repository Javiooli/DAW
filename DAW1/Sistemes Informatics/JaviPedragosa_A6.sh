#!/bin/bash
#Constants
re='^[0-9]+$'
possibleHands=("pedra" "paper" "tisora")

#Declaració variables
name=""
running=1
ronda=1
targetPoints=0
playerPoints=0
cpuPoints=0
playerHand=""
cpuHand=""
missatgeGuanyador=""

#Funcions
#Aquesta funció defineix aleatoriament la mà de l'ordinador
ordinador_tria() {
	cpuHand=${possibleHands[$(( RANDOM % 3 ))]}
}

#Aquesta funció compara la mà del jugador amb la de l'ordinador, envia el missatge pertinent i suma punts a qui correspongui
determinar_tirada() {
	case $cpuHand in
	pedra)
		case $playerHand in
			pedra)
				echo "L'ordinador ha jugat $cpuHand. Empat!"
			;;
			paper)
				echo "L'ordinador ha jugat $cpuHand. Guanyes la ronda!"
				((playerPoints++))
			;;
			tisora)
				echo "L'ordinador ha jugat $cpuHand. Perds la ronda!"
				((cpuPoints++))
			;;
			x)
				running=0
			;;
		esac
	;;
	paper)
		case $playerHand in
			paper)
				echo "L'ordinador ha jugat $cpuHand. Empat!"
			;;
			tisora)
				echo "L'ordinador ha jugat $cpuHand. Guanyes la ronda!"
				((playerPoints++))
			;;
			pedra)
				echo "L'ordinador ha jugat $cpuHand. Perds la ronda!"
				((cpuPoints++))
			;;
			x)
				running=0
			;;
		esac
	;;
	tisora)
		case $playerHand in
			tisora)
				echo "L'ordinador ha jugat $cpuHand. Empat!"
			;;
			pedra)
				echo "L'ordinador ha jugat $cpuHand. Guanyes la ronda!"
				((playerPoints++))
			;;
			paper)
				echo "L'ordinador ha jugat $cpuHand. Perds la ronda!"
				((cpuPoints++))
			;;
			x)
				running=0
			;;
		esac
	;;
	esac
}

#Aquesta funció comprova si algú ha guanyat comparant la quantitat de punts amb els punts objectiu
algu_guanyat () {
	if [ "$playerPoints" == "$targetPoints" ]
	then
		running=0
		missatgeGuanyador="Guanyes tú, $name!"
	elif [ "$cpuPoints" == "$targetPoints" ]
	then
		running=0
		missatgeGuanyador="Guanya l'ordinador..."
	elif [ "$cpuPoints" == "$playerPoints" ]
	then
		missatgeGuanyador="Empat!"
	else
		if [ "$playerPoints" -gt "$cpuPoints" ]
		then
			missatgeGuanyador="Guanyes tú, $name!"
		else
			missatgeGuanyador="Guanya l'ordinador..."
		fi
	fi
}


#Inici, on demanem el nom del jugador i la quantitat de rondes a jugar.
clear
echo "Pedra, paper o tisores, programat per Javier Pedragosa."
while [ "$name" == "" ] || [[ $name =~ $re ]]
do
	echo "Si us plau, introdueix el teu nom: "
	read -r name
	clear
done

echo "Benvingut/da, $name."

while ! [[ $targetPoints =~ $re ]] || [ "$targetPoints" -lt 1 ]
do
	echo "Quants punts vols jugar?"
	read -r targetPoints
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
while [ "$running" == 1 ]
do
	echo "Ronda $ronda. $name $playerPoints - $cpuPoints CPU"
	while [ "$playerHand" != "pedra" ] && [ "$playerHand" != "paper" ] && [ "$playerHand" != "tisora" ] && [ "$playerHand" != "x" ]
	do
		echo "Quina mà vols jugar, $name? ('pedra', 'paper' o 'tisora' (o 'x' per sortir))"
		read -r playerHand
	done
	ordinador_tria
	determinar_tirada
	playerHand=""
	echo "[INTRO per continuar]"
	read -r
	clear
	algu_guanyat
	((ronda++))
done

echo "Resultat després de $ronda rondes:"
echo "$name $playerPoints - $cpuPoints CPU"
echo "$missatgeGuanyador"
echo "INTRO per sortir"
read -r