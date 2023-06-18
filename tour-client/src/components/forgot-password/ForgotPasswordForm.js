"use client";

export default function ForgotPasswordForm({
  formValues,
  handleInputChange,
  handleSubmit,
  loading,
}) {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Forgot Password</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Your login email"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn--blue" disabled={loading}>
              {loading ? "Loading..." : "Send Email"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
