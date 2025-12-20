import nodemailer from 'nodemailer'

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // or your SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
})

// Send enquiry notification to admin
export const sendEnquiryNotification = async (enquiryData: any) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@paradeep-online.com',
      subject: `New Enquiry from ${enquiryData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
            🔔 New Enquiry Received
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${enquiryData.name}</p>
            <p><strong>Email:</strong> ${enquiryData.email}</p>
            <p><strong>Phone:</strong> ${enquiryData.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${enquiryData.subject || 'General Enquiry'}</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p>${enquiryData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #6b7280; font-size: 12px;">
            <p>This email was sent from Paradeep Online website contact form.</p>
            <p>Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('Enquiry notification sent successfully')
    return { success: true }
  } catch (error) {
    console.error('Error sending enquiry notification:', error)
    return { success: false, error }
  }
}

// Send auto-reply to customer
export const sendEnquiryAutoReply = async (customerEmail: string, customerName: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'Thank you for contacting Paradeep Online',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
            Thank You for Your Enquiry!
          </h2>
          
          <p>Dear ${customerName},</p>
          
          <p>Thank you for reaching out to us. We have received your enquiry and will get back to you within 24 hours.</p>
          
          <div style="background: #eff6ff; padding: 15px; border-left: 4px solid #3B82F6; margin: 20px 0;">
            <p style="margin: 0;"><strong>What happens next?</strong></p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Our team will review your enquiry</li>
              <li>We'll respond within 24 hours</li>
              <li>You'll receive a personalized solution</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Browse our <a href="http://localhost:3000/products" style="color: #3B82F6;">Products</a></li>
            <li>Explore our <a href="http://localhost:3000/services" style="color: #3B82F6;">Services</a></li>
            <li>Read our <a href="http://localhost:3000/blog" style="color: #3B82F6;">Blog</a></li>
          </ul>
          
          <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 5px;">
            <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
            <p style="margin: 5px 0 0 0;">📞 Call us: +91 1234567890</p>
            <p style="margin: 5px 0 0 0;">💬 WhatsApp: +91 1234567890</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #6b7280; font-size: 12px;">
            <p><strong>Paradeep Online</strong></p>
            <p>Paradeep, Odisha, India</p>
            <p>© ${new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('Auto-reply sent successfully')
    return { success: true }
  } catch (error) {
    console.error('Error sending auto-reply:', error)
    return { success: false, error }
  }
}
