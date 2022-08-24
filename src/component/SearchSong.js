import { AiOutlineSearch } from "react-icons/ai";

function SearchSong() {
  return (
    <div className="wrappper-find">
      <div className="seatch-compoent">
        <div className="icon-song-find">
          <AiOutlineSearch />
        </div>
        <input type="text" placeholder="Search a song...." />
      </div>
    </div>
  );
}
export default SearchSong;
