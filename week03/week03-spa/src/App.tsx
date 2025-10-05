import { Link, Routes, Route } from "react-router-dom";

const HomePage = () => <h1 className="text-center mt-10">Home</h1>;
const BlogPage = () => <h1 className="text-center mt-10">Blog</h1>;
const NotFound = () => <h1 className="text-center mt-10">Not Found</h1>;

const Header = () => {
  return (
    <div className="flex justify-center w-full gap-4 bg-blue-200 p-4">
      <nav>
        <Link to="/HomePage" className="px-2 py-2 text-white">
          Home
        </Link>
        <Link to="/BlogPage" className="px-2 py-2 text-white">
          Blog
        </Link>
      </nav>
    </div>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/HomePage" element={<HomePage />}></Route>
        <Route path="/BlogPage" element={<BlogPage />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
