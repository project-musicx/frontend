import Track from "./track";

function PlaylistTable({ tracks }) {
  return (
    <div className="wrapper-playlist">
      <section className="table-playlist">
        <div className="header-table">#</div>
        <div className="header-table">Title</div>
        <div className="header-table">Album</div>
        <div className="header-table">Date Added</div>
        <div className="header-table">TIME</div>
      </section>
      <main className="table-track">
        {tracks?.map((item, index) => {
          return <Track track={item} index={index} key={item.id} />;
        })}
      </main>
    </div>
  );
}

export default PlaylistTable;
