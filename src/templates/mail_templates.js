export const CONTACT_TEMPLATE = (body) => {
  return {
    subject: "New SiteLab Enquiry",
    message: `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Phone: ${body.phone}\r\n
    \r\n
    Catagory: ${body.checkbox}\r\n
    Requirements: ${body.requirements}\r\n
    `,
  };
};
