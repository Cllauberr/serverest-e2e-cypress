class RegisterPageElements {
  static elements = {
    nameInput: 'input[name="nome"], input[placeholder*="nome"]',
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    adminCheckbox: 'input[type="checkbox"]',
    registerButton: 'button[type="submit"]',
    loginLink: 'a:contains("Login"), a[href*="login"]',
    errorMessage: '.alert-danger, .error-message, [role="alert"]',
    successMessage: '.alert-success, .success-message'
  }
}

export default RegisterPageElements
