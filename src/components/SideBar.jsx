import { Component } from "react";
import { Typography } from "@mui/material";
import profilePicture from "../assets/undraw_relaunch_day_902d.svg";
import { getQuoteData } from "../server/server";
import { LOADING } from "../constants/messages";
import { deleteCurrentUser, signOutUser } from "../helpers/dataActions";
export default class SideBar extends Component {
  state = {
    quote: [],
  };

  componentDidMount() {
    this.setState({ quote: LOADING });
    const takeData = async () => {
      this.setState({ quote: await getQuoteData() });
    };
    takeData();
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
          <Typography className="label" variant="h5">
            Welcome, {this.props.username}
          </Typography>

          <div className="shadow-sm shadow-[#cccccccc] bg-white border-x-4 border-black rounded p-2 mb-4 mt-3">
            <Typography variant="p">“{this.state.quote}„</Typography>
          </div>

          <div className="flex flex-row gap-3 justify-center">
            <button
              onClick={() => deleteCurrentUser()}
              className="btn-primary-small"
            >
              Delete Account
            </button>

            <button onClick={() => signOutUser()} className="btn-primary-small">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
