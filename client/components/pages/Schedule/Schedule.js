/**
 * Schedule Page
 */
import React from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Hero from '../../common/Hero/Hero';
import Modal from '../../common/Modal/Modal';
import './Schedule.scss';

export default class Schedule extends React.Component {
  // State
  state = {
    schedule: [],
    eventModalOpen: false,
    timezone: null,
  }

  // Get Schedule from API
  getSchedule = () => new Promise((resolve, reject) => {
    this.props.showLoader(true);
    axios.get('/api/schedule').then((response) => {
      const { data } = response;

      //debug
      console.log('getSchedule()', data);

      this.setState({schedule: data}, () => resolve());
    })
    .catch(err => reject(err))
    .finally(() => this.props.showLoader(false))
  });

  // Did Mount
  async componentDidMount() {
    // set user's timezone
    this.setState({timezone: moment.tz.guess()});

    // get initial Schedule from API
    try {
      await this.getSchedule();
    } catch(err) {
      console.log(`Error from componentDidMount Schedule API Call: ${err}`);
    }
  }

  // Close Modal
  toggleEventModal = () => this.setState({eventModalOpen: !this.state.eventModalOpen});

  // Create New Event (form submit)
  createNewEvent = (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
    this.props.showLoader(true);

    // Set up new Event Object for DB storage
    const eventTimestamp = new Date(values.datetime).getTime();
    const trimmedNote = values.note.trim();
    const newEvent = {
      timezone: this.state.timezone,
      datetime: eventTimestamp,
      note: trimmedNote,
    };

    //debug
    console.log('Formik submit values:');
    console.log(values);

    // Error Func
    function showError(message) {
      if(!message) message = 'Error submitting event, try again';

      //debug
      console.log('createNewEvent API POST error:');
      console.log(message);

      setErrors({submit: message});
      setStatus({success: false});
      setSubmitting(false);
    }

    // POST Request
    axios.post('/api/schedule', newEvent)
    .then((response) => {
      const { status } = response;

      if(status === 200) {
        // Success
        resetForm({});
        setStatus({success: true});

        this.getSchedule()
        .catch(err => console.log('Error updating schedule from API in createNewEvent:', err))
        .finally(() => this.toggleEventModal());
      } else {
        // Error
        showError('Error creating new event: non-200 Received')
      }
    })
    .catch((err) => {
      // Error
      showError(err);
    })
    .finally(() => this.props.showLoader(false));
  }

  // Render
  render() {
    // Map Items Helper
    const datesByWeek = Object.keys(this.state.schedule);
    const sortedDatesByWeek = datesByWeek.sort((a,b) => moment(a).format('YYYYMMDD') - moment(b).format('YYYYMMDD'));

    const renderItems = sortedDatesByWeek.map((day, index) => {
      // Week Columns
      const formattedDay = moment(new Date(day)).utc().format('MMM D');
      const unsortedDayArr = this.state.schedule[day];
      const sortedDayArr = unsortedDayArr.sort((a,b) => moment(a.datetime).format('YYYYMMDD') - moment(b.datetime).format('YYYYMMDD')).reverse();

      return(
        <div className="schedule__column" key={index}>
          <span className="schedule__column_title">{formattedDay}</span>

          {sortedDayArr.map(event => {
            const formattedTime = moment(event.datetime).format('h:mm');
            const formattedA = moment(event.datetime).format('A');
            const formattedDatetime = moment(event.datetime).format();
            return(
              <div className="schedule__event" key={event.id}>
                <span className="schedule__event_datetime">
                  <time dateTime={formattedDatetime}>{formattedTime}<span>{formattedA}</span></time>
                </span>
                <span className="schedule__event_note">
                  {event.note}
                </span>
              </div>
            )
          })}
        </div>
      );
    });

    // Final Render
    return(
      <section className="schedule">
        <Hero headline="Pup Schedule"
              copy="Track the schedule of the pup, yo!"
              bg={{color: '#18403f'}}>

          {/* Modal + Form */}
          <Modal triggerClass="cta schedule__hero_modal"
                 triggerText="New Event"
                 title="Create New Event"
                 modalOpen={this.state.eventModalOpen}
                 toggleModal={this.toggleEventModal}
                 noPadding={true}>
            <Formik
              initialValues={{
                datetime: '',
                note: '',
              }}
              onSubmit={(values, {setSubmitting, setErrors, setStatus, resetForm}) => {
                this.createNewEvent(values, {setSubmitting, setErrors, setStatus, resetForm});
              }}
              validationSchema={Yup.object().shape({
                datetime: Yup.date()
                          .required("Datetime is required"),
                note: Yup.string(),
            })}>
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                } = props;
                return (
                  <form className='form'
                        onSubmit={handleSubmit}>
                    {errors.submit && (
                      <div className="form__error">{errors.submit}</div>
                    )}
                    <div className="form__content">
                      <label htmlFor="datetime"
                            className={errors.datetime && touched.datetime && 'error'}>
                        <span className="form__label">Date & Time<span className="required">*</span></span>
                        <input
                          name="datetime"
                          id="datetime"
                          type="datetime-local"
                          value={values.datetime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.datetime && touched.datetime && (
                          <div className="form__info">{errors.datetime}</div>
                        )}
                      </label>
                      <label htmlFor="note">
                        <span className="form__label">Note</span>
                        <Field as="textarea"
                              name="note"
                              id="note"
                              placeholder="Enter event notes..."></Field>
                      </label>
                      <button type="submit"
                              className={isSubmitting ? 'form__submit loading' : 'form__submit'}>
                        <span className="form__submit_text">Save Event</span>
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </Modal>
        </Hero>
        <div className="schedule__events">
          {renderItems}
        </div>
      </section>
    );
  }
}
