import { AuthCard } from "@/components/auth/AuthCard"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <AuthCard title="Đăng nhập vào TechReview" description="Nhập thông tin đăng nhập của bạn để tiếp tục">
      <LoginForm />
    </AuthCard>
  )
}
