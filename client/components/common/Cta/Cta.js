/**
 * Cta Component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './Cta.scss';

export default function Cta(props) {
  const {
    isButton,
    buttonFunc,
    text,
    link,
    arrow,
  } = props;

  //@TODO: Finish composeCta
  function composeCta() {
    if(isButton) {
      text && buttonFunc ?
      <button className="cta" onClick={buttonFunc}>{text}</button> :
      null
    } else {
      return(
        link && text ?
        <Link className="cta" to={link}>{text}{arrow ? <span className="cta__arrow">&nbsp;&raquo;</span> : ''}</Link> :
        null
      )
    }
  }

  return composeCta();
}
