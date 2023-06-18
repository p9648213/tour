async function login(formData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

async function forgotPassword(formData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/users/forgotPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

async function resetPassword(formData, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/users/resetPassword/${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

async function signup(formData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

async function getUserInfo(token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

async function updateUser(formData, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/users/updateMe`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

async function changePassword(formData, token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/users/updatepassword`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

async function getMyBookingTours(token) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/bookings/my-booking-tour`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error) {
    return { status: "fail", message: error.message };
  }
}

module.exports = {
  login,
  getUserInfo,
  updateUser,
  changePassword,
  signup,
  forgotPassword,
  resetPassword,
  getMyBookingTours,
};
