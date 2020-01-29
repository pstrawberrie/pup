/**
 * Schedule Page
 */
import React from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Hero from '../../common/Hero/Hero';
import Modal from '../../common/Modal/Modal';
import './Schedule.scss';

export default class Schedule extends React.Component {
  // State
  state = {
    schedule: [],
    form_datetime: '',
    form_note: '',
    form_timezone: '',
  }

  // Did Mount
  async componentDidMount() {
    this.props.showLoader(true);
    this.setState({form_timezone: moment.tz.guess()});

    // Get Schedule from API
    try {
      const request = await axios.get('/api/schedule');
      console.log('GOT SCHEDULE!', request.data);//REMOVE
      this.setState({schedule: request.data});
      this.props.showLoader(false);
    } catch(err) {
      console.log(`Error from componentDidMount Schedule API Call: ${err}`);
      this.props.showLoader(false);
    }
  }

  // Handle Form Submit
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(e);
  }

  // Handle Input Change
  handleInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({ [name]: value }, () => console.log(this.state));
  }

  // Render
  render() {
    // Map Items Helper
    const renderItems = this.state.schedule.map(item =>
      <div className="schedule__item" key={item.id}>
        <span className="schedule__item_datetime">
          {/* @TODO: use moment tz */}
          <time dateTime={item.datetime}>{item.datetime}</time>
        </span>
        <span className="schedule__item_note">
          {item.note}
        </span>
      </div>
    );

    // Final Render
    return(
      <section className="schedule">
        <Hero headline="Pup Schedule"
              copy="Track the schedule of the pup, yo!"
              bg={{color: '#18403f'}}>
          {/* Form Modal Section */}
          <Modal triggerClass="cta schedule__hero_modal"
                 triggerText="New Event"
                 title="Create New Event">
            <form className="schedule__form" onSubmit={this.handleSubmit}>
              <label>
                <span className="schedule__form_label">DateTime*</span>
                <input className="schedule__form_datetime"
                      name="form_datetime"
                      type="datetime-local"
                      onChange={this.handleInputChange}></input>
              </label>

              <label>
                <span className="schedule__form_label">Note</span>
                <textarea className="schedule__form_note"
                          name="form_note"
                          onChange={this.handleInputChange}></textarea>
              </label>
            </form>
          </Modal>
        </Hero>
        <div className="schedule__items container">
          {renderItems}
        </div>
      </section>
    );
  }
}
