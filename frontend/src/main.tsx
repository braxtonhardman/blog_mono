import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router";
import './assets/index.css'
import App from './app/App.tsx'
import Home from "./app/routes/Home.tsx";
import Projects from "./app/routes/Projects.tsx";
import About from "./app/routes/About.tsx";
import Login from "./app/routes/Login.tsx";
import Letters from "./app/routes/Letters.tsx";
import PostForm from "./features/postform/PostForm.tsx";
import LettersDetail from "./features/letters/components/LettersDetail.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";



const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currentprojects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/letters/create" element={<PostForm />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/letters/:title" element={<LettersDetail />} />
      </Routes>

    
      <App />
    </BaseLayout>
  </BrowserRouter>
  ,
);
