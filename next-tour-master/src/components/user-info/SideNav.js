"use client";

import { useSelector } from "react-redux";

import NavItem from "./NavItem";

export default function SideNav({ activeItem, changeActiveItem }) {
  const user = useSelector((state) => state.users);

  return (
    <nav className="user-view__menu">
      {user.name && (
        <>
          <ul className="side-nav">
            <NavItem
              text="Settings"
              icon="settings"
              active={activeItem === "setting" ? true : false}
              onClick={() => changeActiveItem("setting")}
            />
            <NavItem
              text="My bookings"
              icon="briefcase"
              active={activeItem === "booking" ? true : false}
              onClick={() => changeActiveItem("booking")}
            />
            <NavItem
              text="My Reviews"
              icon="star"
              active={activeItem === "review" ? true : false}
              onClick={() => changeActiveItem("review")}
            />
            <NavItem
              text="Billing"
              icon="credit-card"
              active={activeItem === "billing" ? true : false}
              onClick={() => changeActiveItem("billing")}
            />
          </ul>
          {user.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem
                  text="Manage tours"
                  icon="map"
                  active={activeItem === "manage-tours" ? true : false}
                  onClick={() => changeActiveItem("manage-tours")}
                />
                <NavItem
                  text="Manage users"
                  icon="users"
                  active={activeItem === "manage-users" ? true : false}
                  onClick={() => changeActiveItem("manage-users")}
                />
                <NavItem
                  text="Manage reviews"
                  icon="star"
                  active={activeItem === "manage-reviews" ? true : false}
                  onClick={() => changeActiveItem("manage-reviews")}
                />
                <NavItem
                  text="Manage bookings"
                  icon="briefcase"
                  active={activeItem === "manage-bookings" ? true : false}
                  onClick={() => changeActiveItem("manage-bookings")}
                />
              </ul>
            </div>
          )}
        </>
      )}
    </nav>
  );
}
