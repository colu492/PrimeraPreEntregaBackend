const io = require('socket.io-client');
const socket = io('http://localhost:8080');


socket.on('newProduct', (event) => {
    if (event.type === 'newProduct') {
        let item = document.createElement('li');
        item.innerText = event.data.name + ' - ' + event.data.price;
        document.getElementById('product-list').appendChild(item);
        }
    });
    
    socket.on('deleteProduct', (event) => {
        if (event.type === 'deleteProduct') {
        let item = document.getElementById(event.data);
        if (item) {
            item.parentNode.removeChild(item);
        }
        }
    });

module.exports =  {socket};