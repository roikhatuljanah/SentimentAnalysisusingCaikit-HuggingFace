<h1 align="center"> Chatbot dengan Flask dan Model Transformer </h1>
<p align="center"> Proyek ini membuat chatbot sederhana menggunakan Flask sebagai backend dan model transformer Hugging Face untuk interaksi percakapan yang dinamis.</p>

<div align="center">
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54">
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">
  <img src="https://img.shields.io/badge/transformers-%23FF6F00.svg?style=for-the-badge&logo=transformers&logoColor=white">
</div>

---

## Deskripsi Proyek
Proyek ini mengimplementasikan chatbot berbasis web yang memungkinkan pengguna berinteraksi dengan bot menggunakan model `facebook/blenderbot-400M-distill` dari Hugging Face Transformers. Aplikasi menggunakan Flask sebagai server, sementara antarmuka frontend dibuat dengan HTML, CSS, dan JavaScript.

## Fitur

- **Respons Percakapan**: Bot memberikan respons relevan berdasarkan input pengguna.
- **Riwayat Obrolan**: Riwayat percakapan disimpan dalam sesi untuk mempertahankan konteks obrolan.

---

## Instalasi

1. **Clone Repositori**
   ```bash
   git clone <URL_REPOSITORI>
   cd <NAMA_REPOSITORI>

2. **Install Dependensi**
   ```bash
   pip install -r requirements.txt

3. **Unduh Model Model /facebook/blenderbot-400M-distill akan otomatis diunduh saat pertama kali menjalankan kode**

4. **Jalankan Server Flask**
   ```bash
   flask run

5. **Struktur Proyek**
   
- app.py: File utama server untuk API dan pemrosesan model.
- templates/index.html: Halaman utama antarmuka chatbot.
- static/css/style.css: File CSS untuk desain tampilan.
- static/script.js: File JavaScript untuk pengaturan frontend dan pengiriman pesan ke server Flask.

6. **Cara Penggunaan**
   
- Masukkan pesan di kolom input dan tekan "Enter" atau tombol kirim untuk mengirim pesan.Bot akan memberikan respons di bawah pesan Anda.

7. **API Endpoint**
- GET /: Menampilkan antarmuka utama chatbot.
- POST /chatbot: Menerima input pengguna, memprosesnya dengan model chatbot, dan mengembalikan respons.

8. **Troubleshooting**
    
- 405 Method Not Allowed: Pastikan Anda mengirimkan POST request ke /chatbot dan server Flask sedang berjalan.
- Respons Tidak Relevan atau Berulang: Coba sesuaikan parameter model seperti max_length, temperature, top_p, atau top_k di app.py untuk meningkatkan kualitas respons.
