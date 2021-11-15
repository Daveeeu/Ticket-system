import TicketTemp from '../schemas/ticket'
import { Request, Response, NextFunction } from 'express';

export default class Ticket{
    constructor() { }
    getRandomInt() {
        return Math.floor(Math.random() * 9999);
    }
    //#region create
    async create(req: Request, res: Response) {
        let user = req.cookies.userdata.username;
        let email = req.cookies.userdata.email;
        try {
            const { subject, message, difficulty } = req.body
            if (!(subject && message && difficulty)) {
                return res.status(400).send("All input is required");
            }

            const oldTicket = await TicketTemp.find({ username: user });
            for (let x = 0; oldTicket.length >= x; x++){
                if (oldTicket[x] && (oldTicket[x].ticket.subject == subject)) {
                    return res.status(409).send("Ticket Already Exist.");
                }
            }
            await TicketTemp.create({
                username: user,
                email,
                ticket: {
                    subject: subject,
                    message: message,
                    difficulty: difficulty,
                    id: this.getRandomInt()
                }
            });
            return res.render(__dirname + '/../views/ticketo.ejs', {
                message: 'Successfully!'
            })
        }catch(error) {
            return console.log(error)
        }
    }
    //#endregion

    //#region read
    async read(req: Request, res: Response) {
        let user = req.cookies.userdata.username;
        try {
            const oldTicket = await TicketTemp.find({ username: user });
            let text = ''
            for (let x = 0; oldTicket.length - 1 >= x; x++) {
                switch (oldTicket[x].ticket.difficulty) {
                    case 1:
                        text += `
                        <tr class="red">
                            <td>${oldTicket[x].ticket.subject}</td>
                            <td>${oldTicket[x].ticket.message}</td>
                            <td>Not important</td>
                            <td>${oldTicket[x].date}</td>
                        </tr>`
                        break;
                    case 2:
                        text += `
                        <tr class="green">
                            <td>${oldTicket[x].ticket.subject}</td>
                            <td>${oldTicket[x].ticket.message}</td>
                            <td>Important</td>
                            <td>${oldTicket[x].date}</td>
                        </tr>`
                        break;
                    case 3:
                        text += `
                        <tr class="yellow">
                            <td>${oldTicket[x].ticket.subject}</td>
                            <td>${oldTicket[x].ticket.message}</td>
                            <td>Super secret</td>
                            <td>${oldTicket[x].date}</td>
                        </tr>`
                        break;
                    default:
                        text += `
                        <tr class="blue">
                            <td>${oldTicket[x].ticket.subject}</td>
                            <td>${oldTicket[x].ticket.message}</td>
                            <td>${oldTicket[x].ticket.difficulty}</td>
                            <td>${oldTicket[x].date}</td>
                        </tr>`
                        break;
                }
            }
            return res.render(__dirname + '/../views/ticket.ejs', {
                ticket: text
            })
            
        } catch (error) {
            return console.log(error)
        }
    }
    //#endregion
 
    //#region readall
    async readall(req: Request, res: Response) {
        let user = req.cookies.userdata.ranks;
        try {
            if (!(user == 'admin')) {
                return res.redirect('http://localhost/login')
            }
            const allTicket = await TicketTemp.find();
            let text = ''
            for (let x = 0; allTicket.length - 1 >= x; x++) {
                switch (allTicket[x].ticket.difficulty) {
                    case 1:
                        text += `
                        <tr class="red">
                            <td>${allTicket[x].username}</td>
                            <td>${allTicket[x].email}</td>
                            <td>${allTicket[x].ticket.subject}</td>
                            <td>${allTicket[x].ticket.message}</td>
                            <td>Not important</td>
                            <td>${allTicket[x].date}</td>
                            <td><button onclick='err()'>Click</button></td>
                            <td><button onclick='err()'>Click</button></td>
                        </tr>`
                        break;
                    case 2:
                        text += `
                        <tr class="green">
                            <td>${allTicket[x].username}</td>
                            <td>${allTicket[x].email}</td>
                            <td>${allTicket[x].ticket.subject}</td>
                            <td>${allTicket[x].ticket.message}</td>
                            <td>Important</td>
                            <td>${allTicket[x].date}</td>
                            <td><button onclick='err()'>Click</button></td>
                            <td><button onclick='err()'>Click</button></td>
                        </tr>`
                        break;
                    case 3:
                        text += `
                        <tr class="yellow">
                            <td>${allTicket[x].username}</td>
                            <td>${allTicket[x].email}</td>
                            <td>${allTicket[x].ticket.subject}</td>
                            <td>${allTicket[x].ticket.message}</td>
                            <td>Super secret</td>
                            <td>${allTicket[x].date}</td>
                            <td><button onclick='err()'>Click</button></td>
                            <td><button onclick='err()'>Click</button></td>
                        </tr>`
                        break;
                    default:
                        text += `
                        <tr class="blue">
                            <td>${allTicket[x].username}</td>
                            <td>${allTicket[x].email}</td>
                            <td>${allTicket[x].ticket.subject}</td>
                            <td>${allTicket[x].ticket.message}</td>
                            <td>${allTicket[x].ticket.difficulty}</td>
                            <td>${allTicket[x].date}</td>
                            <td><button onclick='err()'>Click</button></td>
                            <td><button onclick='err()'>Click</button></td>
                        </tr>`
                        break;
                }
            }
            return res.render(__dirname + '/../views/admin.ejs', {
                ticket: text
            })

        } catch (error) {
            return console.log(error)
        }
    }
    //#endregion
}
