import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";

export default function DropdownField({
  name,
  label,
  value,
  onChange,
  submitted,
  options,
  optionLabel,
  optionValue,
  width,
  ...props
}) {
  return (
    <div className="field">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <div style={{ maxWidth: width || "100%" }}>
        <Dropdown
          id={name}
          value={value}
          options={options}
          onChange={(e) => onChange({ target: { value: e.value } }, name)}
          optionLabel={optionLabel}
          optionValue={optionValue}
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
