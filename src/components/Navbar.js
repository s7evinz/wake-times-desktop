import React from 'react';
import classNames from 'classnames';

function Navbar(props) {
  const {
    menuActive,
    onMenuClick,
    onReset,
    isEmpty,
  } = props;

  const menuClasses = classNames({
    'navbar-menu': true,
    'is-active': menuActive,
  });

  return (
    <nav className="navbar"> <div className="navbar-brand">
        <h1 className="navbar-item app-warm-text">
          Wake Times
        </h1>
        <span onClick={onMenuClick}
            role="button" 
            className="navbar-burger burger"
            aria-label="menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      <div className={menuClasses}>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={onReset}
                disabled={isEmpty}
                className="button is-danger is-outlined">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;