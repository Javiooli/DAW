const app = Vue.createApp({
    data() {
        const abecedario = ['a','b','c','d','e','f','g','h','y','j','k'];
        let letters = Math.random();
        let message = "";
        for (let i = 2; i < letters.toString().length; i++) {
            message += abecedario[letters.toString()[i]];
        }
        return {
        message: `${message}`
        }
    }
})
   
app.mount('#app')