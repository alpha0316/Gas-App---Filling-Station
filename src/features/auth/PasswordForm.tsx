import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signInErrorMessage, usePasswordSignIn } from './useSignIn'
import { Field, FormError, SubmitButton } from './formParts'

const schema = z.object({
  identifier: z.string().trim().min(1, 'Enter your phone number or email'),
  password: z.string().min(1, 'Enter your password'),
})
type Values = z.infer<typeof schema>

export default function PasswordForm() {
  const { register, handleSubmit, formState } = useForm<Values>({ resolver: zodResolver(schema) })
  const signIn = usePasswordSignIn()

  return (
    <form onSubmit={handleSubmit((v) => signIn.mutate(v))} className="space-y-4" noValidate>
      <Field label="Phone number or email" error={formState.errors.identifier?.message}>
        <input {...register('identifier')} autoComplete="username" className="input" />
      </Field>
      <Field label="Password" error={formState.errors.password?.message}>
        <input {...register('password')} type="password" autoComplete="current-password" className="input" />
      </Field>
      {signIn.error && <FormError message={signInErrorMessage(signIn.error)} />}
      <SubmitButton pending={signIn.isPending}>Sign in</SubmitButton>
    </form>
  )
}
