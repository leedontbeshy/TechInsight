import { AuthCard } from "@/components/auth/AuthCard"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Quên mật khẩu" description="Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu">
      <ForgotPasswordForm />
    </AuthCard>
  )
}
