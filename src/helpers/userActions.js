import { errorSnackBar, successSnackBar } from "../components/snackbars";
import { SUCCESS_LOGIN, SUCCESS_REGISTER } from "../constants/messages";

export const logIn = (loginCredentials) => {
  fetch("http://localhost:3030/auth/login", {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-Type": "application/json",
      jwt: localStorage.getItem("jwt"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (typeof data !== "object") {
        errorSnackBar(data);
      } else {
        window.location.pathname = "/home";
        localStorage.setItem("jwt", data.jwt);
        sessionStorage.setItem("username", data.username);
        successSnackBar(SUCCESS_LOGIN);
      }
    });
};

export const registerUser = (loginCredentials) => {
  fetch("http://localhost:3030/auth/register", {
    method: "POST",
    body: JSON.stringify(loginCredentials),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (typeof data !== "object") {
        errorSnackBar(data);
      } else {
        localStorage.setItem("jwt", data.jwt);
        sessionStorage.setItem("username", data.username);
        successSnackBar(SUCCESS_REGISTER);
      }
    });
};

export const getData = (setUserData) => {
  fetch("http://localhost:3030/card/all", {
    headers: {
      jwt: localStorage.getItem("jwt"),
    },
  })
    .then((res) => res.json())
    .then((data) => setUserData(data));
};

export const postNote = (note, setUserData) => {
  fetch("http://localhost:3030/card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      jwt: localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      text: note,
    }),
  }).then(async (res) => {
    if (res.ok) {
      setUserData((prev) => [...prev, { text: note, status: "Todo" }]);
    } else {
      errorSnackBar(await res.json());
    }
  });
};

export const getTasks = () => {
  fetch("http://localhost:3030/card/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      jwt: localStorage.getItem("jwt"),
    },
  }).then((res) => res.json());
};

export const deleteTask = async (cardId, setUserData) => {
  fetch(`http://localhost:3030/card/${await cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      jwt: localStorage.getItem("jwt"),
    },
  }).then(async (res) => {
    if (res.ok) {
      setUserData(await res.json());
    } else {
      errorSnackBar(await res.json());
    }
  });
};

export const updateTask = async (cardId, status, setUserData) => {
  fetch(`http://localhost:3030/card/${await cardId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      jwt: localStorage.getItem("jwt"),
    },
    body: JSON.stringify({
      status: status,
    }),
  }).then(async (res) => {
    if (res.ok) {
      setUserData(await res.json());
    } else {
      errorSnackBar(await res.json());
    }
  });
};
