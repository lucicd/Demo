import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";

export default function TextField({
  name,
  label,
  value,
  onChange,
  submitted,
  maxLength,
  width,
  ...props
}) {
  return (
    <div className="field">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <div style={{ maxWidth: width || "100%" }}>
        <InputText
          id={name}
          value={value}
          onChange={(e) => onChange(e, name)}
          maxLength={maxLength}
          {...props}
          className={classNames({
            "p-invalid": props.required && submitted && !value,
          })}
        />
      </div>
      {props.required && submitted && !value && (
        <small className="p-error">{`${label} is required.`}</small>
      )}
    </div>
  );
}
