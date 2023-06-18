"use client";

export default function ResetPasswordForm({
  formValues,
  handleInputChange,
  handleSubmit,
  loading,
}) {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Reset Password</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              New Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              New Password Confirm
            </label>
            <input
              id="passwordConfirm"
              className="form__input"
              type="password"
              value={formValues.passwordConfirm}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn--blue" disabled={loading}>
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
