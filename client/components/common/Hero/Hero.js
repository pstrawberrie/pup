/**
 * Hero Component
 */
import React from 'react';
import Cta from '../Cta/Cta';
import './Hero.scss';

export default function Hero(props) {

  const {
    bg,
    headline,
    copy,
    cta,
  } = props;

  const hasBg = ((bg && bg.url) || (bg && bg.color)) ? true : false;

  return(
    <header className={hasBg ? 'hero with-bg' : 'hero'}>
      <If condition={bg && typeof bg === 'object'}>
        <If condition={bg.url}>
          <div className="hero__bg" style={{backgroundImage: `url(${bg.url})`}}></div>
        </If>
        <If condition={bg.color}>
          <div className="hero__bg" style={{backgroundColor: bg.color}}></div>
        </If>
      </If>
      <div className="hero__inner container">
        <div className="hero__inner_content">
          <If condition={headline}>
            <h1 className="hero__headline">{headline}</h1>
          </If>
          <If condition={copy}>
            <div className="hero__copy">{copy}</div>
          </If>
          <If condition={cta && cta.text && cta.link}>
            <Cta {...cta} />
          </If>
          {props.children}
        </div>
      </div>
    </header>
  );

}
