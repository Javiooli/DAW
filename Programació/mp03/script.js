var msg, firstmsg;

function changeMessage() {
    msg = document.getElementById("message").innerHTML;
    if (msg === ">> Hello World! <<")
        document.getElementById("message").innerHTML = ">> Hola món! <<";
    else 
        document.getElementById("message").innerHTML = ">> Hello world! <<";

}

function das () {
    console.log('5' - 2);
}