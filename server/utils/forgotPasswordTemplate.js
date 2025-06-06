const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="
      font-family: 'Arial', sans-serif; 
      max-width: 600px; 
      margin: auto; 
      padding: 20px; 
      background-color: #f5f9f6; 
      border-radius: 10px; 
      color: #333; 
      border: 1px solid #d4e8d4;
    ">
      
      <!-- Header with logo -->
      <div style="text-align: center; padding-bottom: 20px;">
        <img src="https://res.cloudinary.com/dlbl9sb4q/image/upload/v1742251898/s8mz6wenvfynfpc1duoi.png" alt="Bloom Botanica Logo" style="margin-bottom: 10px; width: 120px;" />
        <h1 style="color: #4CAF50;">Password Reset Request</h1>
      </div>
  
      <!-- Greeting -->
      <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
  
      <!-- Message -->
      <p style="font-size: 16px;">
        We've received a request to reset the password for your <strong>Bloom Botanica</strong> account.
        Use the OTP code below to proceed with resetting your password.
      </p>
  
      <!-- OTP Box -->
      <div style="
        margin: 30px auto;
        padding: 20px 30px;
        background-color: #AED581;
        color: #1B5E20;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 5px;
        text-align: center;
        border-radius: 12px;
        width: fit-content;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      ">
        ${otp}
      </div>
  
      <!-- Additional Instructions -->
      <p style="font-size: 14px; color: #555; margin-top: 20px;">
        🌿 <strong>This OTP is valid for 1 hour.</strong><br/>
        Enter the code on the <a href="${process.env.FRONTEND_URL}" style="color: #388E3C; text-decoration: none;">Bloom Botanica website</a> to continue resetting your password.
      </p>
  
      <!-- Help Info -->
      <p style="font-size: 14px; color: #555;">
        Didn’t request a password reset? No problem! Just ignore this email, and your account will stay safe.
      </p>
  
      <!-- Divider -->
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  
      <!-- Footer -->
      <div style="text-align: center; font-size: 12px; color: #999;">
        <p>Need help? <a href="mailto:support@bloombotanica.com" style="color: #388E3C; text-decoration: none;">Contact Support</a></p>
        <p>&copy; ${new Date().getFullYear()} Bloom Botanica. All rights reserved.</p>
      </div>
  
    </div>
  `;
};

export default forgotPasswordTemplate;
