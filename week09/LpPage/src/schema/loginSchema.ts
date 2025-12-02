import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("유효하지 않은 이메일입니다."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
