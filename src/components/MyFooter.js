//src/components/Myfooter.js

import React from "react";

const MyFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <center>© {currentYear} Your Company</center>
    </footer>
  );
};

export default MyFooter;
