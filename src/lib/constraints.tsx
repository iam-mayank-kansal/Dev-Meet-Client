export const LoginFormData = [
  {
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "your@email.com",
    required: true
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "••••••••",
    required: true
  }
];

export const SignupFormData = [
  {
    label: "Full Name",
    type: "text",
    name: "name",
    placeholder: "John Doe",
    required: true
  },
  {
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "your@email.com",
    required: true
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "••••••••",
    required: true,
    minLength: 6
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    placeholder: "••••••••",
    required: true,
    minLength: 6
  }
];