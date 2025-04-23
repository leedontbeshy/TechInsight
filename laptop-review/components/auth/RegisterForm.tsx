"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { SocialLoginButtons } from "@/components/auth/SocialLoginButton"

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Giả lập đăng ký
    setTimeout(() => {
      setLoading(false)
      router.push("/auth/login")
    }, 1500)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">Họ</Label>
            <Input id="first-name" placeholder="Nguyễn" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Tên</Label>
            <Input id="last-name" placeholder="Văn A" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input id="phone" type="tel" placeholder="0912345678" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <PasswordInput id="password" required />
          <p className="text-xs text-muted-foreground mt-1">
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm font-normal">
            Tôi đồng ý với{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Chính sách bảo mật
            </Link>
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Hoặc đăng ký với</span>
        </div>
      </div>

      <SocialLoginButtons />

      <div className="text-center text-sm">
        Đã có tài khoản?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Đăng nhập
        </Link>
      </div>
    </>
  )
}
