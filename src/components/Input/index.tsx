import "./style.scss"

interface InputProps {
  label: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  defaultValue: string
}

const Input = ({ label, placeholder, onChange, name, defaultValue }: InputProps) => {
  return (
    <div className="input">
      <label htmlFor="">{label}</label>
      <input type="text" placeholder={placeholder} onChange={onChange} name={name} defaultValue={defaultValue} />
    </div>
  )
}

export default Input
