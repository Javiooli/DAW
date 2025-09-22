var msg, firstmsg;

function changeMessage() {
    msg = document.getElementById("message").textContent;
    if (msg === ">> Hello world! <<")
        document.getElementById("message").textContent = ">> Hola món! <<";
    else 
        document.getElementById("message").textContent = ">> Hello world! <<";

}