"use client";

export default function SignupForm({
  formValues,
  handleSubmit,
  handleInputChange,
  loading,
}) {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              autoComplete="new-password"
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="Ex: John"
              required
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              autoComplete="new-password"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Ex: you@example.com"
              required
            />
          </div>

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              minLength="8"
            />
          </div>

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              className="form__input"
              type="password"
              value={formValues.passwordConfirm}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              minLength="8"
            />
          </div>

          <div className="form__group">
            <button type="submit" className="btn btn--blue" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
