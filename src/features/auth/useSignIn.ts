import { useMutation } from '@tanstack/react-query'
import { passwordLogin, requestOtp, verifyOtp } from './api'
import { errorMessage } from '../../lib/api/client'
import { NotStationError, useAuthStore } from './store'

export const signInErrorMessage = (error: unknown) =>
  error instanceof NotStationError ? error.message : errorMessage(error)

export function usePasswordSignIn() {
  const signIn = useAuthStore((s) => s.signIn)
  return useMutation({
    mutationFn: passwordLogin,
    onSuccess: signIn,
  })
}

export const useRequestOtp = () => useMutation({ mutationFn: (v: { channel: 'sms' | 'email'; target: string }) => requestOtp(v.channel, v.target) })

export function useVerifyOtp() {
  const signIn = useAuthStore((s) => s.signIn)
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: signIn,
  })
}
