import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import lpImg from "../assets/lp.jpeg";
import { useCreateLp } from "../hooks/mutations/useCreateLp";
import { useDeleteUser } from "../hooks/mutations/useDeleteUser";
import { uploadImage } from "../apis/img";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState(lpImg);

  const createLpMutation = useCreateLp();
  const deleteMutation = useDeleteUser();

  const toggleSidebar = () => setCollapsed(!collapsed);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  const handleSubmit = async () => {
    if (!title || !content || !thumbnail) {
      alert("모든 값을 입력하세요.");
      return;
    }

    try {
      const imageUrl = await uploadImage(thumbnail);

      const payload = {
        title,
        content,
        thumbnail: imageUrl,
        tags: ["a", "b", "c"],
        published: true,
      };

      createLpMutation.mutate(payload, {
        onSuccess: () => {
          alert("LP가 생성되었습니다!");
          closeModal();
        },
        onError: () => {
          alert("LP 생성 중 오류가 발생했습니다.");
        },
      });
    } catch {
      alert("이미지 업로드 실패!");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setThumbnail(file);
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  return (
    <div className="flex relative min-h-screen">
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } h-screen bg-white dark:bg-[#15161A] shadow-md flex flex-col transition-all duration-300 fixed left-0 top-0 z-20`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
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

        <nav className="flex-grow mt-4 overflow-y-auto">
          <NavLink
            to="/"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">LP 목록</span>}
          </NavLink>

          <NavLink
            to="/popular"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">인기 영화</span>}
          </NavLink>

          <NavLink
            to="/upcoming"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">개봉 예정</span>}
          </NavLink>

          <NavLink
            to="/top-rated"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">평점 높은</span>}
          </NavLink>

          <NavLink
            to="/now-playing"
            className="flex items-center px-4 py-2 m-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-[#1E2028]"
          >
            {!collapsed && <span className="ml-2">상영 중</span>}
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={openDeleteModal}
            className="w-full text-left text-red-500 px-2 py-2 hover:bg-red-50 rounded-lg"
          >
            {!collapsed && "회원 탈퇴"}
          </button>
        </div>
      </div>

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

      <button
        onClick={openModal}
        className="cursor-pointer fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white text-3xl shadow-xl flex items-center justify-center z-50"
      >
        +
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm relative h-[450px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="flex flex-col gap-3">
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

      {isDeleteOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              onClick={closeDeleteModal}
            >
              ×
            </button>

            <h2 className="flex justify-center text-2xl font-semibold mb-4">
              회원 탈퇴
            </h2>
            <p className="flex items-center justify-center text-gray-700 text-lg mb-6">
              정말 탈퇴하시겠습니까?
            </p>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-300 text-black py-2 rounded"
                onClick={closeDeleteModal}
              >
                취소
              </button>

              <button
                className="flex-1 bg-black text-white py-2 rounded"
                onClick={() => {
                  deleteMutation.mutate();
                  closeDeleteModal();
                }}
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
