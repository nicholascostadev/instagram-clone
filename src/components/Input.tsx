import {
  DetailedHTMLProps,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { FieldError } from 'react-hook-form'

// Copy paste from react input type below
interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  error?: FieldError
  helperText?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error, helperText, ...rest },
  ref,
) => {
  console.log(rest.className)
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full flex-1">
        <input
          name={name}
          ref={ref}
          {...rest}
          className={`${rest.className} w-full rounded-sm border px-2 py-1 text-sm`}
        />
        {helperText && <p className="text-xs text-gray-400">{helperText}</p>}
        {error && <p className="font-bold text-red-500">{error.message}</p>}
      </div>
    </div>
  )
}

export const Input = forwardRef(InputBase)
