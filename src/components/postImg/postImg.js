import React from "react";
import Increment from "../ScoreBoard/increment.js";
import { createStore } from "redux";
import counter from "../../reducers/index.js";

const store = createStore(counter);

class PostImg extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      comment: ""
    };
    this.onSubmit = this.handleSubmit.bind(this);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch("http://localhost:3333/api/live/images", {
      method: "POST",
      body: {
        link: self.refs.link,
        comment: self.refs.comment
      }
    })
      // .then(function(response) {
      //   return response.json();
      // })
      .then(function(body) {
        console.log(body);
      });
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          className="rounded mx-auto d-block mw-100 mh-100"
          src={imagePreviewUrl}
        />
      );
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    return (
      // const Messages = props => {

      <div
        className="modal fade bd-example-modal-lgOne"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content customPopup">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                {$imagePreview}

                <label for="exampleInputFile">File input</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleInputFile"
                  aria-describedby="fileHelp"
                  ref="img"
                  onChange={e => this._handleImageChange}
                />
                <small id="fileHelp" className="form-text text-muted">
                  Upload your favorite image, leave a comment then press submit
                </small>
              </div>
              <div className="form-group">
                <label for="exampleTextarea">Comment</label>
                <textarea
                  className="form-control"
                  id="exampleTextarea"
                  rows="3"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <h1 className="text-center">Update Game</h1>
                <Increment
                  ref="score"
                  value={store.getState()}
                  onIncrement={() => store.dispatch({ type: "INCREMENT" })}
                  onDecrement={() => store.dispatch({ type: "DECREMENT" })}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-lg btn-block"
                onSubmit={this.handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostImg;
