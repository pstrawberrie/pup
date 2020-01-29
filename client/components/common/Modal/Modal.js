/**
 * Modal Component
 * - Parent Component must pass a toggle func prop + modal open prop
 * - Multiple modals in Parent example:
 *  <Parent>
 *    state = {
 *       modalFirstOpen: false,
 *       modalSecondOpen: false,
 *     }
 *
 *    toggleFirstModal = () => this.setState({modalOpen: !this.state.modalOpen});
 *    toggleSecondModal = () => this.setState({modalOpen: !this.state.modalOpen});
 *
 *    <Modal modalOpen={this.state.modalFirstOpen} toggleModal={this.toggleFirstModal}>
 *    <Modal modalOpen={this.state.modalSecondOpen} toggleModal={this.toggleSecondModal}>
 *  </Parent>
 */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.scss';

export default class Modal extends React.Component {
  render() {
    const {
      noPadding,
      triggerClass,
      triggerText,
      title,
      children,
      modalOpen,
      toggleModal,
    } = this.props;

    const renderTrigger = () => {
      return triggerText ?
             <button onClick={toggleModal} className={triggerClass}>{triggerText}</button> :
             null
    }

    return(
      <>
        {renderTrigger()}
        <CSSTransition
          in={modalOpen}
          timeout={160}
          classNames={{
            enter: 'anim-enter',
            enterActive: 'anim-enter-active',
            enterDone: 'anim-enter-done',
            exit: 'anim-exit',
            exitDone: 'anim-exit-done',
          }}>
          <div className="modal" aria-hidden={!modalOpen}>
            <div className="modal__screen" onClick={toggleModal}></div>
            <div className="modal__inner">
              {title ? <span className="modal__title"><span>{title}</span></span> : null}
              <div className={`modal__inner_content${noPadding ? ' no-padding' : ''}`}>
                {children}
              </div>
              <button className="modal__inner_close"
                      aria-expanded={modalOpen}
                      onClick={toggleModal}>
                <span className="modal__inner_close_icon"></span>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        </CSSTransition>
      </>
    )
  }
}
