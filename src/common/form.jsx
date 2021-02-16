import React, { Component } from "react";

class Form extends Component {
  state = {
    data: {
      name: "",
      phone: "",
      email: "",
      city: "",
    },
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (data.name === "") {
      errors.name = "Обязательное поле";
    }
    if (data.phone === "") {
      errors.phone = "Обязательное поле";
    }
    if (data.email === "") {
      errors.email = "Обязательное поле";
    }
    if (data.city === "") {
      errors.city = "Обязательное поле";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "name") {
      if (value.length <= 2) {
        return "Минимум 3 буквы";
      }
      if (value.length >= 21) {
        return "Максимум 20 буквы";
      }
    }

    if (name === "phone") {
      if (value.length <= 10) {
        return "Минимум 9 буквы";
      }
      if (value.length >= 13) {
        return "Максимум 12 буквы";
      }
    }

    if (name === "email") {
      if (!value.includes("@") || !value.includes("mail")) {
        return "Адрес электронной почты недействителен";
      }
      if (value.length >= 31) {
        return "Максимум 30 букв";
      }
    }

    if (name === "city") {
      if (value.length <= 2) {
        return "Минимум 3 буквы";
      }
      if (value.length >= 16) {
        return "Максимум 15 буквы";
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    if (!this.errors) {
      this.doSubmit();
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button onClick={this.handleSubmit} className="submit-form" type="submit">
        {label}
      </button>
    );
  }

  renderInput(label, id) {
    const { data, errors } = this.state;
    return (
      <div className="form">
        <div className="text-field">
          <input
            name={id}
            value={data[id]}
            id={id}
            type="text"
            autoComplete="off"
            error={errors[id]}
            onChange={this.handleChange}
            required
          />
          <label className="label-name">
            <span className="content-name">{label}</span>
          </label>
        </div>
        {errors[id] && <p>{errors[id]}</p>}
      </div>
    );
  }

  handleCursor = (e) => {
    const rectTop = e.target.getBoundingClientRect().top;
    const click = e.clientY;
    if (click - 30 <= rectTop) {
      this.moveCursorToEnd(e.target);
    }
  };
  moveCursorToEnd(e) {
    if (typeof e.selectionStart == "number") {
      e.selectionStart = e.selectionEnd = e.value.length;
    } else if (typeof e.createTextRange != "undefined") {
      e.focus();
      var range = e.createTextRange();
      range.collapse(false);
      range.select();
    }
  }
}

export default Form;
