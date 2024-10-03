import React from "react";
import classes from './Header.module.scss';
const Header = () => {
  return (
    <header className={classes.header}>
      <ul>
        <li>
          <a href="#">Table</a>
        </li>
        <li>
          <a href="#">Chart</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
