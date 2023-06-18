import UserForm from "./UserForm";
import PasswordForm from "./PasswordForm";

export default function UserInfo() {
  return (
    <div className="user-view__content">
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <UserForm />
      </div>
      <div className="line">&nbsp;</div>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <PasswordForm />
      </div>
    </div>
  );
}
