const EventEmitter = require("events");

const emitter = new EventEmitter();


setTimeout(() => {
    emitter.emit("timer", "Aloha mai kākou!");
}, 1000) ;



const userName = "aladdin";
const password = "opensesame";

const authEmitter = new EventEmitter();

authEmitter.on('login', (userName) => {
    console.log(`Username: ${userName} logged in. \n`);
});

authEmitter.on('error', (error) => {
    console.error(`Failed to login: `, error.message);
});

const simulateLogin = async  (user, pass) => {
    if (userName === userName && pass == password) {
        authEmitter.emit('login', user);
    } else {
        authEmitter.emit('error', new Error('Username or password was not found.'));
    }
}



const statusEmitter = new EventEmitter();

statusEmitter.on('setstatus', (status) => {
    console.log(`Status: ${status} \n`);
});

//simulates the correct password
simulateLogin('aladdin', 'opensesame');
//simulates a wrong password 
simulateLogin('aladdin', 'roastedsesame');
statusEmitter.emit('setstatus', 'active');
emitter.on("timer", (msg) => console.log(msg));


