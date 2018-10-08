import React from "react";
import axios from "axios";
import styles from "./App.module.css";
class PeopleProfile extends React.Component {
  state = {
    list: []
  };
  componentDidMount() {
    axios.get("/api/people/0/10").then(res => {
      this.setState({ list: res.data.item.pagedItems });
    });
  }
  handleEdit = id => {
    axios.put("/api/people/" + id);
  };
  render() {
    const listItems = this.state.list;
    return (
      <div>
        <legend>People Profile</legend>
        {listItems.map(data => (
          <div key={data.id}>
            <form>
              <fieldset>
                <button className={this.handleEdit(data.id)}>Edit</button>
                <div className={styles.profile}>
                  <p>Title: {data.title}</p>
                  <p>Bio: {data.bio}</p>
                  <p>Summary: {data.summary}</p>
                  <p>Headline: {data.headline}</p>
                  <p>Slug: {data.slug}</p>
                  <p>
                    Skills:{" "}
                    {data.skills.map(res => (
                      <div key={res.id}>
                        <div>{res.name}</div>
                      </div>
                    ))}
                  </p>
                </div>
                <img
                  width="100px"
                  heigth="200px"
                  src={data.primaryImage.imageUrl}
                  alt=""
                />
              </fieldset>
            </form>
          </div>
        ))}
      </div>
    );
  }
}
export default PeopleProfile;
