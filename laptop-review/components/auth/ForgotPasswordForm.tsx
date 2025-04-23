"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ForgotPasswordForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Giả lập gửi email
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <>
      {submitted ? (
        <div className="space-y-4">
          <Alert className="border-green-500 bg-green-50 text-green-800">
            <AlertTitle>Email đã được gửi!</AlertTitle>
            <AlertDescription>
              Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến {email}. Vui lòng kiểm tra hộp thư của bạn.
            </AlertDescription>
          </Alert>
          <Button variant="outline" className="w-full" onClick={() => router.push("/auth/login")}>
            Quay lại đăng nhập
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi hướng dẫn đặt lại"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push("/auth/login")}
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại đăng nhập
          </Button>
        </form>
      )}
    </>
  )
}
