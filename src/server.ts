
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {Request, Response, NextFunction} from 'express';

import Startup from './handler/startup';
import Auth from './handler/auth';
import Ticket from './handler/oticket';

let reg = new Auth()
let run = new Startup(80)
let create = new Ticket()
run.mongoose()
run.run()

run.app.use(bodyParser.urlencoded({ extended: true }));
run.app.use(cookieParser());
run.app.get('/', async (req: Request, res: Response,next: NextFunction) => {
    res.render(__dirname + '/views/index.ejs');
})

run.app.get('/reg', async (req: Request, res: Response,next: NextFunction) => {
    res.render(__dirname + '/views/register.ejs')
})

run.app.post('/reg', async (req: Request, res: Response,next: NextFunction) => {
    reg.register(req, res)
})

run.app.get('/login', async (req: Request, res: Response,next: NextFunction) => {
    if (!req.cookies.userdata) {
        return res.render(__dirname + '/views/register.ejs')
    }
    return res.render(__dirname + '/views/login.ejs', {
        users: req.cookies.userdata.username,
        ranks: req.cookies.userdata.ranks
    })
})

run.app.get('/admin', async (req: Request, res: Response,next: NextFunction) => {
    if (!req.cookies.userdata) {
        return res.render(__dirname + '/views/register.ejs')
    }
    return create.readall(req, res)
})

run.app.get('/logout', async (req: Request, res: Response,next: NextFunction) => {
    if (!req.cookies.userdata) {
        return res.render(__dirname + '/views/register.ejs')
    }
    return reg.logout(req, res);
})


run.app.get('/ticket', async (req: Request, res: Response,next: NextFunction) => {
    if (!req.cookies.userdata) {
        return res.redirect('http://localhost/login')
    }
    return create.read(req, res)
})

run.app.get('/ticketo', async (req: Request, res: Response,next: NextFunction) => {
    if (!req.cookies.userdata) {
        return res.redirect('http://localhost/login')
    }
    return res.render(__dirname + '/views/ticketo.ejs', {
        users: req.cookies.userdata.username,
        message: '',
    })
})

run.app.post('/ticketo', async (req: Request, res: Response,next: NextFunction) => {
    if (!req.cookies.userdata) {
        return res.redirect('http://localhost/login')
    }
    return create.create(req, res)
})




run.app.post('/login', async (req: Request, res: Response,next: NextFunction) => {
    reg.login(req, res)
})