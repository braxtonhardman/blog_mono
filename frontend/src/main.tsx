import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router";
import './assets/index.css'
import Home from "./app/routes/Home.tsx";
import Projects from "./app/routes/Projects.tsx";
import About from "./app/routes/About.tsx";
import Login from "./app/routes/Login.tsx";
import Letters from "./app/routes/Letters.tsx";
import PostForm from "./features/postform/PostForm.tsx";
import LettersDetail from "./features/letters/components/LettersDetail.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import App from "./app/App.tsx";
import ProjectForm from "./features/projectform/ProjectForm.tsx";



const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<ProjectForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/archives/create" element={<PostForm />} />
        <Route path="/archives" element={<Letters />} />
        <Route path="/archives/:title" element={<LettersDetail />} />
      </Routes>
    </BaseLayout>
  </BrowserRouter>
  ,
);
