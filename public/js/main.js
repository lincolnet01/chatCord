const chatFrom = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

//Message from the server

socket.on("message", (msg) => {
  console.log(msg);
  outputMessage(msg);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit

chatFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
  e.target.elements.msg.focus() = "";
});

//Output message to DOM

const outputMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = ` <p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  chatMessages.appendChild(div);
};
