import { useId, cloneElement, type ReactElement, type ReactNode } from 'react'

interface FieldProps {
  label: string
  error?: string
  children: ReactElement<{ id?: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }>
}

export function Field({ label, error, children }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      {cloneElement(children, {
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="text-xs text-danger mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

export function FormError({ message }: { message: string }) {
  return (
    <p role="alert" className="text-sm text-danger bg-danger-tint rounded-button px-3 py-2">
      {message}
    </p>
  )
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 rounded-button bg-accent text-white text-sm font-semibold hover:bg-[#1558b0] transition-colors disabled:opacity-60"
    >
      {children}
    </button>
  )
}
