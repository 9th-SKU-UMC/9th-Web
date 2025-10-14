import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schema/loginSchema";
import api from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await api.post("http://localhost:8000/v1/auth/signin", data);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-6 border border-gray-400 rounded-2xl shadow-lg flex flex-col"
      >
        <div className="relative mb-6 h-6 flex items-center justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 text-blue-600 cursor-pointer"
          >
            &lt;
          </button>
          <h1 className="text-xl font-semibold text-center text-blue-600 mx-auto">
            로그인
          </h1>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-400 py-2 rounded mb-4 cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>구글 로그인</span>
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-400" />
        </div>

        <input
          {...register("email")}
          type="email"
          placeholder="이메일 입력"
          className={`w-full mb-3 px-3 py-2 border rounded placeholder-gray-400 ${
            errors.email ? "border-red-600" : "border-gray-400"
          }`}
        />
        {errors.email && (
          <p className="text-red-600 mb-3 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="비밀번호 입력"
          className={`w-full mb-5 px-3 py-2 border rounded placeholder-gray-400 ${
            errors.password ? "border-red-600" : "border-gray-600"
          }`}
        />
        {errors.password && (
          <p className="text-red-600 mb-5 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 rounded text-white ${
            isValid
              ? "bg-blue-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
