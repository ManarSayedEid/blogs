# News Dashboard 
<img width="1022" height="719" alt="image" src="https://github.com/user-attachments/assets/8d63119f-9dec-4afa-a1f9-ea2d86dca1b2" />
<img width="561" height="516" alt="image" src="https://github.com/user-attachments/assets/d643e5aa-662b-4529-a5f6-726fa4bdd2ba" />
<img width="522" height="601" alt="image" src="https://github.com/user-attachments/assets/a6054fb7-f4a1-429b-abeb-0a5e290ff080" />

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Styling**: Tailwind CSS 
- **Routing**: React Router
- **State Management**: React Context API
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **API**: NewsAPI

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:ManarSayedEid/blogs.git
   cd blogs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env in root directory
   you can get yours from here: https://newsapi.org/
   or use mine (⚠️ for demo purposes, api_key should not be exposed)
   VITE_NEWSAPI_KEY=1089fcd8de8f4c7e8398f366b3679ee5
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🧪 Testing

```bash
npm run test
```

## 📁 Project Structure

```
src/
├── components/
│   ├── RegisterForm/
│   ├── LoginForm/
│   ├── News/
│   ├── ArticleCard/
│   ├── Navbar/
│   ├── Loader/
│   └── ErrorFB/
├── pages/
│   ├── Register/
│   ├── Login/
│   └── Dashboard/
├── context/
│   ├── AuthContext.ts
│   └── AuthContextProvider.tsx
├── utils/
│   ├── validators/
│   └── authStorage/
├── data/
│   └── fetchNews.tsx
├── App.tsx
└── main.tsx
```
---
