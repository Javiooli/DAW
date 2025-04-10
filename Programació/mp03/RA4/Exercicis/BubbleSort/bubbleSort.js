function bubbleSort(arrayP) {
    let counter = 0;
    const array = arrayP;
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < (array.length - i); j++) {
            if (array[j] > array[j+1]) {
                let aux = array[j];
                array[j] = array[j+1];
                array[j+1] = aux;
            }
            counter++;
        }
    }
    console.log("Iteracions: " + counter);
    return array;
}

document.addEventListener("DOMContentLoaded", () => {
    const array = [1, 5, 6, 7, 3, 2];
    console.log(array);
    console.log(bubbleSort(array));
})