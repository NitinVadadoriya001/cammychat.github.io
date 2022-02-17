// client side server....

const socket = io('http://localhost:8000');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector('.container');
const audio = new Audio('../chat-tone.mp3');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message != "") {
        appned(`👥 You: ${message}`, 'right')
        socket.emit('send', message);
        messageInput.value = "";
    }

})

const appned = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }

}

const username = prompt("Enter Yout Name For Join : ")
console.log(username)
if (username != "" ) {

    socket.emit('new-user-joined', username);

    socket.on('user-joined', username => {
        appned(`👥 ${username} : Joined The Chat`, 'left')
    })
    socket.on('receiver', data => {
        appned(`👥 ${data.name} : ${data.usermessage} `, 'left')
    })

    socket.on('left', name => {
        if(name != ""){

            appned(`👥 ${name} : Left The Chat..`, 'left');
        }
    })
}