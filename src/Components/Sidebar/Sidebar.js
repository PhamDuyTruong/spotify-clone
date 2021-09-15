import React from 'react';
 import "./Sidebar.css";
import SidebarOption from "./SidebarOption.js";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateValue } from "../../StateProvider";

export default function Sidebar() {
    const [{ playlists }, dispatch] = useStateValue();
    console.log(playlists);
    return (
        <div className="sidebar">
             <img
             className="sidebar__logo"
             src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
             alt="Sidebar-image"
            />
              <SidebarOption Icon={HomeIcon} option="Home" />
              <SidebarOption Icon={SearchIcon} option="Search" />
             <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
             <br />
                <strong className="sidebar__title">PLAYLISTS</strong>
                {playlists?.items?.map((playlist) => (
                   <SidebarOption option={playlist.name} />
                ))}
             <hr />
        </div>
    )
}
