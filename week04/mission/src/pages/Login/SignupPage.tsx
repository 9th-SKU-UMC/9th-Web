import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";

const SignupPage = () => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage<string>("authToken", "");

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pw: string) => pw.length >= 6;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) setEmailError("");
    else if (!validateEmail(value))
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    else setEmailError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) setPasswordError("");
    else if (!validatePassword(value))
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
    else setPasswordError("");

    if (confirmPassword && value !== confirmPassword)
      setConfirmError("비밀번호가 일치하지 않습니다.");
    else setConfirmError("");
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value) setConfirmError("");
    else if (value !== password)
      setConfirmError("비밀번호가 일치하지 않습니다.");
    else setConfirmError("");
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid =
    validatePassword(password) && confirmPassword === password;
  const isNicknameValid = nickname.trim().length > 0;

  const handleNextStep = () => {
    if (step === 1 && isEmailValid) setStep(2);
    else if (step === 2 && isPasswordValid) setStep(3);
  };

  const handleSignup = async () => {
    try {
      const res = await api.post("http://localhost:8000/v1/auth/signup", {
        email,
        password,
        name: nickname,
        bio: null,
        avatar: null,
      });

      const tokenFromServer = res.data.token;
      if (tokenFromServer) setToken(tokenFromServer);

      console.log("회원가입 성공: ", res.data);
      alert("회원가입에 성공하였습니다.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패: ", err);
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-6 border border-gray-400 rounded-2xl shadow-lg flex flex-col">
        <div className="relative mb-6 h-6 flex items-center justify-center">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="absolute left-0 text-xl text-green-600 cursor-pointer"
            >
              &lt;
            </button>
          )}
          <h1 className="text-xl font-semibold text-green-600">
            {step === 1 && "이메일 입력"}
            {step === 2 && "비밀번호 설정"}
            {step === 3 && "닉네임 설정"}
          </h1>
        </div>

        {step === 1 && (
          <>
            <button className="w-full flex items-center justify-center gap-2 border py-2 rounded mb-4 cursor-pointer">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Google로 회원가입</span>
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="px-2 text-gray-400 text-sm">OR</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full mb-3 px-3 py-2 border rounded bg-transparent ${
                emailError ? "border-red-500" : "border-gray-400"
              } placeholder-gray-400`}
              placeholder="이메일 입력"
            />
            {emailError && (
              <p className="text-red-500 text-sm mb-4">{emailError}</p>
            )}

            <button
              onClick={handleNextStep}
              disabled={!isEmailValid}
              className={`w-full py-2 rounded text-white transition ${
                isEmailValid
                  ? "bg-green-400 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="flex text-sm mb-4 justify-center">✉️ {email}</p>

            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border rounded bg-transparent ${
                  passwordError ? "border-red-500" : "border-gray-400"
                } placeholder-gray-400`}
                placeholder="비밀번호 입력"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mb-2">{passwordError}</p>
            )}

            <div className="relative mb-3">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmChange}
                className={`w-full px-3 py-2 border rounded bg-transparent ${
                  confirmError ? "border-red-500" : "border-gray-400"
                } placeholder-gray-400`}
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmError && (
              <p className="text-red-500 text-sm mb-4">{confirmError}</p>
            )}

            <button
              onClick={handleNextStep}
              disabled={!isPasswordValid}
              className={`w-full py-2 rounded text-white transition ${
                isPasswordValid
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="flex text-sm mb-4 justify-center">✉️ {email}</p>

            <div className="w-20 h-20 mx-auto mb-4 bg-gray-400 rounded-full flex items-center justify-center text-white">
              이미지
            </div>

            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-full mb-4 px-3 py-2 border border-gray-600 rounded bg-transparent placeholder-gray-400"
              placeholder="닉네임 입력"
            />

            <button
              onClick={handleSignup}
              disabled={!isNicknameValid}
              className={`w-full py-2 rounded text-white transition ${
                isNicknameValid
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
