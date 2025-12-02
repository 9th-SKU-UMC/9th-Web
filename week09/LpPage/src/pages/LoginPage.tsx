import useForm from "../hooks/useForm";
import { validateSignin } from "../utils/validate";
import googleIcon from "../assets/googleIcon.svg";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { values, errors, getInputProps } = useForm({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("로그인에 실패했습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const hasError = Object.values(errors || {}).some(
      (error) => error.length > 0
    );
    const empty = Object.values(values).some((v) => v === "");

    if (hasError || empty) return;

    loginMutation.mutate(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_BASE_URL + "/v1/auth/google/login";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 flex flex-col gap-3 border rounded-2xl shadow"
    >
      <h1 className="text-xl font-bold text-center mb-2">로그인</h1>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded mb-4 cursor-pointer"
      >
        <img src={googleIcon} alt="Google" className="w-5 h-5" />
        <span>구글 로그인</span>
      </button>

      <div className="flex items-center my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <input
        {...getInputProps("email")}
        placeholder="이메일"
        className="border p-2 rounded"
      />
      {submitAttempted && errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )}

      <input
        {...getInputProps("password")}
        type="password"
        placeholder="비밀번호"
        className="border p-2 rounded"
      />
      {submitAttempted && errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {loginMutation.isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
