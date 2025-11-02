type useInputValidationTypeProps = {
    value: string;
    name: string;
}

// 입력값과 타입에 따라 유효성 검사 결과를 반환하는 커스텀 훅
const useInputValidation = ({ value, name }: useInputValidationTypeProps): boolean => {
    switch (name) {
        case 'email':
            return /\S+@\S+\.\S+/.test(value);
        case 'password':
            return value.length >= 6;
        default:
            return false;
    }
}

export default useInputValidation;