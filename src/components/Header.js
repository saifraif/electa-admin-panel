import React from "react";

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}

export default Header;
