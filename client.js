const socket = io("http://localhost:8000")

const name = prompt("Enter Your Name :  ")
socket.emit('new-user-joined',name)

const form = document.getElementById("myform")
const message = document.getElementById("msg")
const midsection = document.getElementById("midsection")

function append(message,position){
    const p = document.createElement("p")
    const text = document.createTextNode(message)
    p.append(text)
    p.classList.add(position)
    midsection.appendChild(p)
}

socket.on("user-joined",name=>{
    append(`${name} Joined the Chat`,'mid')
})
socket.on("receive",data=>{
    append(`${data.name} : ${data.message}`,'left')
})

socket.on("user-left",name=>{
    append(`${name} left the Chat`,"mid");
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const message = msg.value
    append(`${message}:You`,"right")
    socket.emit("send",message)
    msg.value=""
})
