const { log } = require('console');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { Client } = require('whatsapp-web.js');

// Load data from JSON file
const rawData = fs.readFileSync('./rawData.json');
const data = JSON.parse(rawData);

log(data);

// Function to send email
async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abilash@craftech360.com', // Your email address
            pass: 'Hiqxog-hubgy7-tyqhij' // Your email password
        }
    });

    let mailOptions = {
        from: 'abilash@craftech360.com',
        to: to,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
}

// Function to send WhatsApp message
const client = new Client();
client.initialize().then(()=>{
    log("client initialized");
});

// client.on('ready', () => {
//     log("client is ready")
    // Iterate through the data and send messages
    data.forEach(async (entry) => {
        const name = entry.name;
        const email = entry.email;
        const phone = entry.phone;

        const emailSubject = 'Qr generation';
        const emailBody = `  
                <mjml>
                <mj-body>
                <mj-section>
                    <mj-column>
                    <!-- Image taking up full width -->
                    <mj-image width="500px" src="https://github.com/Abilashs003/whatsapp-qr/blob/main/deepak.png?raw=true" alt="Full Screen Image" />
                    </mj-column>
                </mj-section>
                </mj-body>
                </mjml>
        `;

        const whatsappMessage = `Hello ${name}, this is a WhatsApp message.`;

        try {
            console.log("sending mail");
            await sendEmail(email, emailSubject, emailBody);
            // await client.sendMessage(`${phone}@c.in`, whatsappMessage);
            console.log("message sent")
        } catch (error) {
            console.error(error);
        }
    });
// });
