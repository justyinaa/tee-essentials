import React from "react";
import "./Footer.scss"

const Footer: React.FC = () => {
    return (
      <>
        <div className="footerLinks">
          <div className="footerLinksBlock footerBlock">
            <p className="footerText">
              400 University Deluxe Suite, 200 Carol Gabives
            </p>
            <p className="footerText">R, 33134 USA</p>
          </div>
          <div className="linksFlex">
            <div className="footerLinksBlock">
              <p className="footerLinkCol  footerText">Links</p>
              <a href="" className="footerLinkCol footerText">
                Home
              </a>
              <a href="" className="footerLinkCol footerText">
                Shop
              </a>
              <a href="" className="footerLinkCol footerText">
                About
              </a>
              <a href="" className="footerLinkCol footerText">
                Contact
              </a>
            </div>
            <div className="footerLinksBlock footerText">
              <p className="footerText">Help</p>
              <a href="" className="footerLinkCol footerText">
                Payment Options
              </a>
              <a href="" className="footerLinkCol footerText">
                Returns
              </a>
              <a href="" className="footerLinkCol footerText">
                Privacy Policies
              </a>
            </div>
          </div>
          <div className="footerLinksBlock">
            <p>Newsletter</p>
            <div className="emailLinkFlex">
              <input
                type="email"
                name=""
                placeholder="Enter Your Email Address"
                id="emailLink"
              />
              <a href="" id="emailBtn">
                Subscribe
              </a>
            </div>
          </div>
        </div>

        <p className="footerParagraph">
          2022 Meubel House. All rights reserved
        </p>
      </>
    );
}



export default Footer;