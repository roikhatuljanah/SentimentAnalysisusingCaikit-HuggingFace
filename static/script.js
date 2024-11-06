let savedpasttext = []; // Variable to store the message
let savedpastresponse = []; // Variable to store the message

// Section: get the Id of the talking container
const messagesContainer = document.getElementById('messages-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Section: function to create the dialogue window
const addMessage = (message, role, imgSrc) => {
  const messageElement = document.createElement('div');
  const textElement = document.createElement('p');
  messageElement.className = `message ${role}`;
  const imgElement = document.createElement('img');
  imgElement.src = imgSrc;

  // Append the image and message to the message element
  messageElement.appendChild(imgElement);
  textElement.innerText = message;
  messageElement.appendChild(textElement);
  messagesContainer.appendChild(messageElement);

  // Create the ending of the message
  const clearDiv = document.createElement("div");
  clearDiv.style.clear = "both";
  messagesContainer.appendChild(clearDiv);
};

// Section: Calling the model
const sendMessage = async (message) => {
  addMessage(message, 'user', '../static/user.jpeg');

  // Loading animation
  const loadingElement = document.createElement('div');
  const loadingTextElement = document.createElement('p');
  loadingElement.className = `loading-animation`;
  loadingTextElement.className = `loading-text`;
  loadingTextElement.innerText = 'Loading....Please wait';
  messagesContainer.appendChild(loadingElement);
  messagesContainer.appendChild(loadingTextElement);

  async function makePostRequest(msg) {
    const url = 'http://127.0.0.1:5000/chatbot'; // Update to the correct endpoint
    const requestBody = {
      prompt: msg
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      // Parse the response as JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return { error: "Failed to connect to the server." };
    }
  }

  const data = await makePostRequest(message);

  // Deleting the loading animation
  const loadAnimation = document.querySelector('.loading-animation');
  const loadText = document.querySelector('.loading-text');
  if (loadAnimation) loadAnimation.remove();
  if (loadText) loadText.remove();

  if (data.error) {
    // Handle the error here
    const errorMessage = data.error;
    addMessage(errorMessage, 'error', '../static/Error.png');
  } else {
    // Process the normal response here
    const responseMessage = data['response'];
    addMessage(responseMessage, 'aibot', '../static/Bot_logo.png');
  }
};

// Section: Button to submit to the model and get the response
messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message !== '') {
    messageInput.value = '';
    await sendMessage(message);
  }
});
