import { Component } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import profilePicture from "../assets/undraw_relaunch_day_902d.svg";
// import { deleteUser } from "../helpers/dataActions";
import { errorSnackBar } from "./snackbars";
import { auth } from "../config/firebase";
import { signOut } from "@firebase/auth";
export default class SideBar extends Component {
  state = {
    quote: [],
  };

  componentDidMount() {
    this.setState({ quote: "🔭 Loading... " });
    axios
      .get("https://dummyjson.com/quotes/random")
      .then((res) => this.setState({ quote: res.data.quote }))
      .catch((err) => {
        this.setState({ quote: "🔭 Seems like there is a problem" });
        errorSnackBar(err.message);
      });
  }

  render() {
    return (
      <div className="h-screen sm:mb-10 sm:h-[300px] flex flex-col justify-center text-center bg-slate-100 shadow-md shadow-slate-300 w-[300px] sm:w-screen px-5">
        <div className="flex flex-col justify-center place-items-center mb-16 sm:mb-0">
          <div className="w-[170px] sm:hidden">
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

          <div className="shadow-sm shadow-[#cccccccc] bg-white border-x-4 border-black rounded p-2 mb-5 mt-3">
            <Typography variant="p">“{this.state.quote}„</Typography>
          </div>

          <div className="flex flex-row gap-3 justify-center">
            <Button
              href="/"
              onClick={() => {
                // deleteUser(this.props.userEmail);
              }}
              className="btn-primary-small"
              variant="contained"
            >
              Delete Account
            </Button>

            <Button
              href="/"
              onClick={async () => {
                sessionStorage.removeItem("loggedIn");
                window.location.reload(true);
                try {
                  await signOut(auth);
                } catch (err) {
                  errorSnackBar(err.message);
                }
              }}
              className="btn-primary-small"
              variant="contained"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
