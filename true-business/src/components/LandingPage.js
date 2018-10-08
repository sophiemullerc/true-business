import React, { Component } from "react";
import Modal from "react-modal";
import BusinessThumbnail from "./BusinessThumbnail";
import StarRatings from "react-star-ratings";

import "../css/LandingPage.css";
import "../css/GeneralStyles.css";

import NavBar from "./NavBar";

let modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "90vh",
    width: "60vw",
    zIndex: "5",
    backgroundColor: "rgb(255,255,255)",
    color: "rgb(5,56,107)",
    overflow: "hidden",
  },
};

Modal.setAppElement("div");

class LandingPage extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalInfo: null,
      liked: false,
      unliked: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  openModal(event, info) {
    this.setState({ modalIsOpen: true, modalInfo: info });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, liked: false });
  }

  updateLike = () => {
    this.setState({ liked: true });
  };

  updateUnlike = () => {
    this.setState({ unliked: true });
  };

  render() {
    return (
      <div>
        <NavBar search={this.props.search} />
        <div className="landing">
          <div className="landing__container">
            <div className="container__header">Popular Reviews</div>
            <div id="containerOne" className="container__items">
              {this.props.reviews.map((review, i) => {
                if (i < 4) {
                  return (
                    // Need to write a component that shows all the reviews by a certain user
                    // Whenever they click on the username in this section or in the bottom section
                    // <div key={review._id} onClick={() => this.props.userReviews(user)}>
                    <div key={review._id} className="items__item" onClick={() => this.openModal(this, review)}>
                      <img
                        alt={review.newMongoId.name}
                        src={review.photos[0].link}
                        className={
                          review.photos[0].width > review.photos[0].height ? "item__landscape" : "item__portrait"
                        }
                      />
                      <div className="item__description">
                        <div className="item__title">{review.newMongoId.name}</div>
                        <StarRatings
                          starDimension="20px"
                          starSpacing="5px"
                          rating={review.stars}
                          starRatedColor="gold"
                          starEmptyColor="grey"
                          numberOfStars={5}
                          name="rating"
                        />
                        <div className="item__info--hover">
                          <i style={{ paddingRight: ".5rem" }} className="fas fa-user" /> {review.reviewer.username}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="landing__container">
            <div className="container__header">Popular Businesses</div>
            <div id="containerTwo" className="container__items">
              {this.props.businesses.map((business, i) => {
                if (i < 4) {
                  return (
                    <BusinessThumbnail getBusiness={this.props.getBusiness} business={business} key={business._id} />
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="landing__container">
            <div className="container__header">Popular Reviewers</div>
            <div id="containerThree" className="container__items">
              {this.props.users.map((user, i) => {
                if (i < 4) {
                  return (
                    // Need to write a component that shows all the reviews by a certain user
                    // Whenever they click on the username in this section or in the bottom section
                    // <div key={review._id} onClick={() => this.props.userReviews(user)}>
                    <div key={user._id} className="items__item">
                      <img
                        alt={user.username}
                        src={user.userImages[0].link}
                        className={
                          user.userImages[0].width > user.userImages[0].height ? "item__landscape" : "item__portrait"
                        }
                        // onClick={() => this.openModal(this, user)}
                      />
                      <div className="item__description">
                        <div className="item__info--hover">
                          <i style={{ paddingRight: ".5rem" }} className="fas fa-user" />
                          {user.username}
                        </div>
                        <div className="item__info">{user.numberOfReviews} Reviews</div>
                        <div className="item__info">{user.numberOfLikes} Likes</div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <Modal
              shouldCloseOnOverlayClick={false}
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={modalStyles}
              contentLabel="Review Modal">
              {this.state.modalIsOpen ? (
                <div className="modal">
                  <div className="modal__header">
                    <div className="header__image">
                      {/* Update reviews / user with likes */}
                      <div className="image__buttons">
                        {!this.state.unliked ? (
                          <button className="image__button" onClick={this.updateLike}>
                            {this.state.liked ? (
                              <div>
                                <i style={{ marginRight: ".5rem" }} className="fas fa-thumbs-up" />
                                <i className="fas fa-check" />
                              </div>
                            ) : (
                              <i className="fas fa-thumbs-up" />
                            )}
                          </button>
                        ) : null}
                        {!this.state.liked ? (
                          <button className="image__button" onClick={this.updateUnlike}>
                            {this.state.unliked ? (
                              <div>
                                <i style={{ marginRight: ".5rem" }} className="fas fa-thumbs-down" />
                                <i className="fas fa-check" />
                              </div>
                            ) : (
                              <i className="fas fa-thumbs-down" />
                            )}
                          </button>
                        ) : null}
                      </div>
                      <img
                        alt={this.state.modalInfo.newMongoId.name}
                        className="image__landscape"
                        src={this.state.modalInfo.photos[0].link}
                      />
                      <div className="image__buttons">
                        <button className="image__button" onClick={this.closeModal}>
                          <i className="far fa-window-close" />
                        </button>
                      </div>
                    </div>
                    
                  </div>
                  <div className="modal__body">
                    <div className="body__stars">
                      <div className="body__business"> {this.state.modalInfo.newMongoId.name}</div>
                      <StarRatings
                        starDimension="20px"
                        starSpacing="5px"
                        rating={this.state.modalInfo.stars}
                        starRatedColor="gold"
                        starEmptyColor="grey"
                        numberOfStars={5}
                        name="rating"
                      />
                      <div>{this.state.modalInfo.createdOn.replace(/[^\d{4}-\d{2}-\d{2}].*/, "")}</div>
                      <div>
                        <i style={{ paddingRight: ".5rem" }} className="fas fa-user" />
                        {this.state.modalInfo.reviewer.username}
                      </div>
                    </div>
                    <div className="body__title">
                      {this.state.modalInfo.title ? this.state.modalInfo.title : "***Untitled***"}
                    </div>
                    <div className="body__review">
                      {this.state.modalInfo.body ? this.state.modalInfo.body : "***No Body***"}
                    </div>
                  </div>
                </div>
              ) : null}
            </Modal>
        </div>
      </div>
    );
  }
}

export default LandingPage;
