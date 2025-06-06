const verifyEmailTemplate = ({ name, url }) => {
    return `
      <p>Dear ${name},</p>
      <p>Thank you for registering with Bloom Botanica.</p>
      <a href="${url}" style="
          color: white;
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          padding: 15px 30px;
          text-decoration: none;
          display: inline-block;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin-top: 20px;
          transition: background 0.3s ease;
      ">
        Verify Email
      </a>
      <p>If you didn’t register for an account, please ignore this email.</p>
    `;
  };
  
  export default verifyEmailTemplate;
  