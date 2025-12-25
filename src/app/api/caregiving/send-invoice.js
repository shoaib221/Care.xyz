import { format } from "date-fns";
import nodemailer from "nodemailer";



export async function SendMail({ booker, booking, service }) {

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Care.in" <${process.env.EMAIL_USER}>`,
            to: booker.username,
            subject: `Invoice of ${service.name} booking`,
            html: `
                <h2>Booking Id #${booking._id.toString()}</h2>
                <p>Paid amount: <strong>$ ${booking.totalCost}</strong></p>
                <div> Booked From ${ format(booking.startTime, 'dd MMM yyyy, hh a') } </div>
                <div> Booked To ${ format(booking.endTime, 'dd MMM yyyy, hh a') } </div>
                <div> Will be served at ${ booking.city }, ${ booking.district }, ${ booking.division } </div>
                <p>Thank you for your booking.</p>
            `,
        });

        console.log( "Invoice mail sent" )
        return { success: true };
    } catch (err) {
        console.dir(err);
        return { success: false }
    }


}
