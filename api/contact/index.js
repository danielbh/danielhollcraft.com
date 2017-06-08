/**
 * Created by danielhollcraft on 6/7/17.
 */
const {FROM, SUBJECT, TO, API_KEY, DOMAIN} = process.env;
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const querystring = require('querystring');
const AJV = require('ajv');

module.exports.handler = (event, context, callback) => {

  const ajv = new AJV();

  const validate = ajv.compile({
    "$async": true,
    "properties": {
      "name": {"type":"string"},
      "email": {"type":"string", "format": "email"},
      "message": {"type":"string"},
    },
    "additionalProperties": false,
    "required": ["name", "email", "message"]
  });

  console.log(JSON.stringify(event));

  const body = querystring.parse(event.body)
  const {name, message, email} = body;

  validate(body)
    .then(valid => {
      const opts = {
        from: FROM,
        to: TO,
        subject: SUBJECT,
        text: `${message} \n \n ${name} <${email}>`
      };

      mailgun.messages().send(opts, (error, body) => {
        if (error) {
          console.log(error);
        } else {
          callback(null, {
            statusCode: 200,
            body: 'form submitted successfully',
            headers: {'Content-Type': 'text/html'}
          })
        }
      });
    })
    .catch(error => {
      if (error) {
        console.log(error.errors);
        callback(null, {
          statusCode: 502,
          body: error.errors[0].message,
          headers: {'Content-Type': 'text/html'}
        })
      }
    });
};