import React from "react";
import PropTypes from "prop-types";
import { getPeoplePage } from "./Server";
import { withRouter } from "react-router-dom";
import styles from "./App.module.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
function getSearchTermFromQueryString(queryString) {
  const usp = new URLSearchParams(queryString);
  return usp.get("q") || "";
}
class PeopleProfile extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
  state = {
    search: "",
    search: getSearchTermFromQueryString(this.props.location.search),
    pageIndex: 0
  };
  componentDidMount() {
    this.loadPage();
  }

  loadPage() {
    this.setState({ pagedItemResponse: null });
    const { pageIndex, search } = this.state;
    getPeoplePage(pageIndex, 10, search).then(pagedItemResponse => {
      this.setState({ pagedItemResponse });
    });
  }

  prevPage = () => {
    this.setState(prev => ({ pageIndex: prev.pageIndex - 1 }), this.loadPage);
  };

  nextPage = () => {
    this.setState(prev => ({ pageIndex: prev.pageIndex + 1 }), this.loadPage);
  };
  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearchSubmit = e => {
    e.preventDefault();

    const searchName = new URLSearchParams(this.props.location.search);
    searchName.set("q", this.state.search);
    const newPath = this.props.location.pathname + "?" + searchName.toString();
    this.props.history.replace(newPath);
    this.loadPage();
  };
  handlePersonClick = personId => {
    this.props.history.push("/people/" + personId);
  };
  render() {
    const { pagedItemResponse, pageIndex, search } = this.state;
    const disabled = !pagedItemResponse;
    return (
      <div>
        <form className={styles.search} onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            autoFocus
            spellCheck={false}
            value={search}
            onChange={this.handleSearchChange}
          />
          <button>Search</button>
        </form>
        <div className={styles.middle}>
          <Button
            color="success"
            className={styles.buttonnormal}
            disabled={disabled}
            onClick={this.prevPage}
          >
            Prev
          </Button>
          <div className={styles.box}>{pageIndex + 1}</div>
          <Button
            color="success"
            className={styles.buttonnormal}
            disabled={disabled}
            onClick={this.nextPage}
          >
            Next
          </Button>
        </div>
        <div className={styles.list}>
          {pagedItemResponse ? (
            <>
              {pagedItemResponse.pagedItems.map(person => (
                <div
                  key={person.id}
                  onClick={() => this.handlePersonClick(person.id)}
                >
                  <Card>
                    <CardImg
                      left
                      width="100%"
                      src={person.primaryImage.imageUrl}
                      alt="person image"
                    />
                    <CardBody>
                      <CardTitle>Title: {person.title}</CardTitle>
                      <CardText>
                        <div>Bio: {person.bio}</div>
                        <div>Summary: {person.summary}</div>
                        <div>Headline: {person.headline}</div>
                        <div>Slug: {person.slug}</div>
                        <div>
                          Skills:{" "}
                          {person.skills.map(data => (
                            <div key={data.id}>-{data.name}</div>
                          ))}
                        </div>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(PeopleProfile);
