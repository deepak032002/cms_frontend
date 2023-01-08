import React, { useEffect, useId } from "react";
import "./style.scss";

const Input = ({
  onChange,
  placeholder,
  type,
  className,
  label,
  heading,
  style,
  field,
  name,
  selectoptions,
  value,
  onBlur,
  error,
  id,
  accept,
  autoFocus,
  onFocus,
  disabled,
  required,
  defaultValue
}) => {
  const elemId = useId();
  useEffect(() => {
    let input;
    let fileLabel;
    if (id && type === "file") {
      fileLabel = document.querySelector(`[for="${id}"]`);
      input = document.getElementById(id);

      input.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          fileLabel.innerHTML = e.target.files[0].name;
          fileLabel.classList.remove("text-transparent");
          fileLabel.classList.add("text-[#525252]");
        } else {
          fileLabel.innerHTML = "File";
          fileLabel.classList.add("text-transparent");
          fileLabel.classList.remove("text-[#525252]");
        }
      });
    }
  }, [id, type]);

  if (type === "select") {
    return (
      <div className={className}>
        <select
          name={name}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={`w-full p-[10px] rounded-[5px] text-[1.2rem] bg-transparent border border-[#525252] outline-none`}
        >
          <option value="">{label}</option>
          {selectoptions.map((item, id) => {
            return (
              <option key={new Date().getTime() + id + elemId} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <span className="text-red-600">
          {error ? <div>{error}</div> : ""}
        </span>
      </div>
    );
  }

  if (type === "radio" || type === "checkbox") {
    return (
      <>
        <span className="block textg-[#525252] text-lg font-semibold">
          {heading}
        </span>
        <div className="flex gap-3">
          {field.map((item, ind) => {
            return (
              <div
                key={new Date().getTime() + ind + elemId}
                className="flex gap-1 text-[#525252]"
              >
                <input
                  type={type}
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  id={id}
                />
                <label htmlFor={id}>{item?.value}</label>
              </div>
            );
          })}
          <span className="text-red-600">
            {error && error ? <div>{error}</div> : null}
          </span>
        </div>
      </>
    );
  }

  if (type === "file") {
    return (
      <>
        <div className={className}>
          <div className={`inputBox`}>
            <label htmlFor={id} className="text-transparent">
              File
            </label>
            <input
              // required
              id={id}
              style={style || { "--color--": "#525252" }}
              type={type}
              name={name}
              accept={accept}
              value={value}
              hidden
              onChange={onChange}
              onBlur={onBlur}
            />
            <span style={style || { "--color--": "#525252" }}>{label}</span>
          </div>
          <span className="text-red-600">
            {error && error ? <div>{error}</div> : null}
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={className}>
        <div className={`inputBox`}>
          <input
            placeholder={type === "date" ? "" : " "}
            // required={required}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            onFocus={onFocus}
            style={style || { "--color--": "#525252" }}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            id={id}
          />
          <span style={style || { "--color--": "#525252" }}>{label}</span>
        </div>
        <span className="text-red-600">
          {error && error ? <div>{error}</div> : null}
        </span>
      </div>
    </>
  );
};

export default Input;