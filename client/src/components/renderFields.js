import React from "react";
let renderInput = ({
  input,
  type,
  label,
  style,
  extraCssClass,
  meta: { error, warning, touched },
}) => {
  if (Array.isArray(error) && error.length > 1) {
    error = error.reduce((result, item) => (
      <>
        {result}
        <br></br>
        {item}
      </>
    ));
  }
  return (
    <div className={`form-group ${extraCssClass}`}>
      {input.name !== "name" ? <label>{label}</label> : ""}
      <input
        placeholder={label}
        {...input}
        style={style}
        type={type}
        className="form-control"
      />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span className="text-warning">{warning}</span>))}
    </div>
  );
};

let renderRadioInput = ({
  input,
  options,
  label,
  value,
  meta: { error, touched },
}) => {
  return (
    <div className="form-group">
      <label htmlFor="label">{label}</label>

      {Object.keys(options).map((key) => {
        return (
          <div className="form-check" key={key}>
            <input
              {...input}
              checked={input.value === key ? true : false}
              className="form-check-input"
              type="radio"
              id={key}
              value={key}
            />
            <label className="form-check-label" htmlFor={key}>
              {options[key].label}
            </label>
          </div>
        );
      })}
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  );
};

let renderSelect = ({ input, label, children, meta: { error, touched } }) => {
  return (
    <div className="form-group">
      <label htmlFor="label">{label}</label>
      <select className="form-control" {...input}>
        {children}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  );
};

let renderTextArea = ({
  input,
  label,
  rows,
  cols,
  style,
  meta: { error, warning, touched },
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        {...input}
        style={style}
        rows={rows}
        cols={cols}
        className="form-control"
        placeholder="What's happening"
      />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span className="text-warning">{warning}</span>))}
    </div>
  );
};

export default { renderInput, renderRadioInput, renderSelect, renderTextArea };
