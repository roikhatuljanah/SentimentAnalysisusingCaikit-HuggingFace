from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import json
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

app = Flask(__name__)
CORS(app)

model_name = "facebook/blenderbot-400M-distill"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
conversation_history = []

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def handle_prompt():
    data = request.get_json()  # Mengambil data JSON dari request
    input_text = data.get('prompt')

    # Membuat string riwayat percakapan
    history = "\n".join(conversation_history[-5:])

    # Tokenisasi teks input dan riwayat
    inputs = tokenizer.encode_plus(input_text, return_tensors="pt")

    # Menghasilkan respons dari model
    outputs = model.generate(**inputs, max_length=50, top_k=50, top_p=0.95, temperature=0.7)

    # Decode respons
    response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

    # Menambahkan interaksi ke riwayat percakapan
    conversation_history.append(input_text)
    conversation_history.append(response)

    # Return respons sebagai JSON
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run()
