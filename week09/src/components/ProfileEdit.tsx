import { useState } from "react";
import { useUpdateMyInfo } from "../hooks/mutations/useUpdateMyInfo";
import { uploadImage } from "../apis/img";
import defaultProfile from "../assets/default-profile.jpg";

export default function ProfileEdit({ close }: { close: () => void }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(defaultProfile);

  const updateMutation = useUpdateMyInfo();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setImage(file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("이름을 입력하세요.");
      return;
    }

    (async () => {
      try {
        let avatarUrl: string | undefined = undefined;

        if (image) {
          avatarUrl = await uploadImage(image);
        }

        updateMutation.mutate(
          {
            name: name,
            bio: bio.trim() !== "" ? bio : undefined,
            avatar: avatarUrl ?? undefined,
          },
          {
            onSuccess: () => {
              alert("프로필이 수정되었습니다.");
              close();
            },
          }
        );
      } catch (e) {
        console.error(e);
        alert("이미지 업로드에 실패했습니다.");
      }
    })();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={close}
        >
          ×
        </button>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center mt-6">
            <div className="relative w-[140px] h-[140px]">
              <img
                src={preview}
                className="w-full h-full object-cover rounded-full"
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
            placeholder="Name"
            className="border mt-6 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Bio"
            className="border p-2 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            className="bg-black text-white py-2 rounded cursor-pointer mt-2"
            onClick={handleSubmit}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
