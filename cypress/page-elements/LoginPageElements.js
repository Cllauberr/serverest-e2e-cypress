class LoginPageElements {
  static elements = {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    loginButton: 'button[type="submit"]',
    registerLink: 'a[href="/cadastrarusuarios"]',
    registerButton: 'button:contains("Cadastre-se"), a:contains("Cadastre-se")',
    errorMessage: '.alert-danger, .error-message, [role="alert"]',
    successMessage: '.alert-success, .success-message'
  }
}

export default LoginPageElements
