import React, { Component } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoEllipsisHorizontal, IoCopy } from "react-icons/io5";
class PlayListOptionMenu extends Component {
  container = React.createRef();
  state = {
    open: false,
  };

  handleclick = (data, e) => {
    if (e != null) {
      if (e.currentTarget.parentElement.parentElement !== null) {
        let box = e.currentTarget.parentElement.parentElement;
        if (window.innerHeight - box.getBoundingClientRect().bottom <= 200) {
          this.setState({
            top: false,
          });
        } else {
          this.setState({
            top: true,
          });
        }
      }
    }

    this.setState({
      open: data,
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.handleclick(false, null);
    } else {
    }
  };
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  };
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClickOutside);
  };

  render() {
    return (
      <div className={`boxmrjrjerjrjnue top }`} ref={this.container}>
        <div className="title-of--thise-action">
          <button
            onClick={(e) => {
              this.handleclick(true, e);
            }}
            className="close-that"
          >
            <IoEllipsisHorizontal />
          </button>
        </div>
        <div
          className={`tisjjrjrjr ${this.state.open === true ? "active" : ""}`}
        >
          <div className="box-that-hold-the-setting">
            <div className="wrapper-flex">
              <div className="button-div">
                <div className="hold-thatiocom">
                  <BsFillPlusCircleFill />
                </div>
                <button
                  onClick={() => {
                    this.props.handleopen(true);
                  }}
                  className="edit-the-program"
                >
                  Create Playlist
                </button>
              </div>
              <div className="button-div">
                <div className="hold-thatiocom">
                  <MdDelete />
                </div>
                <button
                  onClick={() => {
                    this.props.handleopen(true);
                  }}
                  className="edit-the-program"
                >
                  Delete Playlist
                </button>
              </div>
              <div className="button-div">
                <div className="hold-thatiocom">
                  <IoCopy />
                </div>
                <button
                  onClick={() => {
                    this.props.handleopen(true);
                  }}
                  className="edit-the-program"
                >
                  Copy Playlist
                </button>
              </div>
              <div className="button-div">
                <div className="hold-thatiocom">
                  <MdEdit />
                </div>
                <button
                  onClick={() => {
                    this.props.handleopen(true);
                  }}
                  className="edit-the-program"
                >
                  Edit Playlist
                </button>
              </div>
            </div>
          </div>

          {/*  <div  className="box-that-hold-the-setting">
                    <div className="hold-thatiocom">
           <BsPeopleFill/>
                    </div>
                    <button onClick={this.props.handleGroupOpen} className="edit-the-program">New Group</button>
                    </div>*/}
        </div>
      </div>
    );
  }
}

export default PlayListOptionMenu;
