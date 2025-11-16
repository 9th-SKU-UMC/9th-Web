import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import lpImg from "../assets/lp.jpeg";
import { useCreateLp } from "../hooks/mutations/useCreateLp"; // ← 추가

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // 작성 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const createLpMutation = useCreateLp();

  // 이미지 미리보기
  const [preview, setPreview] = useState(lpImg);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = () => {
    if (!title || !content || !thumbnail) {
      alert("모든 값을 입력하세요.");
      return;
    }

    const payload = {
      title,
      content,
      thumbnail,
      tags: ["a", "b", "c"],
      published: true,
    };

    createLpMutation.mutate(payload, {
      onSuccess: () => {
        alert("LP가 생성되었습니다!");
        closeModal();
      },
      onError: (err) => {
        console.error("LP 생성 실패:", err);
        alert("LP 생성 중 오류가 발생했습니다.");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setThumbnail(e.target.value);

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  return (
    <div className="flex relative min-h-screen">
      {/* 사이드바 */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } h-screen bg-white dark:bg-[#15161A] shadow-md flex flex-col transition-all duration-300 fixed left-0 top-0 z-20`}
      >
        {/* 사이드바 상단 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>
        </div>

        {/* 메뉴 */}
        <nav className="flex-grow mt-4 overflow-y-auto">
          <NavLink
            to="/"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">LP 목록</span>}
          </NavLink>

          <NavLink
            to="/popular"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">인기 영화</span>}
          </NavLink>

          <NavLink
            to="/upcoming"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">개봉 예정</span>}
          </NavLink>

          <NavLink
            to="/top-rated"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">평점 높은</span>}
          </NavLink>

          <NavLink
            to="/now-playing"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">상영 중</span>}
          </NavLink>
        </nav>
      </div>

      {/* 메인 영역 */}
      <div
        className={`flex-1 transition-all ${
          collapsed ? "ml-16" : "ml-64"
        } min-h-screen bg-gray-50`}
      >
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* 플로팅 버튼 */}
      <button
        onClick={openModal}
        className="cursor-pointer fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white text-3xl shadow-xl flex items-center justify-center z-50"
      >
        +
      </button>

      {/* 모달 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm relative h-[450px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="flex flex-col gap-3">
              {/* 이미지 업로드 박스 */}
              <div className="flex justify-center mt-8">
                <div className="relative w-[140px] h-[140px]">
                  <img
                    src={preview}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="LP Name"
                className="border mt-8 p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="LP Content"
                className="border p-2 rounded"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <button
                className="bg-black text-white py-2 rounded cursor-pointer mt-2"
                onClick={handleSubmit}
              >
                Add LP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
