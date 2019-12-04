/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5de29c53c758666a7170a2ef
*
* You will get 10% discount for each one of your friends
* 
*/
// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// Custom Actions


// START IMPORT ACTIONS
import ContactActions from "../redux/actions/ContactActions";

// END IMPORT ACTIONS

/** APIs

* actionsContact.create
*	@description CRUD ACTION create
*
* actionsContact.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*
* actionsUser.list
*	@description CRUD ACTION list
*
* actionsContact.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*

**/

class ContactEdit extends Component {
  // Init contact
  constructor(props) {
    super(props);
    this.state = {
      contact: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsContact.loadContact(this.props.match.params.id);
    }
    
    this.props.actionsUser.loadUserList();
  }

  // Insert props contact in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      contact: props.contact
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.contact._id) {
      this.props.actionsContact.saveContact(this.state.contact).then(data => {
        this.props.history.push("/contacts/");
      });
    } else {
      this.props.actionsContact.createContact(this.state.contact).then(data => {
        this.props.history.push("/contacts/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>Contact Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          
          <TextField
            id="Name"
            label="Name"
            value={this.state.contact.Name || ""}
            onChange={Utils.handleChange.bind(this, "contact")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.contact.Name && this.state.contact.Name === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="mobile"
            label="Mobile"
            value={this.state.contact.mobile || ""}
            onChange={Utils.handleChange.bind(this, "contact")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="phone"
            label="Phone"
            value={this.state.contact.phone || ""}
            onChange={Utils.handleChange.bind(this, "contact")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="relation"
            label="Relation"
            value={this.state.contact.relation || ""}
            onChange={Utils.handleChange.bind(this, "contact")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="voice"
            label="Voice"
            value={this.state.contact.voice || ""}
            onChange={Utils.handleChange.bind(this, "contact")}
            margin="normal"
            fullWidth
          />
          
          {/* RELATIONS */}

          <h2 className="mb-20">Relations</h2>
          
          {/* Relation 1:m ID with User */}
          
          <FormControl fullWidth className="mb-20">
            <InputLabel shrink htmlFor="ID">
              ID
            </InputLabel>
            <Select
              value={this.state.contact.ID || ""}
              onChange={Utils.handleChangeSelect.bind(this, "contact")}
              inputProps={{
                id: "ID",
                name: "ID"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.listUser && this.props.listUser.map(row => (
                <MenuItem value={row._id} key={row._id}>
                  {row._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          
          {/* Footer */}
          <div className="footer-card">
            <Link to="/contacts/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsContact: bindActionCreators(ContactActions, dispatch),
  };
};

// Validate types
ContactEdit.propTypes = { 
  actionsContact: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    contact: state.ContactEditReducer.contact,
    listUser: state.ContactEditReducer.listUser
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactEdit);