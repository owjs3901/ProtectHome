const express = require('express')
const app = new express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

const fs = require('fs');
const http = require('http');
const https = require('https');

const credentials = {
	key: fs.readFileSync(__dirname + '/mbs-b.com-key.pem'),
	cert: fs.readFileSync(__dirname + '/mbs-b.com-crt.pem'),
	ca: fs.readFileSync(__dirname + '/mbs-b.com-chain.pem')
};

const path = require('path');
const crypto = require('crypto');
const base64url = require('base64url');

const utils = require('./utils')

const db = {}
const otp = ["3901"]

app.use(bodyParser.json());
/* ----- session ----- */
app.use(cookieSession({
	name: 'session',
	keys: [crypto.randomBytes(32).toString('hex')],

	// Cookie Options
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(cookieParser())

/* ----- serve static ----- */
app.use(express.static("../build"));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// app.set('views', path.join(__dirname, 'views'));


let randomBase64URLBuffer = (len) => {
	len = len || 32;

	let buff = crypto.randomBytes(len);

	return base64url(buff);
}
app.get('/api/logout', (req, res) => {
	req.session.loggedIn = false;
	req.session.username = undefined;

	res.json({
		'status': 'ok'
	})
})

app.get('/api/count', (req, res) => {

	let count=0;
	for(const k in db){
		if(db[k].registered)
			count++;
	}
	res.json({
		res:count
	})
})

app.get('/api/user', (req, res) => {

	const list=[]
	for(const k in db){
		if(db[k].registered)
			list.push({name:db[k].name,date:db[k].date})
	}
	res.json({
		res:list
	})
})
app.get('/api/db', (req, res) => {

	res.json({
		res:db
	})
})

app.get('/api/', (req, res) => {
	if (req.session.username && req.session.challenge)
		res.render('main.html')
	else
		res.render('login.html')
})
app.get('/api/isLogin', (req, res) => {
	console.log('is Login',req.query.name)
	res.json({su:req.session.username===req.query.name});
})

app.get('/api/isOTP', (req, res) => {
	console.log('is isOTP',req.query.otp);
	res.json({su:otp.includes(req.query.otp)});
})

app.get('/api/addOTP', (req, res) => {
	const d=req.query.data
	console.log("OTP 추가됨"+d)
	otp.push(d)
	res.json(otp);
})

// door window led1, 2, 3, 온, 습도
const data=[0,0,0,0,0,0,0]//size 7

//온 습도
app.get('/api/setData0', (req, res) => {
	const d=JSON.parse(req.query.data)
	data[5] = d[0];
	data[6] = d[1];

	res.json({data});
})
app.get('/api/setData1', (req, res) => {
	const d=JSON.parse(req.query.data)
	data[0] = d[0];
	data[1] = d[1];
	res.json({data});
})
//led
app.get('/api/setData2', (req, res) => {
	const d=JSON.parse(req.query.data)
	data[2] = d[0];
	data[3] = d[1];
	data[4] = d[2];
	res.json({data});
})

app.get('/api/getData', (req, res) => {
	res.json({data});
})

app.get('/api/personalInfo', (req, res) => {
	if (!req.session.loggedIn) {
		res.json({
			'status': 'failed',
			'message': 'Access denied'
		})
	} else {
		res.json({
			'status': 'ok',
			'name': db[req.session.username].name,
		})
	}
})
app.get('/api/register', (req, res) => {
	if (req.session.username && req.session.challenge)
		res.redirect('/api/')
	else
		res.render('register.html')
})

app.post('/api/register', (req, res) => {

	if (req.body && req.body.username && req.body.name) {
		if (!db[req.body.username]||(req.body.username==="admin"&&
			!db[req.body.username].registered)) {
			db[req.body.username] = {
				name: req.body.name,
				authenticators: [],
				registered: false,
				id: randomBase64URLBuffer(32),
			}
			const c = randomBase64URLBuffer(32)

			req.session.challenge = c;
			req.session.username = req.body.username;

			res.json({
				stat: 0,
				challenge: c,
				rp: {
					name: 'FIDO Example'
				},
				user: {
					id: db[req.body.username].id,
					name: req.body.username,
					displayName: req.body.name
				},
				attestation: 'direct',
				authenticatorSelection: {
					authenticatorAttachment: "cross-platform",
				},
				pubKeyCredParams: [
					{
						type: "public-key", alg: -7 // "ES256" IANA COSE Algorithms registry
					}
				]
			})
		}
		else
			res.json({
				stat: 1,
				msg: '이미 존재하는 유저네임'
			})
	}
	else res.json({
		stat: 1,
		msg: '알맞지 않는 인자 [' + req.body.username + req.body.name + "]"
	})

})
app.post('/api/dologin', (req, res) => {

	if (!req.body || !req.body.username) {
		res.json({
			'status': 'failed',
			'message': 'Request missing username field!'
		})

		return
	}

	let username = req.body.username;

	if (!db[username] || !db[username].registered) {
		res.json({
			'status': 'failed',
			'message': `User ${username} does not exist!`
		})

		return
	}

	let getAssertion = utils.generateServerGetAssertion(db[username].authenticators)
	getAssertion.status = 'ok'

	req.session.challenge = getAssertion.challenge;
	req.session.username = username;
	res.json(getAssertion)

})
app.post('/api/response', (req, res) => {
	if (!req.body || !req.body.id
		|| !req.body.rawId || !req.body.response
		|| !req.body.type || req.body.type !== 'public-key') {
		res.json({
			'status': 'failed',
			'message': 'Response missing one or more of id/rawId/response/type fields, or type is not public-key!'
		})

		return
	}

	let webauthnResp = req.body
	let clientData = JSON.parse(base64url.decode(webauthnResp.response.clientDataJSON));

	/* Check challenge... */

	if (clientData.challenge !== req.session.challenge) {
		res.json({
			'status': 'failed',
			'message': 'Challenges don\'t match!'
		})
	}

	let result;


	if (webauthnResp.response.attestationObject !== undefined) {
		result = utils.verifyAuthenticatorAttestationResponse(webauthnResp);

		if (result.verified) {
			db[req.session.username].authenticators.push(result.authrInfo);
			db[req.session.username].registered = true
			db[req.session.username].date = Date.now()
		}
	} else if (webauthnResp.response.authenticatorData !== undefined) {
		result = utils.verifyAuthenticatorAssertionResponse(webauthnResp, db[req.session.username].authenticators);

	} else {
		res.json({
			'status': 'failed',
			'message': 'Can not determine type of response!'
		})
		return;
	}
	if (result.verified) {
		req.session.loggedIn = true;
		res.json({ 'status': 0 })
	} else {
		res.json({
			'status': 'failed',
			'message': 'Can not authenticate signature!'
		})
	}
})

app.get('*',(req,res)=>{
	res.redirect('/')
})

// app.listen(3000)
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
httpsServer.listen(443);
