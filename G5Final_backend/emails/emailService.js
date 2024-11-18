import transporter from '#configs/mail.js'

export const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Pawer寶沃"<${process.env.SMTP_TO_EMAIL}>`,
    to,
    subject,
    html,
  }

  try {
    const response = await transporter.sendMail(mailOptions)
    return { status: 'success', data: response, message: '郵件已寄送成功' }
  } catch (error) {
    console.error('寄信錯誤:', error)
    return { status: 'error', message: '發送電子郵件失敗', error }
  }
}
