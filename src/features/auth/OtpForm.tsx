import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { OtpChannel } from '../../lib/api/types'
import { signInErrorMessage, useRequestOtp, useVerifyOtp } from './useSignIn'
import { Field, FormError, SubmitButton } from './formParts'

const targetSchema = z.object({
  channel: z.enum(['sms', 'email']),
  target: z.string().trim().min(1, 'Enter your phone number or email'),
})
type TargetValues = z.infer<typeof targetSchema>

const codeSchema = z.object({ code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code') })
type CodeValues = z.infer<typeof codeSchema>

export default function OtpForm() {
  const [sent, setSent] = useState<{ channel: OtpChannel; target: string } | null>(null)
  const requestOtp = useRequestOtp()
  const verifyOtp = useVerifyOtp()
  const targetForm = useForm<TargetValues>({
    resolver: zodResolver(targetSchema),
    defaultValues: { channel: 'sms' },
  })
  const codeForm = useForm<CodeValues>({ resolver: zodResolver(codeSchema) })

  if (sent) {
    return (
      <form
        onSubmit={codeForm.handleSubmit((v) => verifyOtp.mutate({ ...sent, code: v.code }))}
        className="space-y-4"
        noValidate
      >
        <Field label={`Code sent to ${sent.target}`} error={codeForm.formState.errors.code?.message}>
          <input
            {...codeForm.register('code')}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            className="input"
          />
        </Field>
        {verifyOtp.error && <FormError message={signInErrorMessage(verifyOtp.error)} />}
        <SubmitButton pending={verifyOtp.isPending}>Verify</SubmitButton>
        <button type="button" onClick={() => setSent(null)} className="w-full text-sm text-muted hover:text-ink">
          Use a different number or email
        </button>
      </form>
    )
  }

  return (
    <form
      onSubmit={targetForm.handleSubmit((v) =>
        requestOtp.mutate(v, { onSuccess: () => setSent({ channel: v.channel, target: v.target }) }),
      )}
      className="space-y-4"
      noValidate
    >
      <Field label="Send the code by">
        <select {...targetForm.register('channel')} className="input">
          <option value="sms">SMS</option>
          <option value="email">Email</option>
        </select>
      </Field>
      <Field label="Phone number or email" error={targetForm.formState.errors.target?.message}>
        <input {...targetForm.register('target')} autoComplete="username" className="input" />
      </Field>
      {requestOtp.error && <FormError message={signInErrorMessage(requestOtp.error)} />}
      <SubmitButton pending={requestOtp.isPending}>Send code</SubmitButton>
    </form>
  )
}
