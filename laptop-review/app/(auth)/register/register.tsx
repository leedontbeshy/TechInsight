import { AuthCard } from "@/components/auth/AuthCard"
import { RegisterForm } from "@/components/auth/RegisterForm"

export default function RegisterPage() {
  return (
    <AuthCard title="Tạo tài khoản mới" description="Nhập thông tin của bạn để tạo tài khoản">
      <RegisterForm />
    </AuthCard>
  )
}
