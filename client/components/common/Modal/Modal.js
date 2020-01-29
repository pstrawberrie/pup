/**
 * Modal Component
 */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Cta from '../Cta/Cta';
import './Modal.scss';

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  }

  toggleModal = (isOutsideClick) => this.setState({isOpen: !this.state.isOpen});
  closeModal = () => this.setState({isOpen: false});

  render() {
    const {
      triggerClass,
      triggerText,
      title,
      children
    } = this.props;

    const renderTrigger = () => {
      return triggerText ?
             <button onClick={this.toggleModal} className={triggerClass}>{triggerText}</button> :
             null
    }

    return(
      <>
        {renderTrigger()}
        <CSSTransition
          in={this.state.isOpen}
          timeout={160}
          classNames={{
            enter: 'anim-enter',
            enterActive: 'anim-enter-active',
            enterDone: 'anim-enter-done',
            exit: 'anim-exit',
            exitDone: 'anim-exit-done',
          }}>
          <div className="modal" aria-hidden={!this.state.isOpen}>
            <div className="modal__screen" onClick={this.closeModal}></div>
            <div className="modal__inner">
              {title ? <span className="modal__title"><span>{title}</span></span> : null}
              <div className="modal__inner_content">
                {children}
              </div>
              <button className="modal__inner_close"
                      aria-expanded={this.state.isOpen}
                      onClick={this.toggleModal}>
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
