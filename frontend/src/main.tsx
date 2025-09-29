import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router";
import './assets/index.css'
import Home from "./app/routes/Home.tsx";
import Projects from "./app/routes/Projects.tsx";
import About from "./app/routes/About.tsx";
import Letters from "./app/routes/Letters.tsx";
import PostForm from "./features/postform/PostForm.tsx";
import LettersDetail from "./features/letters/components/LettersDetail.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import ProjectForm from "./features/projectform/ProjectForm.tsx";
import LoginCard from "./features/users/LoginCard.tsx";
import CreateForm from "./features/users/CreateForm.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";



const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/projects/create"
          element={
            <ProtectedRoute>
              <ProjectForm />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/user/login" element={<LoginCard />} />
        <Route path="/user/create" element={<CreateForm />} />
        <Route
          path="/archives/create"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route path="/archives/create" element={<PostForm />} />
        <Route path="/archives" element={<Letters />} />
        <Route path="/archives/:title" element={<LettersDetail />} />
      </Routes>
    </BaseLayout>
  </BrowserRouter>
  ,
);
