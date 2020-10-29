import React from "react";
import "./Body.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src="https://newjams-images.scdn.co/v2/discover-weekly/p-BoW1yo01L2kINSn5_rz8gLGP5sfNlp6xEfgNiWNztYnHQy7m0pqVUz9Js3QPyhheZIiqRMgTpcYvXSZcFER16ROrr-vEnmu_E7hcBmyQJ3Xume0cqQ2Go1J0wAyXkWDGB7DMf9IjHFpv62y3k5Aeb-O-JzM4VQLk2ZXTEUmb7kRwu2DgJY_GvuCPyE12C7Wc4xIF3oWuFjzDK6njDFEaI7susIU5jBp73_IBL93P__BGLZsbKuvS2QIeCLya3LYFIQw7EgLEABdA791DbH-2JAfCDMncYNAjZt-plBWvrC5VR50D4FP0QxPOXHXczy7-qXDby78PDRoEH_sF7g3z4r86VCHf5aX-lDbrIIo-c=/NjU6NTQ6OTFUMjAtNjAtMA==/default" alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
