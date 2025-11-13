import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { postSignup } from "../apis/auth";
import { validateSignup } from "../utils/validate";
import { useState } from "react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { values, errors, getInputProps } = useForm({
    initialValue: { name: "", email: "", password: "", confirmPassword: "" },
    validate: validateSignup,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const hasError = Object.values(errors).some((err) => err);
    const empty = Object.values(values).some((v) => v === "");

    if (hasError || empty) return;

    try {
      setLoading(true);
      const res = await postSignup({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (res.status) {
        alert("회원가입 성공");
        navigate("/login");
      } else {
        alert(res.message || "회원가입 실패");
      }
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 flex flex-col gap-3 border rounded-2xl shadow"
    >
      <h1 className="text-xl font-bold text-center mb-2">회원가입</h1>

      {/* 이름 */}
      <input
        {...getInputProps("name")}
        placeholder="이름"
        className="border p-2 rounded"
      />
      {submitAttempted && errors.name && (
        <p className="text-red-500 text-sm">{errors.name}</p>
      )}

      {/* 이메일 */}
      <input
        {...getInputProps("email")}
        placeholder="이메일"
        className="border p-2 rounded"
      />
      {submitAttempted && errors.email && (
        <p className="text-red-500 text-sm">{errors.email}</p>
      )}

      {/* 비밀번호 */}
      <input
        {...getInputProps("password")}
        type="password"
        placeholder="비밀번호"
        className="border p-2 rounded"
      />
      {submitAttempted && errors.password && (
        <p className="text-red-500 text-sm">{errors.password}</p>
      )}

      {/* 비밀번호 확인 */}
      <input
        {...getInputProps("confirmPassword")}
        type="password"
        placeholder="비밀번호 확인"
        className="border p-2 rounded"
      />
      {submitAttempted && errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
}
