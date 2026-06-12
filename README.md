# MyEco

MyEco adalah aplikasi web berbasis gamification untuk membantu pengguna mencatat aktivitas ramah lingkungan, menghitung estimasi pengurangan emisi karbon, mengikuti eco challenge, mengumpulkan poin, membuka badge, dan bersaing melalui leaderboard.

Project ini dikembangkan untuk mengikuti **OLIVIA 2026 (Olimpiade Vokasi Nasional)** cabang lomba **Web Technology** yang diselenggarakan oleh **Universitas Negeri Surabaya (UNESA)**.

## Live Demo

Aplikasi MyEco dapat diakses melalui link berikut:

```txt
https://myeco-olivia.vercel.app
```

## Fitur Utama

### 1. Authentication

Pengguna dapat membuat akun dan masuk ke aplikasi menggunakan sistem autentikasi. MyEco juga mendukung login menggunakan Google.

### 2. Onboarding

Setelah registrasi, pengguna mengisi data awal seperti username, kampus, dan foto profil. Data ini digunakan untuk profil pengguna dan leaderboard.

### 3. Dashboard

Dashboard menampilkan ringkasan kontribusi pengguna, seperti:

* Total eco points
* Total carbon saved
* Streak aktivitas
* Progress level pengguna
* Grafik aktivitas mingguan
* Ringkasan dampak lingkungan

### 4. Activity Tracker

Pengguna dapat menambahkan aktivitas ramah lingkungan seperti:

* Bike Ride
* Recycling
* Public Transport
* Bring Tumbler
* Plant Tree

Setiap aktivitas memiliki poin dan estimasi pengurangan karbon. Sistem juga memiliki batas aktivitas harian untuk mencegah penyalahgunaan poin.

### 5. Daily Limit System

MyEco menerapkan pembatasan aktivitas harian berdasarkan kategori. Sistem ini digunakan agar pengguna tidak dapat menambahkan aktivitas secara berlebihan dan memperoleh poin tanpa batas.

Validasi dilakukan melalui frontend dan database function agar sistem lebih aman.

### 6. Eco Challenges

Pengguna dapat mengikuti challenge ramah lingkungan. Challenge memiliki target aktivitas tertentu, reward points, dan carbon reward.

Contoh challenge:

* No Plastic Week
* Bike To Campus
* Save Electricity
* Bring Tumbler

### 7. Badge System

Pengguna dapat membuka badge berdasarkan jumlah eco points yang berhasil dikumpulkan.

Contoh badge:

* Seedling
* Eco Starter
* Green Mover
* Eco Hero
* Earth Guardian

### 8. Leaderboard

Leaderboard menampilkan pengguna dengan eco points tertinggi. Fitur ini bertujuan membangun kompetisi positif antar pengguna.

### 9. Public Profile

Setiap pengguna memiliki halaman profil publik berdasarkan username. Halaman ini menampilkan ringkasan kontribusi pengguna seperti poin, carbon saved, badge, dan aktivitas terbaru.

### 10. Admin Panel

Admin dapat mengelola data utama aplikasi, seperti:

* Users
* Activity categories
* Challenges
* Badges

Admin juga dapat mengatur reward points, carbon factor, daily limit, dan data challenge.

## Teknologi yang Digunakan

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion
* Chart.js
* Lucide React
* React Hot Toast

### Backend & Database

* Supabase Authentication
* Supabase Database
* Supabase Storage
* Supabase RPC / Database Function
* Row Level Security

### Deployment

* Vercel

## Struktur Halaman

```txt
/
├── /login
├── /register
├── /forgot-password
├── /reset-password
├── /auth/callback
├── /auth/redirect
├── /onboarding
├── /dashboard
├── /activities
├── /challenges
├── /leaderboard
├── /profile
├── /u/[username]
└── /admin
    ├── /admin/users
    ├── /admin/categories
    ├── /admin/challenges
    └── /admin/badges
```

## Database Utama

MyEco menggunakan beberapa tabel utama, yaitu:

* `profiles`
* `activity_categories`
* `user_activities`
* `challenges`
* `user_challenges`
* `badges`
* `user_badges`

Setiap tabel saling terhubung untuk mendukung sistem aktivitas, poin, challenge, badge, dan leaderboard.

## Keamanan

MyEco menggunakan Row Level Security dari Supabase untuk membatasi akses data. Pengguna hanya dapat mengelola data miliknya sendiri, sedangkan admin memiliki akses untuk mengelola data aplikasi melalui admin panel.

Beberapa proses penting seperti penambahan dan penghapusan aktivitas juga menggunakan database function agar validasi tidak hanya bergantung pada frontend.

## Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/Swallowtail1/MyEco.git
cd MyEco
```

### 2. Install Dependency

```bash
npm install
```

### 3. Konfigurasi Environment Variable

Buat file `.env.local` lalu isi dengan konfigurasi Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka aplikasi di browser:

```txt
http://localhost:3000
```

## Build Project

Untuk membuat versi production:

```bash
npm run build
```

Untuk menjalankan hasil build:

```bash
npm start
```

## Team Members

Project ini dikembangkan oleh:

| Nama                  | 
| --------------------- | 
| Abiyyu Zahy Al Akram  | 
| Muhammad Hafizh zuhdi | 
| Ilham Munawwar Hanif  | 


## Status Project

Project sudah dideploy menggunakan Vercel dan dapat dikembangkan lebih lanjut dengan fitur tambahan seperti:

* Verifikasi aktivitas
* Sistem reward lanjutan
* Statistik komunitas
* Notifikasi challenge
* Export laporan aktivitas
* Integrasi peta atau lokasi aktivitas

## License

Project ini dibuat untuk kebutuhan kompetisi dan pembelajaran. Penggunaan atau pengembangan lebih lanjut dapat disesuaikan dengan kebutuhan tim.
