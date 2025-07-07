import React from "react";
import "./content.css";
import Corner from "../../defaults/img/corner.png";

const Certificate = () => {
  return (
    <div class="certificate">
      <div class="inner-border">
        <img src={Corner} class="corner tl" />
        <img src={Corner} class="corner tr" />
        <img src={Corner} class="corner bl" />
        <img src={Corner} class="corner br" />

        <h1 class="certificate-title">CERTIFICATE</h1>
        <h2 class="certificate-subtitle">OF APPRECIATION</h2>
        <p class="presented">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
        <div class="recipient-container">
          <div class="recipient">Thanikachalam Venkataramanan</div>
          <div class="line"></div>
        </div>

        <p class="description">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>

        <div class="footer">
          <div class="footer-box">
            <div class="line"></div>
            <span>DATE</span>
          </div>
          <div class="footer-box">
            <div class="line"></div>
            <span>SIGNATURE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
