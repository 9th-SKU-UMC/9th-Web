import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import SubmitButton from "../Components/buttons/SubmitButton";
import GoogleLoginButton from "../Components/buttons/GoogleLoginButton";
import { api } from "../axios";
import type { AxiosResponse } from "axios";
import type { SignupPayload, SignupResponse } from "../types/user";
import { AuthInputStyle, AuthErrorMessageStyle } from "../Components/forms/AuthInput.style";
import clsx from "clsx";

// schema 정의
const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
    checkPassword: z.string().min(6, { message: "비밀번호 확인은 6자 이상이어야 합니다." }),
    name: z.string().max(20, { message: "이름은 최대 20자까지 가능합니다." }),
}).refine((data) => data.password === data.checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["checkPassword"],
})

const Signup = () => {
    const navigate = useNavigate();
    const [signupStep, setSignupStep] = useState(1); // 1: 이메일, 2: 비밀번호, 3: 프로필
    const profileSrc = "/src/assets/profile-icon.png";

    type FormValues = z.infer<typeof schema>;

    // react-hook-form
    const { register, handleSubmit, formState: { errors, isValid, touchedFields, isSubmitted }, trigger, watch } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // watch로 입력값 감시
    const email = watch("email");
    const password = watch("password");
    const checkPassword = watch("checkPassword");
    const name = watch("name");

    // 에러 메시지 표시 조건
    const showError = <K extends keyof FormValues>(field: K) : boolean => {
        return !!errors[field] && (touchedFields[field] || isSubmitted);
    }

    // 현재 단계 유효성 검사
    // watch로 감시 중인 값일 바뀔 때마다 렌더링 중 자동으로 평가
    // 사용자가 타이핑하는 도중에, "다음" 버튼 활성화/비활성화 결정하기 위함
    const getCurrentStepValidity = () : boolean => {
        switch(signupStep) {
            case 1:
                return !errors.email && !!email;
            case 2:
                return !errors.password && !errors.checkPassword && !!password && !!checkPassword;
            case 3:
                return !errors.name && !!name;
            default:
                return false;
        }
    }

    const isCurrentStepValid = getCurrentStepValidity();


    // 단계 별 유효성 검증 실행 
    // 사용자가 "다음" 버튼 클릭 시 해당 단계의 필드에 대해 trigger로 유효성 검사 실행
    const goNextStep = async (step: number) => {
        let ok: boolean;
        switch (step) {
            case 1:
                ok = await trigger("email");
                break;
            case 2:
                ok = await trigger(["password", "checkPassword"]);
                break;
            case 3:
                ok = await trigger("name");
                break;
            default:
                return;
        }

        if (ok) setSignupStep(prev => prev + 1);
    }

    // 전체 제출 함수
    const onSubmit = async (data: any) => {
        console.log(data);
        const payload: SignupPayload = {
            email: data.email,
            password: data.password,
            name: data.name,
            bio: null,
            avatar: null,
        };

        api.post<SignupResponse, AxiosResponse<SignupResponse>, SignupPayload>(
                '/auth/signup', payload
            )
                .then((response) => {
                    console.log(response.data);
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Signup error:', error);
                    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
                });
    };

    // 단계 별 렌더링
    const renderStep = () => {
        switch(signupStep) {
            case 1:
                return (
                    <>
                    <input
                        id="email"
                        type="email"
                        placeholder="이메일을 입력해주세요!"
                        {...register("email")}
                        className={clsx(
                            AuthInputStyle,
                            showError("email") ? "border-red-500" : "border-white/30"
                        )}
                    />
                    {showError("email") && <p className={AuthErrorMessageStyle}>{errors.email?.message}</p>}
                    <SubmitButton type="button" value="다음" disabled={!isCurrentStepValid} onClick={() => goNextStep(1)} />
                    </>
                )
            case 2:
                return (
                    <>
                    <input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요!"
                        {...register("password")}
                        className={clsx(
                            AuthInputStyle,
                            showError("password") ? "border-red-500" : "border-white/30"
                        )}
                    />
                    {showError("password") && <p className={AuthErrorMessageStyle}>{errors.password?.message}</p>}
                    <input
                        id="checkPassword"
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요!"
                        {...register("checkPassword")}
                        className={clsx(
                            AuthInputStyle,
                            showError("checkPassword") ? "border-red-500" : "border-white/30"
                        )}
                    />
                    {showError("checkPassword") && <p className={AuthErrorMessageStyle}>{errors.checkPassword?.message}</p>}
                    <SubmitButton type="button" value="다음" disabled={!isCurrentStepValid} onClick={() => goNextStep(2)} />
                    </>
                )
            case 3:
                return (
                    <>
                        <img src={profileSrc} alt="프로필"></img>
                        <input
                            id="name"
                            type="text"
                            placeholder="이름을 입력해주세요!"
                            {...register("name")}
                            className={clsx(
                                AuthInputStyle,
                                showError("name") ? "border-red-500" : "border-white/30"
                            )}
                        />
                        {showError("name") && <p className={AuthErrorMessageStyle}>{errors.name?.message}</p>}
                        <SubmitButton value="제출" disabled={!isValid} />
                    </>
                )
            default:
                return null;
        }
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
                <h2 className='text-lg font-semibold'>회원가입</h2>
            </div>

            {/* Google Login */}
            <GoogleLoginButton />

            {/* Divider */}
            <div className="my-5 flex items-center gap-2">
                <span className="h-px flex-1 bg-white/25"/>
                <span className="text-xs text-white/70">OR</span>
                <span className="h-px flex-1 bg-white/25"/>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {renderStep()}
            </form>
        </section>
        </>
    )
}

export default Signup;