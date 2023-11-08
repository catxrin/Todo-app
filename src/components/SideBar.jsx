import { Component } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import profilePicture from "../assets/undraw_relaunch_day_902d.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { errorSnackBar } from "./snackbars";
import { auth, db } from "../config/firebase";
import { signOut, deleteUser } from "@firebase/auth";
import { PROBLEM_OCCURED, LOADING } from "../constants/messages";
export default class SideBar extends Component {
  state = {
    quote: [],
  };

  componentDidMount() {
    this.setState({ quote: LOADING });
    axios
      .get("https://dummyjson.com/quotes/random")
      .then((res) => this.setState({ quote: res.data.quote }))
      .catch((err) => {
        this.setState({ quote: PROBLEM_OCCURED });
        errorSnackBar(err.message);
      });
  }

  render() {
    return (
      <div className="h-screen sm:mb-10 sm:h-72 flex flex-col justify-center text-center bg-slate-100 shadow-md shadow-slate-300 w-[20vw] sm:w-screen px-5">
        <div className="flex flex-col justify-center place-items-center mb-16 sm:mb-0">
          <div className="w-[90%] sm:hidden">
            <img
              className="object-contain border-2 border-black rounded-full"
              src={profilePicture}
            />
          </div>
          <Typography
            style={{ fontFamily: "Gabarito", padding: 0 }}
            variant="h5"
            type="text"
          >
            Welcome, {this.props.username}
          </Typography>

          <div className="shadow-sm shadow-[#cccccccc] bg-white border-x-4 border-black rounded p-2 mb-4 mt-3">
            <Typography variant="p">“{this.state.quote}„</Typography>
          </div>

          <div className="flex flex-row gap-3 justify-center">
            <button
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "users", auth.currentUser.uid));
                  await deleteUser(auth.currentUser);
                  localStorage.removeItem("loggedIn");
                  window.location.pathname = "/";
                } catch (err) {
                  errorSnackBar(err.message);
                }
              }}
              className="btn-primary-small"
            >
              Delete Account
            </button>

            <button
              onClick={async () => {
                try {
                  await signOut(auth);
                  localStorage.removeItem("loggedIn");
                  window.location.pathname = "/";
                } catch (err) {
                  errorSnackBar(err.message);
                }
              }}
              className="btn-primary-small"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
