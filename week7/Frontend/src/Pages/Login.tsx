import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../Components/forms/AuthInput';
import SubmitButton from '../Components/buttons/SubmitButton';
import GoogleLoginButton from '../Components/buttons/GoogleLoginButton';
import useInputValidation from '../Hooks/useInputValidation';
import type { LoginPayload } from '../types/user';
import { login } from '../apis/auth/login';

// 로그인 입력 필드 이름 (email, password만 허용)
type LoginField = 'email' | 'password';

// 각 입력 필드의 유효성 상태 저장
//Partial : 모든 속성을 선택적(optional)으로 만듦
type InvalidMap = Partial<Record<LoginField, boolean>>; 

const Login = () => {
    const navigate = useNavigate();

    // 입력값 상태
    const [formData, setFormData] = useState<Record<LoginField, string>>({ 
        email: '', 
        password: '' 
    });
    // 각 입력 필드의 유효성 검사 결과 저장(유효하지 않은 필드만 true로 기록)
    const [invalid, setInvalid] = useState<InvalidMap>({}); 

    // 버튼 비활성화 조건
    const isDisabled = Object.keys(invalid).length > 0 || !formData.email || !formData.password;
    
    // 타입 가드: name이 LoginField 타입인지 확인
    const isLoginField = (n: string): n is LoginField =>
        n === 'email' || n ==='password';

    // 실시간 유효성 검사
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // name이 email이나 password가 아니면 무시
        if(!isLoginField(name)) return; 

        // 입력값 상태 업데이트
        setFormData(prev => ({ ...prev, [name]: value }));

        // 커스텀 유효성 검사 실행
        const isValid = useInputValidation({ value, name }); 

        // 유효성 검사 결과에 따라 invalid 상태 업데이트
        setInvalid(prev => {
            if(isValid) {
                const { [name]: _, ...rest } = prev; 
                return rest; // 유효하면 해당 필드 제거
            }
            else {
                return { ...prev, [name]: true }; // 유효하지 않으면 추가
            }
        });
    }

    // FormData를 LoginPayload 형태로 변환
    const toLoginPayload = (formData: FormData): LoginPayload => {
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');
        return { email, password };
    }

    // 폼 제출 핸들러
    // 1. 브라우저 기본 유효성 검사
    // 2. 커스텀 훅 유효성 검사
    // 3. 모두 통과 시 API 요청
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // 1. 브라우저 기본 검사
        if(!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 2. 커스텀 훅 검사
        const formData = new FormData(form); // 폼 데이터 수집
        const fields: LoginField[] = ['email', 'password'];
        const nextInvalid: InvalidMap = {};

        for (const key of fields) {
            const value = String(formData.get(key) ?? '');
            const isValid = useInputValidation({ value, name: key }); // 커스텀 훅 사용
            if (!isValid) nextInvalid[key] = true; // 유효하지 않으면 invalid 객체에 기록
        }

        setInvalid(nextInvalid);
        if (Object.keys(nextInvalid).length > 0) return; // 하나라도 invalid면 중단

        // 3. 모두 통과 시 api 요청 넣기
        const payload = toLoginPayload(formData);
        
        login(payload)
            .then(() => navigate('/'))
    }

    return(
        <>
        <section className="mt-6">
            {/* Header */}
            <div className='mb-6 flex items-center justify-center relative'>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute left-0 grid place-items-center rounded-full p-2 hover:bg-gray-200 text-gray-600"
                >
                    <span className="material-icons">뒤로가기</span>
                </button>
                <h2 className='text-lg font-semibold'>로그인</h2>
            </div>

            {/* Google Login */}
            <GoogleLoginButton />

            {/* Divider */}
            <div className="my-5 flex items-center gap-2">
                <span className="h-px flex-1 bg-white/25"/>
                <span className="text-xs text-white/70">OR</span>
                <span className="h-px flex-1 bg-white/25"/>
            </div>

            {/* Login Form */}
            <form name="login-form" onSubmit={handleFormSubmit} noValidate>
                <div className="space-y-4">
                    <AuthInput
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="이메일을 입력해주세요!"
                        errorMessage="올바른 이메일 형식을 입력해주세요."
                        invalid={!!invalid.email}
                        onChange={handleInputChange}
                    />
                    
                    <AuthInput
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="비밀번호를 입력해주세요!"
                        errorMessage="비밀번호는 6자 이상이어야 합니다."
                        invalid={!!invalid.password}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-5">
                    <SubmitButton value="로그인" disabled={isDisabled}/>
                </div>
            </form>
        </section>
        </>
    )
}

export default Login;