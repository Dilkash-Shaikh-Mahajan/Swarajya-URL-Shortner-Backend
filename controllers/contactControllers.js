const nodemailer = require('nodemailer');
module.exports.setContact = async (req, res) => {
	try {
		const { name, email, subject, message } = req.body;
		console.log('object');
		let smtpTransport = nodemailer.createTransport({
			service: 'Gmail',
			// the connect port
			port: 465,

			// authenticate
			auth: {
				user: process.env.gmail_username,
				pass: process.env.gmail_password,
			},
		});
		//2 define the mailoptions
		let mailOptions = {
			to: 'dilkashmahajan8@gmail.com',
			from: email,
			subject: `${subject}`,
			html: `
    
			    <h3>Informations</h3>
			    <ul>
			    <li>Name: ${name}</li>
			    <li>Email: ${email}</li>
			    </ul>
			    <h3>Message</h3>
			    <p>${message}</p>
			    `,
		};

		// 3.send the message with sendmail
		smtpTransport.sendMail(mailOptions, (err) => {
			try {
				if (err) {
					console.log(err);
				}
				res.status(200).json({ msg: 'Message was sent succesfullly' });
			} catch (err) {
				if (err)
					return res
						.status(500)
						.json({ msg: 'There is server error' });
			}
		});
	} catch (error) {
		console.log(error);
	}
};
