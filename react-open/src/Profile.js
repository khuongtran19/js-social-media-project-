import React from "react";
import axios from "axios";
import styles from "./App.module.css";
class Profile extends React.Component {
  state = {
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    skills: "",
    primaryImage: "",
    title_isValid: false,
    bio_isValid: false,
    summary_isValid: false,
    headline_isValid: false,
    slug_isValid: false,
    statusid_isValid: false,
    skills_isValid: false
  };

  fileRef = React.createRef();

  handleTitleChange = e => {
    const title = e.target.value;
    let title_isValid = false;
    if (title.length >= 2 && title.length <= 100) {
      title_isValid = true;
    }
    this.setState({
      title,
      title_isValid
    });
  };
  handleBioChange = e => {
    const bio = e.target.value;
    let bio_isValid = false;
    if (bio.length >= 2 && bio.length <= 100) {
      bio_isValid = true;
    }
    this.setState({
      bio,
      bio_isValid
    });
  };
  handleSummaryChange = e => {
    const summary = e.target.value;
    let summary_isValid = false;
    if (summary.length >= 2 && summary.length <= 100) {
      summary_isValid = true;
    }
    this.setState({
      summary,
      summary_isValid
    });
  };
  handleHeadlineChange = e => {
    const headline = e.target.value;
    let headline_isValid = false;
    if (headline.length >= 2 && headline.length <= 100) {
      headline_isValid = true;
    }
    this.setState({
      headline,
      headline_isValid
    });
  };
  handleSlugChange = e => {
    const slug = e.target.value;
    let slug_isValid = false;
    if (slug.length >= 2 && slug.length <= 100) {
      slug_isValid = true;
    }
    this.setState({
      slug,
      slug_isValid
    });
  };
  handleSkillsChange = e => {
    const skills = e.target.value;
    let skills_isValid = false;
    if (skills.length >= 2 && skills.length <= 100) {
      skills_isValid = true;
    }
    this.setState({
      skills,
      skills_isValid
    });
  };
  handleStatusIdChange = e => {
    const statusId = e.target.value;
    let statusId_isValid = false;
    if (statusId.length >= 2 && statusId.length <= 100) {
      statusId_isValid = true;
    }
    this.setState({
      statusId,
      statusId_isValid
    });
  };
  handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", this.fileRef.current.files[0]);
    axios.post("/api/files", formData).then(res => {
      axios.post("/api/people", {
        title: this.state.title,
        bio: this.state.bio,
        summary: this.state.summary,
        headline: this.state.headline,
        slug: this.state.slug,
        skills: this.state.skills.split(/\s*,\s*/),
        primaryImage: res.data.items[0].url
      });
    });
  };
  render() {
    return (
      <div>
        <form>
          <fieldset>
            <legend>Create Profile</legend>
            <div>Title:</div>
            <div>
              <input
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>
            <div>Bio:</div>
            <div>
              <input
                type="text"
                value={this.state.bio}
                onChange={this.handleBioChange}
              />
            </div>
            <div>Summary:</div>
            <div>
              <input
                type="text"
                value={this.state.summary}
                onChange={this.handleSummaryChange}
              />
            </div>
            <div>Headline:</div>
            <div>
              <input
                type="text"
                value={this.state.headline}
                onChange={this.handleHeadlineChange}
              />
            </div>
            <div>Slug:</div>
            <div>
              <input
                type="text"
                value={this.state.slug}
                onChange={this.handleSlugChange}
              />
            </div>
            <div>StatusId:</div>
            <div>
              <input
                type="text"
                value={this.state.statusId}
                onChange={this.handleStatusIdChange}
              />
            </div>
            <div>Skills:</div>

            <div>
              <input
                type="text"
                value={this.state.skills}
                onChange={this.handleSkillsChange}
              />
            </div>
            <div>Picture:</div>
            <input type="file" ref={this.fileRef} />
            <div>{this.state.url}</div>
            <button
              className={styles.buttonnormal}
              disabled={
                (!this.state.title,
                !this.state.bio,
                !this.state.summary,
                !this.state.headline,
                !this.state.slug,
                !this.state.statusId,
                !this.state.skills)
              }
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default Profile;
