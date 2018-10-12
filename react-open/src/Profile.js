import React from "react";
import PropTypes from "prop-types";
import styles from "./App.module.css";
import { getPersonById, updatePerson, createPerson } from "./Server";
import { getErrorText } from "./Error";
import FileUpload from "./FileUpload";
import { Button, InputGroupAddon, Input, InputGroup } from "reactstrap";
class Profile extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };
  state = {
    person: {
      id: null,
      title: "",
      bio: "",
      summary: "",
      headline: "",
      slug: "",
      statusId: 0,
      skills: "",
      primaryImage:
        "https://sabio-boocamp-api.s3-us-west-2.amazonaws.com/133f8928-0830-4e8c-a4cf-0c945709874c_Hello_Kitty-logo-CD765E4F74-seeklogo.com.png"
    }
  };

  componentDidMount() {
    const { personId } = this.props.match.params;
    if (personId) {
      this.setState({ person: null });
      getPersonById(personId).then(person =>
        this.setState({
          person: {
            ...person,
            skills: person.skills.map(skill => skill.name).join(", "),
            primaryImage: person.primaryImage.imageUrl
          }
        })
      );
    }
  }
  updatePersonInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prev => ({
      person: {
        ...prev.person,
        [name]: value
      }
    }));
  };
  handleSaveClicked = () => {
    const { person } = this.state;
    const payload = {
      ...person,
      skills: person.skills.split(/\s*,\s*/)
    };
    let promise;
    if (person.id) {
      promise = updatePerson(payload);
    } else {
      promise = createPerson(payload).then(id =>
        this.props.history.push("/people" + id)
      );
    }
    promise.catch(err => alert(getErrorText(err)));
  };
  render() {
    const { person } = this.state;
    if (!person) return <div>Loading...</div>;
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Title:</InputGroupAddon>
          <Input
            type="text"
            name="title"
            value={person.title}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Bio:</InputGroupAddon>
          <Input
            type="text"
            name="bio"
            value={person.bio}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Summary:</InputGroupAddon>
          <Input
            type="text"
            name="summary"
            value={person.summary}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Headline:</InputGroupAddon>
          <Input
            type="text"
            name="headline"
            value={person.headline}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Slug:</InputGroupAddon>
          <Input
            type="text"
            name="slug"
            value={person.slug}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Status ID:</InputGroupAddon>
          <Input
            type="text"
            name="statusId"
            value={person.statusId}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Skills:</InputGroupAddon>
          <Input
            type="text"
            name="skills"
            value={person.skills}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">Picture:</InputGroupAddon>
          <Input
            type="text"
            name="primaryImage"
            value={person.primaryImage}
            onChange={this.updatePersonInput}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            Upload new primary image:
          </InputGroupAddon>
          <FileUpload onUpload={this.handleUpload} />
          <div>{this.state.url}</div>
        </InputGroup>
        <Button
          color="success"
          className={styles.buttonnormal}
          onClick={this.handleSaveClicked}
        >
          Submit
        </Button>
      </div>
    );
  }
}
export default function(props) {
  return (
    <Profile {...props} key={props.match && props.match.params.personId} />
  );
}
