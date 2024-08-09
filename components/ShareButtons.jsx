"use client";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

function ShareButtons({ property }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        share this property:
        <div className="flex gap-3 justify-center pb-5">
          <FacebookShareButton
            url={shareUrl}
            quote={property.name}
            hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            quote={property.name}
            hashtag={[`${property.type.replace(/\s/g, "")}ForRent`]}
          >
            <TwitterIcon size={40} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            quote={property.name}
            hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={property.name}
            body={`check out this property listings:  ${shareUrl}`}
          >
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
        </div>
      </h3>
    </>
  );
}

export default ShareButtons;
